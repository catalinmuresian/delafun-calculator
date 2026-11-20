<?php
// GET /cockpit/api/calc/calculations?month=YYYY-MM — the saved calculations of a month (summary only),
// for the calendar's marked days and the list of a day.
require_once __DIR__ . '/_lib.php';

if ($refused = calc_guard($this)) return $refused;

$month = (string) $this->param('month', '');
if (!preg_match('/^\d{4}-(0[1-9]|1[0-2])$/', $month)) return calc_fail($this, 400, 'bad_month');

$items = $this->module('content')->items('calculations', [
    'filter' => ['date' => ['$gte' => "{$month}-01", '$lte' => "{$month}-31"]],
    'fields' => ['_id' => 1, 'date' => 1, 'title' => 1, 'total_euro' => 1, 'total_lei' => 1, '_created' => 1],
    'sort' => ['date' => 1, '_created' => 1],
]);

return array_map(fn($item) => [
    'id' => $item['_id'],
    'date' => $item['date'],
    'title' => $item['title'] ?? '',
    'total_euro' => $item['total_euro'] ?? 0,
    'total_lei' => $item['total_lei'] ?? 0,
    'created' => $item['_created'] ?? 0,
], $items);
