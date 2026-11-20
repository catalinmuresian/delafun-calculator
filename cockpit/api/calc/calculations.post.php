<?php
// POST /cockpit/api/calc/calculations — saves a calculation (a snapshot of the results) on a date.
require_once __DIR__ . '/_lib.php';

$device = calc_device($this);
if (!$device) return calc_fail($this, 401, 'device_not_paired');

$body = calc_body($this);
if (!$body) return calc_fail($this, 400, 'bad_request');
if (!calc_is_date($body['date'] ?? null)) return calc_fail($this, 400, 'bad_date');

$list = fn($value, int $max) => is_array($value) ? array_slice(array_values($value), 0, $max) : [];
$currency = fn($value) => in_array($value, ['€', 'lei'], true) ? $value : '';

$events = array_map(fn($e) => [
    'name' => calc_text($e['name'] ?? '', 120),
    'value' => calc_number($e['value'] ?? 0),
    'currency' => $currency($e['currency'] ?? ''),
    'companyEvent' => !empty($e['companyEvent']),
    'priceWithCompanySpendings' => calc_number($e['priceWithCompanySpendings'] ?? 0),
    'ifAvans' => !empty($e['ifAvans']),
    'pretAvans' => calc_number($e['pretAvans'] ?? 0),
    'valutaAvans' => $currency($e['valutaAvans'] ?? ''),
    'avansMembrii' => array_map(fn($m) => calc_text($m, 40), $list($e['avansMembrii'] ?? [], 20)),
], array_filter($list($body['events'] ?? [], 100), 'is_array'));

$spendings = array_map(fn($s) => [
    'name' => calc_text($s['name'] ?? '', 120),
    'value' => calc_number($s['value'] ?? 0),
    'currency' => $currency($s['currency'] ?? ''),
], array_filter($list($body['spendings'] ?? [], 100), 'is_array'));

$members = array_map(fn($m) => [
    'id' => calc_text($m['id'] ?? '', 40),
    'name' => calc_text($m['name'] ?? '', 60),
    'status' => !empty($m['status']),
    'euro' => calc_number($m['euro'] ?? 0),
    'lei' => calc_number($m['lei'] ?? 0),
    'avansEuro' => calc_number($m['avansEuro'] ?? 0),
    'avansLei' => calc_number($m['avansLei'] ?? 0),
], array_filter($list($body['members'] ?? [], 30), 'is_array'));

if (!$events) return calc_fail($this, 400, 'no_events');

$item = $this->module('content')->saveItem('calculations', [
    'date' => $body['date'],
    'title' => calc_text($body['title'] ?? '', 120),
    'curs_euro' => calc_number($body['curs_euro'] ?? 0),
    'total_euro' => calc_number($body['total_euro'] ?? 0),
    'total_lei' => calc_number($body['total_lei'] ?? 0),
    'events' => $events,
    'spendings' => $spendings,
    'members' => $members,
    'device' => $device['name'] ?? '',
]);

return ['id' => $item['_id'], 'date' => $item['date']];
