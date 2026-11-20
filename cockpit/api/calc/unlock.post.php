<?php
// POST /cockpit/api/calc/unlock {credentialId, clientDataJSON, authenticatorData, signature}
// — checks a biometric signature over this device's challenge and opens the unlock session.
require_once __DIR__ . '/_lib.php';

$device = calc_device($this);
if (!$device) return calc_fail($this, 401, 'device_not_paired');
if (empty($device['webauthn_pubkey'])) return calc_fail($this, 409, 'not_registered');

$body = calc_body($this);
if (!$body) return calc_fail($this, 400, 'bad_request');

$credId = (string) ($body['credentialId'] ?? '');
$clientDataJSON = calc_b64url_decode((string) ($body['clientDataJSON'] ?? ''));
$authData = calc_b64url_decode((string) ($body['authenticatorData'] ?? ''));
$signature = calc_b64url_decode((string) ($body['signature'] ?? ''));
if (!$clientDataJSON || !$authData || !$signature || !hash_equals($device['webauthn_cred_id'], $credId)) {
    return calc_fail($this, 403, 'verification_failed');
}

$origin = calc_check_client_data($this, $device, $clientDataJSON, 'webauthn.get');
if (!$origin || $origin !== ($device['webauthn_origin'] ?? '')) return calc_fail($this, 403, 'verification_failed');
$counter = calc_check_auth_data($authData, $origin);
if ($counter === null) return calc_fail($this, 403, 'verification_failed');

// The signature covers authenticatorData + SHA-256(clientDataJSON); ES256 and RS256 both verify as SHA-256.
$ok = openssl_verify($authData . hash('sha256', $clientDataJSON, true), $signature, $device['webauthn_pubkey'], OPENSSL_ALGO_SHA256);
if ($ok !== 1) return calc_fail($this, 403, 'verification_failed');

// A counter that does not move forward points to a cloned credential (0 = the authenticator keeps none).
$last = (int) ($device['webauthn_counter'] ?? 0);
if ($counter !== 0 && $counter <= $last) return calc_fail($this, 403, 'verification_failed');
if ($counter !== 0) $this->module('content')->saveItem('calcdevices', ['_id' => $device['_id'], 'webauthn_counter' => $counter]);

calc_open_session($this, $device);
return ['unlocked' => true];
