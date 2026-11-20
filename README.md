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
