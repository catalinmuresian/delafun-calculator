<?php
// GET /cockpit/api/calc/curs — the official EUR rate of the National Bank of Romania (BNR),
// published every working day around 13:00. Asked from BNR live on every call; the last answer is
// kept only as a fallback, returned (with stale: true) when BNR does not answer.
require_once __DIR__ . '/_lib.php';

if ($refused = calc_guard($this)) return $refused;

const CALC_BNR_URL = 'https://curs.bnr.ro/nbrfxrates.xml';

$ch = curl_init(CALC_BNR_URL);
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 8,
    CURLOPT_CONNECTTIMEOUT => 5,
    CURLOPT_FOLLOWLOCATION => false,
    CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
    CURLOPT_USERAGENT => 'calc.cmdev.ro',
]);
$xml = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$rate = null;
$date = null;
if ($status === 200 && is_string($xml)
    && preg_match('/<Cube date="(\d{4}-\d{2}-\d{2})">/', $xml, $d)
    && preg_match('/<Rate currency="EUR">([0-9]+\.[0-9]+)<\/Rate>/', $xml, $r)) {
    $rate = (float) $r[1];
    $date = $d[1];
}

$cached = $this->dataStorage->findOne('calc/settings', ['key' => 'bnr_eur']);

// A sane EUR/RON rate only: the live answer, saved as the fallback for next time.
if ($rate && $rate > 1 && $rate < 20 && calc_is_date($date)) {
    $cached = array_merge($cached ?? ['key' => 'bnr_eur'], ['rate' => $rate, 'date' => $date, 'fetched_at' => time()]);
    $this->dataStorage->save('calc/settings', $cached);
    return ['rate' => $rate, 'date' => $date, 'source' => 'BNR', 'stale' => false];
}

// BNR did not answer: the last rate it gave.
if (!empty($cached['rate'])) {
    return ['rate' => $cached['rate'], 'date' => $cached['date'], 'source' => 'BNR', 'stale' => true];
}

return calc_fail($this, 502, 'bnr_unavailable');
