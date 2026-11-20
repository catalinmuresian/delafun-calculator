<?php
/**
 * Pairing of the phone that may use the calculator (run on the VPS, as www-data):
 *
 *   sudo -u www-data php /var/www/delafun-calculator/deploy/calc-pair.php code     # one-time code, 10 minutes
 *   sudo -u www-data php /var/www/delafun-calculator/deploy/calc-pair.php list     # paired devices
 *   sudo -u www-data php /var/www/delafun-calculator/deploy/calc-pair.php revoke <id>
 *
 * The code is typed once in the app on the phone; after that only paired devices get the data.
 * A device can also be switched off from the Cockpit panel (Calculator → Dispozitive autorizate → Activ).
 */

if (PHP_SAPI !== 'cli') exit('CLI only');

$cockpitDir = '/var/www/delafun-calculator/cockpit';
define('APP_CLI', true);
require "{$cockpitDir}/bootstrap.php";
$app = Cockpit::instance($cockpitDir);

set_exception_handler(function (Throwable $e) {
    fwrite(STDERR, get_class($e) . ': ' . $e->getMessage() . "\n");
    exit(1);
});

// Cockpit buffers regular output, so write straight to the stream.
$out = fn(string $text) => fwrite(STDOUT, $text . "\n");
$command = $argv[1] ?? 'code';

if ($command === 'code') {
    // No 0/O/1/I, so the code is easy to read and type.
    $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    $code = '';
    for ($i = 0; $i < 8; $i++) $code .= $alphabet[random_int(0, strlen($alphabet) - 1)];

    // A new code voids the older open ones.
    foreach ($app->dataStorage->find('calc/pairing', ['filter' => ['used' => false]])->toArray() as $old) {
        $old['used'] = true;
        $app->dataStorage->save('calc/pairing', $old);
    }
    $item = [
        'code_hash' => hash('sha256', $code),
        'expires' => time() + 600,
        'attempts' => 0,
        'used' => false,
        'created' => time(),
    ];
    $app->dataStorage->save('calc/pairing', $item);

    $out('Cod de autentificare (valabil 10 minute, o singura data): ' . substr($code, 0, 4) . '-' . substr($code, 4));
    exit(0);
}

if ($command === 'list') {
    $devices = $app->module('content')->items('calcdevices', ['sort' => ['_created' => 1]]);
    if (!$devices) $out('Niciun dispozitiv imperecheat.');
    foreach ($devices as $d) {
        $out(sprintf('%s  %-20s  %s  imperecheat %s  ultima folosire %s',
            $d['_id'], $d['name'] ?? '', !empty($d['active']) ? 'ACTIV  ' : 'INACTIV', $d['paired_at'] ?? '-', $d['last_seen'] ?? '-'));
    }
    exit(0);
}

if ($command === 'revoke' && !empty($argv[2])) {
    $device = $app->module('content')->item('calcdevices', ['_id' => $argv[2]]);
    if (!$device) { fwrite(STDERR, "Dispozitiv negasit\n"); exit(1); }
    $app->module('content')->saveItem('calcdevices', ['_id' => $device['_id'], 'active' => false]);
    $out('Dezactivat: ' . ($device['name'] ?? $device['_id']));
    exit(0);
}

fwrite(STDERR, "Comenzi: code | list | revoke <id>\n");
exit(1);
