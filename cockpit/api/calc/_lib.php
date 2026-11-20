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
