<?php
// POST /cockpit/api/calc/register {credentialId, publicKey, alg, clientDataJSON, authenticatorData}
// — stores this device's biometric credential (once: a device that has one must be paired again to change it).
require_once __DIR__ . '/_lib.php';

$device = calc_device($this);
if (!$device) return calc_fail($this, 401, 'device_not_paired');
if (!empty($device['webauthn_cred_id'])) return calc_fail($this, 409, 'already_registered');

$body = calc_body($this);
if (!$body) return calc_fail($this, 400, 'bad_request');

$credId = calc_b64url_decode((string) ($body['credentialId'] ?? ''));
$spki = calc_b64url_decode((string) ($body['publicKey'] ?? ''));
$clientDataJSON = calc_b64url_decode((string) ($body['clientDataJSON'] ?? ''));
$authData = calc_b64url_decode((string) ($body['authenticatorData'] ?? ''));
$alg = (int) ($body['alg'] ?? 0);
if (!$credId || strlen($credId) > 1024 || !$spki || !$clientDataJSON || !$authData || !in_array($alg, [-7, -257], true)) {
    return calc_fail($this, 400, 'bad_request');
}

$origin = calc_check_client_data($this, $device, $clientDataJSON, 'webauthn.create');
if (!$origin || calc_check_auth_data($authData, $origin) === null) return calc_fail($this, 403, 'verification_failed');

$pem = "-----BEGIN PUBLIC KEY-----\n" . chunk_split(base64_encode($spki), 64, "\n") . "-----END PUBLIC KEY-----\n";
if (!openssl_pkey_get_public($pem)) return calc_fail($this, 400, 'bad_key');

$this->module('content')->saveItem('calcdevices', [
    '_id' => $device['_id'],
    'webauthn_cred_id' => calc_b64url($credId),
    'webauthn_pubkey' => $pem,
    'webauthn_alg' => $alg,
    'webauthn_counter' => 0,
    'webauthn_origin' => $origin,
]);
calc_open_session($this, $device);

return ['registered' => true];
