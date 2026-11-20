<?php
// POST /cockpit/api/calc/delete {id} — deletes a saved calculation.
require_once __DIR__ . '/_lib.php';

if ($refused = calc_guard($this)) return $refused;

$body = calc_body($this);
$id = (string) ($body['id'] ?? '');
if (!preg_match('/^[a-zA-Z0-9]{8,40}$/', $id)) return calc_fail($this, 400, 'bad_id');

if (!$this->module('content')->item('calculations', ['_id' => $id])) return calc_fail($this, 404, 'not_found');
$this->module('content')->remove('calculations', ['_id' => $id]);

return ['deleted' => true];
