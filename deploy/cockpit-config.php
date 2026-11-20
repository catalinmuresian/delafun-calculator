<?php
// Cockpit config of calc.cmdev.ro, copied by the deploy to /var/www/delafun-calculator/cockpit/config/config.php.
return [
    // The app calls the API from its own origin only (same-origin needs no CORS); no other site gets in.
    'cors' => [
        'Access-Control-Allow-Origin' => 'https://calc.cmdev.ro',
        'Access-Control-Allow-Credentials' => 'false',
    ],
];
