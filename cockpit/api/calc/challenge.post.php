<?php
// POST /cockpit/api/calc/challenge — a one-time challenge for registering or unlocking with biometrics,
// plus the device's credential id when it has one.
require_once __DIR__ . '/_lib.php';

$device = calc_device($this);
if (!$device) return calc_fail($this, 401, 'device_not_paired');

return [
    'challenge' => calc_new_challenge($this, $device),
    'registered' => !empty($device['webauthn_cred_id']),
    'credentialId' => $device['webauthn_cred_id'] ?? null,
    'userId' => calc_b64url(hex2bin(substr(hash('sha256', $device['_id']), 0, 32))),
];
