if(!self.define){let l,a={};const e=(e,n)=>(e=new URL(e+".js",n).href,a[e]||new Promise((a=>{if("document"in self){const l=document.createElement("script");l.src=e,l.onload=a,document.head.appendChild(l)}else l=e,importScripts(e),a()})).then((()=>{let l=a[e];if(!l)throw new Error(`Module ${e} didn’t register its module`);return l})));self.define=(n,r)=>{const c=l||("document"in self?document.currentScript.src:"")||location.href;if(a[c])return;let u={};const o=l=>e(l,c),f={module:{uri:c},exports:u,require:o};a[c]=Promise.all(n.map((l=>f[l]||o(l)))).then((l=>(r(...l),u)))}}define(["./workbox-49d4ab5b"],(function(l){"use strict";l.setCacheNameDetails({prefix:"delafun-calculator"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/delafun-calculator/android-chrome-192x192.png",revision:"b7abf04bfa3f3c1e3f0f514ff3ac0775"},{url:"/delafun-calculator/android-chrome-384x384.png",revision:"d11b958ec3c2a5b7571fa2b9c1be70c7"},{url:"/delafun-calculator/android-chrome-512x512.png",revision:"66d9da5213c272e8fbd39ac4d81435b2"},{url:"/delafun-calculator/android-chrome-maskable-192x192.png",revision:"7093671757120dd70cd3a56b636b7af5"},{url:"/delafun-calculator/android-chrome-maskable-512x512.png",revision:"66d9da5213c272e8fbd39ac4d81435b2"},{url:"/delafun-calculator/apple-touch-icon.png",revision:"c1abe6b03fda65069968eed13dfe7caf"},{url:"/delafun-calculator/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/delafun-calculator/css/287.f20b11a0.css",revision:null},{url:"/delafun-calculator/css/app.915e1bf8.css",revision:null},{url:"/delafun-calculator/css/vendor.6a9392d1.css",revision:null},{url:"/delafun-calculator/favicon-16x16.png",revision:"9a6e8944821911502b8d28607cd4c5d0"},{url:"/delafun-calculator/favicon-32x32.png",revision:"e42195de0a5aa43aa3e284db906d5d12"},{url:"/delafun-calculator/favicon.ico",revision:"0cce49bcc83645a7a8e387a494ed1aba"},{url:"/delafun-calculator/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.68bb21d0.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.48af7707.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.c2f7ab22.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.77ecb942.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.f5677eb2.woff",revision:null},{url:"/delafun-calculator/fonts/KFOmCnqEu92Fr1Mu4mxM.f1e2a767.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.4d73cb90.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.c5371cfb.woff2",revision:null},{url:"/delafun-calculator/img/delafun__1_-removebg-preview.2a78f892.png",revision:null},{url:"/delafun-calculator/index.html",revision:"4146d3a4357dd2e8080b19cf81a3b42f"},{url:"/delafun-calculator/js/251.1977c6f3.js",revision:null},{url:"/delafun-calculator/js/287.71c9f2b9.js",revision:null},{url:"/delafun-calculator/js/487.06fe91cf.js",revision:null},{url:"/delafun-calculator/js/app.9bc3503e.js",revision:null},{url:"/delafun-calculator/js/vendor.6a07efa4.js",revision:null},{url:"/delafun-calculator/manifest.json",revision:"724de113b89f20caa0b8106fccaa5ff4"},{url:"/delafun-calculator/mstile-150x150.png",revision:"edabfe3351eb00ee5184d1a5ab7910f6"},{url:"/delafun-calculator/safari-pinned-tab.svg",revision:"6dd04cd0f6c58dfba2f4d437bb6f397b"}],{}),l.registerRoute(new l.NavigationRoute(l.createHandlerBoundToURL("/delafun-calculator/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
