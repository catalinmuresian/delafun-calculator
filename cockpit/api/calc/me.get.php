<?php
// GET /cockpit/api/calc/me — is this browser a paired device?
require_once __DIR__ . '/_lib.php';

$device = calc_device($this);
if (!$device) return calc_fail($this, 401, 'device_not_paired');

return ['paired' => true, 'name' => $device['name'] ?? ''];
