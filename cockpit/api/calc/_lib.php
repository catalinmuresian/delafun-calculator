<?php
// Helpers of the calculator's Cockpit endpoints (/cockpit/api/calc/*). Copied by the deploy into
// /var/www/delafun-calculator/cockpit/config/api/calc/; the name starts with "_" so it is never an
// endpoint itself.
//
// Access is bound to a paired device: pairing (pair.post.php, with a one-time code made on the server
// by deploy/calc-pair.php) gives the browser a random token in an HttpOnly cookie. Only its SHA-256 is
// stored (model "calcdevices"); a device set inactive in the Cockpit panel loses access at once.
// The API key the app sends is public on purpose: its role has no permissions, so it only lets the
// request reach these endpoints, which check the device themselves.

// Cockpit would also run this file as the route /api/calc/_lib: it is not an endpoint.
if (isset($API_FILE) && realpath($API_FILE) === __FILE__) {
    $this->response->status = 404;
    return ['error' => 'not_found'];
}

const CALC_COOKIE = 'calc_device';
const CALC_COOKIE_PATH = '/cockpit/api/calc';
// Browsers keep a cookie at most 400 days; it is renewed on every request, so a used phone never expires.
const CALC_COOKIE_DAYS = 400;

function calc_fail($app, int $status, string $error) {
    $app->response->status = $status;
    return ['error' => $error];
}

