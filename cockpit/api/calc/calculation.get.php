<?php
// GET /cockpit/api/calc/calculation?id=… — one saved calculation, with all its details.
require_once __DIR__ . '/_lib.php';

if ($refused = calc_guard($this)) return $refused;

$id = (string) $this->param('id', '');
if (!preg_match('/^[a-zA-Z0-9]{8,40}$/', $id)) return calc_fail($this, 400, 'bad_id');

$item = $this->module('content')->item('calculations', ['_id' => $id]);
if (!$item) return calc_fail($this, 404, 'not_found');

return [
    'id' => $item['_id'],
    'date' => $item['date'],
    'title' => $item['title'] ?? '',
    'curs_euro' => $item['curs_euro'] ?? null,
    'total_euro' => $item['total_euro'] ?? 0,
    'total_lei' => $item['total_lei'] ?? 0,
    'events' => $item['events'] ?? [],
    'spendings' => $item['spendings'] ?? [],
    'members' => $item['members'] ?? [],
    'created' => $item['_created'] ?? 0,
];
