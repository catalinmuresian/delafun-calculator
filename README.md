# delafun-calculator (delafun-calculator)

An app calculator

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js).
# delafun-calculator

## Productie (VPS): https://calc.cmdev.ro

Aceeasi structura ca la insta.cmdev.ro si programari.cmdev.ro:

```
/var/www/delafun-calculator/
├── public_html/   build-ul aplicatiei (dist/pwa, static), inlocuit la fiecare deploy
└── cockpit/       Cockpit CMS, la https://calc.cmdev.ro/cockpit
```

- **Deploy automat:** la fiecare push pe `main`, `.github/workflows/deploy.yml` face build-ul PWA si il copiaza in
  `public_html`. Aplicatia e statica: o serveste direct Nginx, fara pm2/Node.
  In GitHub → **Settings → Secrets and variables → Actions**: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`.
- **Nginx:** `deploy/nginx-calc.cmdev.ro.conf` (aplicatia pe `/`, Cockpit pe `/cockpit` cu parola pe panou),
  HTTPS cu `certbot --nginx -d calc.cmdev.ro`.

## Acces doar de pe telefonul autorizat

Aplicatia (calculul, calendarul, raportul) merge doar pe dispozitivele autentificate. Calculele salvate stau in
Cockpit (modelul `calculations`); endpoint-urile sunt in `cockpit/api/calc/` (copiate la deploy in
`cockpit/config/api/calc/`). Un calcul salvat nu se poate modifica, doar sterge.

- **Cod de autentificare** (valabil 10 minute, o singura data), introdus o data pe telefon:
  `ssh root@89.37.212.145 'cd /tmp && sudo -u www-data php /var/www/delafun-calculator/deploy/calc-pair.php code'`
- **Dispozitive:** `... calc-pair.php list`; dezactivare: `... calc-pair.php revoke <id>` sau din panoul Cockpit
  (Calculator → Dispozitive autorizate → Activ).
- Pe iPhone, aplicatia adaugata pe ecranul principal are alt spatiu de stocare decat Safari: autentifica-te
  in varianta pe care o folosesti.
- Daca stergi datele site-ului din browser, telefonul trebuie autentificat din nou (cod nou).
