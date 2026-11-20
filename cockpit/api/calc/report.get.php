<?php
// GET /cockpit/api/calc/report?from=YYYY-MM-DD&to=YYYY-MM-DD — the saved calculations of a period
// (both dates optional: no limit), with members, events and spendings, for the per-member report.
require_once __DIR__ . '/_lib.php';

if (!calc_device($this)) return calc_fail($this, 401, 'device_not_paired');

$from = (string) $this->param('from', '');
$to = (string) $this->param('to', '');
if (($from !== '' && !calc_is_date($from)) || ($to !== '' && !calc_is_date($to))) {
    return calc_fail($this, 400, 'bad_date');
}

$filter = [];
if ($from !== '') $filter['$gte'] = $from;
if ($to !== '') $filter['$lte'] = $to;

$items = $this->module('content')->items('calculations', [
    'filter' => $filter ? ['date' => $filter] : [],
    'fields' => ['_id' => 1, 'date' => 1, 'title' => 1, 'curs_euro' => 1, 'total_euro' => 1, 'total_lei' => 1,
        'events' => 1, 'spendings' => 1, 'members' => 1],
    'sort' => ['date' => 1, '_created' => 1],
    'limit' => 2000,
]);

return array_map(fn($item) => [
    'id' => $item['_id'],
    'date' => $item['date'],
    'title' => $item['title'] ?? '',
    'curs_euro' => $item['curs_euro'] ?? null,
    'total_euro' => $item['total_euro'] ?? 0,
    'total_lei' => $item['total_lei'] ?? 0,
    'events' => $item['events'] ?? [],
    'spendings' => $item['spendings'] ?? [],
    'members' => $item['members'] ?? [],
], $items);
