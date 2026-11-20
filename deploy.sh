#!/usr/bin/env sh
# Deploy-ul se face automat din GitHub Actions (.github/workflows/deploy.yml) la fiecare push pe main:
# build PWA -> /var/www/delafun-calculator/public_html pe VPS (https://calc.cmdev.ro).
# Pentru un deploy manual fara commit nou: GitHub -> Actions -> "Deploy CALCULATOR to VPS" -> Run workflow.
git push
