<?php
/**
 * Provisions the calculator's Cockpit v2 instance (idempotent, run by the deploy on every push):
 *  - content models: calculations (saved calculations) and calcdevices (paired phones)
 *  - the role "calc-gate" with no permissions, and the app's public API key bound to it
 *
 * The key is public on purpose (it is in the app's JavaScript, src/services/calcApi.js): with no
 * permissions it only lets requests reach /cockpit/api/calc/*, which check the paired device themselves.
 *
 * Usage: sudo -u www-data php cockpit-provision.php /var/www/delafun-calculator/cockpit
 */

if (PHP_SAPI !== 'cli') exit('CLI only');

const CALC_PUBLIC_API_KEY = 'API-calc-37ecf6bf509f8ac310c5eb81805f2972';

$cockpitDir = realpath($argv[1] ?? '');
if (!$cockpitDir || !is_file("{$cockpitDir}/bootstrap.php")) {
    fwrite(STDERR, "Cockpit directory not found\n");
    exit(1);
}

define('APP_CLI', true);
require "{$cockpitDir}/bootstrap.php";
$app = Cockpit::instance($cockpitDir);

// Cockpit installs its own error handling, which hides failures from CLI scripts.
set_exception_handler(function (Throwable $e) {
    fwrite(STDERR, get_class($e) . ': ' . $e->getMessage() . "\n");
    exit(1);
});

$field = fn(string $name, string $type = 'text', array $extra = []) => array_merge([
    'name' => $name,
    'type' => $type,
    'label' => $name,
    'info' => '',
    'group' => '',
    'i18n' => false,
    'required' => false,
    'multiple' => false,
    'meta' => [],
    'opts' => [],
], $extra);

$models = [
    'calculations' => [
        'label' => 'Calcule salvate',
        'fields' => [
            $field('date', 'date', ['label' => 'Data', 'required' => true]),
            $field('title', 'text', ['label' => 'Titlu']),
            $field('curs_euro', 'number', ['label' => 'Curs euro']),
            $field('total_euro', 'number', ['label' => 'Total de impartit €']),
            $field('total_lei', 'number', ['label' => 'Total de impartit lei']),
            $field('events', 'object', ['label' => 'Evenimente']),
            $field('spendings', 'object', ['label' => 'Cheltuieli']),
            $field('members', 'object', ['label' => 'Membri si sume']),
            $field('device', 'text', ['label' => 'Salvat de pe']),
        ],
    ],
    // No underscore: Cockpit drops it from model names.
    'calcdevices' => [
        'label' => 'Dispozitive autorizate',
        'fields' => [
            $field('name', 'text', ['label' => 'Nume']),
            $field('active', 'boolean', ['label' => 'Activ', 'default' => true,
                'info' => 'Debifat: dispozitivul pierde imediat accesul']),
            $field('token_hash', 'text', ['label' => 'Token (SHA-256)']),
            $field('paired_at', 'text', ['label' => 'Imperecheat la']),
            $field('last_seen', 'text', ['label' => 'Ultima folosire']),
            $field('user_agent', 'text', ['label' => 'Browser']),
            // Biometric unlock (WebAuthn): the phone's public key; the private one stays in its secure chip.
            $field('webauthn_cred_id', 'text', ['label' => 'Biometrie: credential id',
                'info' => 'Golit: telefonul isi inregistreaza din nou Face ID / amprenta la urmatoarea deschidere']),
            $field('webauthn_pubkey', 'textarea', ['label' => 'Biometrie: cheie publica']),
            $field('webauthn_alg', 'number', ['label' => 'Biometrie: algoritm']),
            $field('webauthn_counter', 'number', ['label' => 'Biometrie: contor']),
            $field('webauthn_origin', 'text', ['label' => 'Biometrie: origine']),
            $field('challenge_hash', 'text', ['label' => 'Provocare (SHA-256)']),
            $field('challenge_exp', 'number', ['label' => 'Provocare expira']),
            $field('unlock_hash', 'text', ['label' => 'Sesiune deblocata (SHA-256)']),
            $field('unlock_exp', 'number', ['label' => 'Sesiune expira']),
        ],
    ],
];

$modelHelper = $app->helper('content.model');
foreach ($models as $name => $def) {
    $data = ['label' => $def['label'], 'type' => 'collection', 'fields' => $def['fields'], 'group' => 'Calculator'];
    if ($modelHelper->exists($name)) $modelHelper->update($name, $data);
    else $modelHelper->create($name, $data);
}

// A role with no permissions: the public key reaches only the custom endpoints.
$roleId = 'calc-gate';
$role = $app->dataStorage->findOne('system/roles', ['appid' => $roleId]) ?? [
    'appid' => $roleId,
    'name' => 'Calculator (fara permisiuni)',
    'info' => 'Doar acces la /api/calc/*, care verifica dispozitivul',
    'expressions' => [],
    '_created' => time(),
];
$role['permissions'] = [];
$role['_modified'] = time();
$app->dataStorage->save('system/roles', $role);
$app->helper('acl')->cache();

$key = $app->dataStorage->findOne('system/api_keys', ['key' => CALC_PUBLIC_API_KEY]) ?? [
    'name' => 'calc-app-public',
    'key' => CALC_PUBLIC_API_KEY,
    'info' => 'Cheie publica a aplicatiei (in JS); rolul calc-gate nu are permisiuni',
    'meta' => [],
    '_created' => time(),
];
$key['role'] = $roleId;
$key['_modified'] = time();
$app->dataStorage->save('system/api_keys', $key);
$app->helper('api')->cache();

// Cockpit buffers regular output, so write straight to the stream.
fwrite(STDOUT, "Cockpit provisioned: models " . implode(', ', array_keys($models)) . ", key calc-app-public\n");