function calc_set_cookie(string $value, int $days = CALC_COOKIE_DAYS): void {
    setcookie(CALC_COOKIE, $value, [
        'expires' => $days > 0 ? time() + $days * 86400 : time() - 3600,
        'path' => CALC_COOKIE_PATH,
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// The paired device of this request, or null. Renews the cookie and the device's last_seen.
function calc_device($app): ?array {
    $token = $_COOKIE[CALC_COOKIE] ?? '';
    if (!is_string($token) || !preg_match('/^[a-f0-9]{64}$/', $token)) return null;

    $device = $app->module('content')->item('calcdevices', ['token_hash' => hash('sha256', $token)]);
    if (!$device || empty($device['active'])) return null;

    $today = date('Y-m-d');
    if (($device['last_seen'] ?? '') !== $today) {
        $app->module('content')->saveItem('calcdevices', ['_id' => $device['_id'], 'last_seen' => $today]);
    }
    calc_set_cookie($token);
    return $device;
}

// The JSON body of a POST; JSON only, which (with SameSite=Strict) keeps other sites from posting here.
function calc_body($app): ?array {
    $type = $app->request->server['CONTENT_TYPE'] ?? ($app->request->server['HTTP_CONTENT_TYPE'] ?? '');
    if (stripos($type, 'application/json') === false) return null;
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 300000) return null;
    $data = json_decode($raw, true);
    return is_array($data) ? $data : null;
}

function calc_is_date($value): bool {
    if (!is_string($value) || !preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $value, $m)) return false;
    return checkdate((int) $m[2], (int) $m[3], (int) $m[1]);
}

function calc_text($value, int $max): string {
    return is_scalar($value) ? mb_substr(trim((string) $value), 0, $max) : '';
}

function calc_number($value): float {
    return is_numeric($value) ? round((float) $value, 2) : 0.0;
}

// ---- Biometric unlock (WebAuthn: Face ID / Touch ID / fingerprint) ----
// After pairing, the phone registers a platform credential (its private key never leaves the phone's
// secure chip). Every unlock signs a one-time server challenge; the signature is checked here with the
// stored public key and opens a short session (HttpOnly cookie). Data endpoints need that session.

const CALC_UNLOCK_COOKIE = 'calc_unlock';
// Sliding: each request within it extends it. The app itself asks again on open and after 5 minutes away.
const CALC_UNLOCK_MINUTES = 30;
// Origins allowed to use WebAuthn here (the dev server registers its own, localhost-only credential).
const CALC_ORIGINS = ['https://calc.cmdev.ro', 'http://localhost:8080', 'http://localhost:8081'];

function calc_b64url_decode(string $value): ?string {
    if (!preg_match('/^[A-Za-z0-9_-]*$/', $value)) return null;
    $out = base64_decode(strtr($value, '-_', '+/') . str_repeat('=', (4 - strlen($value) % 4) % 4), true);
    return $out === false ? null : $out;
}

function calc_b64url(string $bin): string {
    return rtrim(strtr(base64_encode($bin), '+/', '-_'), '=');
}

function calc_set_unlock_cookie(string $value, bool $clear = false): void {
    setcookie(CALC_UNLOCK_COOKIE, $value, [
        'expires' => $clear ? time() - 3600 : 0, // session cookie: gone when the browser closes
        'path' => CALC_COOKIE_PATH,
        'secure' => true,
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

// A new one-time challenge for this device (2 minutes), returned base64url.
function calc_new_challenge($app, array $device): string {
    $challenge = random_bytes(32);
    $app->module('content')->saveItem('calcdevices', [
        '_id' => $device['_id'],
        'challenge_hash' => hash('sha256', $challenge),
        'challenge_exp' => time() + 120,
    ]);
    return calc_b64url($challenge);
}

// Checks the browser's clientDataJSON against the expected type and this device's open challenge
// (used once). Returns the origin it was made on, or null.
function calc_check_client_data($app, array $device, string $clientDataJSON, string $type): ?string {
    $data = json_decode($clientDataJSON, true);
    if (!is_array($data) || ($data['type'] ?? '') !== $type) return null;
    if (!in_array($data['origin'] ?? '', CALC_ORIGINS, true)) return null;
    $challenge = calc_b64url_decode((string) ($data['challenge'] ?? ''));
    if ($challenge === null || empty($device['challenge_hash']) || ($device['challenge_exp'] ?? 0) < time()) return null;
    if (!hash_equals($device['challenge_hash'], hash('sha256', $challenge))) return null;
    $app->module('content')->saveItem('calcdevices', ['_id' => $device['_id'], 'challenge_hash' => '', 'challenge_exp' => 0]);
    return $data['origin'];
}

// authenticatorData: made for this site (rpIdHash) with the user present (UP) and verified (UV: biometrics).
function calc_check_auth_data(string $authData, string $origin): ?int {
    if (strlen($authData) < 37) return null;
    $rpId = parse_url($origin, PHP_URL_HOST);
    if (!hash_equals(hash('sha256', $rpId, true), substr($authData, 0, 32))) return null;
    $flags = ord($authData[32]);
    if (($flags & 0x01) === 0 || ($flags & 0x04) === 0) return null;
    return unpack('N', substr($authData, 33, 4))[1]; // signature counter
}

// Opens the unlock session for this device.
function calc_open_session($app, array $device): void {
    $token = bin2hex(random_bytes(32));
    $app->module('content')->saveItem('calcdevices', [
        '_id' => $device['_id'],
        'unlock_hash' => hash('sha256', $token),
        'unlock_exp' => time() + CALC_UNLOCK_MINUTES * 60,
    ]);
    calc_set_unlock_cookie($token);
}

// The paired device of this request with a valid biometric session, or null. Extends the session.
function calc_unlocked_device($app): ?array {
    $device = calc_device($app);
    if (!$device) return null;
    $token = $_COOKIE[CALC_UNLOCK_COOKIE] ?? '';
    if (!is_string($token) || !preg_match('/^[a-f0-9]{64}$/', $token)) return null;
    if (empty($device['unlock_hash']) || ($device['unlock_exp'] ?? 0) < time()) return null;
    if (!hash_equals($device['unlock_hash'], hash('sha256', $token))) return null;
    // Extend at most once a minute, to keep writes low.
    $exp = time() + CALC_UNLOCK_MINUTES * 60;
    if ($exp - $device['unlock_exp'] > 60) {
        $app->module('content')->saveItem('calcdevices', ['_id' => $device['_id'], 'unlock_exp' => $exp]);
    }
    return $device;
}

// For the data endpoints: the reason a request is refused, or null when it may go on.
function calc_guard($app) {
    if (!calc_device($app)) return calc_fail($app, 401, 'device_not_paired');
    if (!calc_unlocked_device($app)) return calc_fail($app, 401, 'locked');
    return null;
}
