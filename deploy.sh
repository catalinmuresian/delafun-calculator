#!/usr/bin/env sh


quasar build -m pwa

git add .

git commit -m 'deploy'

git push
