<?php
// GET /cockpit/api/calc/me — is this browser a paired device, does it have biometrics, is it unlocked?
require_once __DIR__ . '/_lib.php';

$device = calc_device($this);
if (!$device) return calc_fail($this, 401, 'device_not_paired');

return [
    'paired' => true,
    'registered' => !empty($device['webauthn_cred_id']),
    'unlocked' => (bool) calc_unlocked_device($this),
];
