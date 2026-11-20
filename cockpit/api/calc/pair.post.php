<?php
// POST /cockpit/api/calc/pair {code, name} — pairs this browser with a one-time code
// made on the server (deploy/calc-pair.php). Every wrong code counts against all open codes:
// after 5 wrong tries they are void and a new one has to be made.
require_once __DIR__ . '/_lib.php';

$body = calc_body($this);
if (!$body) return calc_fail($this, 400, 'bad_request');

$code = strtoupper(preg_replace('/[^A-Za-z0-9]/', '', (string) ($body['code'] ?? '')));
$name = calc_text($body['name'] ?? '', 60) ?: 'Telefon';
$now = time();

$open = $this->dataStorage->find('calc/pairing', [
    'filter' => ['used' => false, 'expires' => ['$gt' => $now], 'attempts' => ['$lt' => 5]],
])->toArray();

$match = null;
foreach ($open as $item) {
    if ($code !== '' && hash_equals($item['code_hash'], hash('sha256', $code))) $match = $item;
}

if (!$match) {
    foreach ($open as $item) {
        $item['attempts'] = ($item['attempts'] ?? 0) + 1;
        $this->dataStorage->save('calc/pairing', $item);
    }
    return calc_fail($this, 403, 'invalid_code');
}

$match['used'] = true;
$match['used_at'] = $now;
$this->dataStorage->save('calc/pairing', $match);

$token = bin2hex(random_bytes(32));
$this->module('content')->saveItem('calcdevices', [
    'name' => $name,
    'token_hash' => hash('sha256', $token),
    'active' => true,
    'paired_at' => date('Y-m-d H:i'),
    'last_seen' => date('Y-m-d'),
    'user_agent' => calc_text($this->request->server['HTTP_USER_AGENT'] ?? '', 300),
]);
calc_set_cookie($token);

return ['paired' => true, 'name' => $name];
