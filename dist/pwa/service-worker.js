if(!self.define){let l,e={};const a=(a,n)=>(a=new URL(a+".js",n).href,e[a]||new Promise((e=>{if("document"in self){const l=document.createElement("script");l.src=a,l.onload=e,document.head.appendChild(l)}else l=a,importScripts(a),e()})).then((()=>{let l=e[a];if(!l)throw new Error(`Module ${a} didn’t register its module`);return l})));self.define=(n,r)=>{const c=l||("document"in self?document.currentScript.src:"")||location.href;if(e[c])return;let u={};const o=l=>a(l,c),f={module:{uri:c},exports:u,require:o};e[c]=Promise.all(n.map((l=>f[l]||o(l)))).then((l=>(r(...l),u)))}}define(["./workbox-49d4ab5b"],(function(l){"use strict";l.setCacheNameDetails({prefix:"delafun-calculator"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/delafun-calculator/android-chrome-192x192.png",revision:"9c089861babdb4230f0477c6689b63b3"},{url:"/delafun-calculator/android-chrome-256x256.png",revision:"be421e216b1103107e3daa0968e396f6"},{url:"/delafun-calculator/apple-touch-icon.png",revision:"b1cb54692559568cc78e58631afc3dbb"},{url:"/delafun-calculator/css/287.356ee064.css",revision:null},{url:"/delafun-calculator/css/app.915e1bf8.css",revision:null},{url:"/delafun-calculator/css/vendor.6a9392d1.css",revision:null},{url:"/delafun-calculator/favicon-16x16.png",revision:"26317c5e57fd96cfe2c39027bef85e02"},{url:"/delafun-calculator/favicon-32x32.png",revision:"b9d7e1f96237e91879f830ab333048c5"},{url:"/delafun-calculator/favicon.ico",revision:"c89a5dd24757e573e1b14decac01ddd4"},{url:"/delafun-calculator/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.68bb21d0.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.48af7707.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.c2f7ab22.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.77ecb942.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.f5677eb2.woff",revision:null},{url:"/delafun-calculator/fonts/KFOmCnqEu92Fr1Mu4mxM.f1e2a767.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.4d73cb90.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.c5371cfb.woff2",revision:null},{url:"/delafun-calculator/image-girl.png",revision:"34b75c4abc082fba0edb0e5e4c36a5a5"},{url:"/delafun-calculator/img/delafun__1_-removebg-preview.2a78f892.png",revision:null},{url:"/delafun-calculator/index.html",revision:"7f47964fbd6314b17dfde9b018a490b9"},{url:"/delafun-calculator/js/18.2b842a58.js",revision:null},{url:"/delafun-calculator/js/287.ee83a7de.js",revision:null},{url:"/delafun-calculator/js/487.06fe91cf.js",revision:null},{url:"/delafun-calculator/js/app.647b146a.js",revision:null},{url:"/delafun-calculator/js/vendor.161a4a57.js",revision:null},{url:"/delafun-calculator/manifest.json",revision:"b3eff246314a8e36a919c54b3f28be0e"},{url:"/delafun-calculator/mstile-150x150.png",revision:"9bfc7c315bb96c462c02d62fb5081464"},{url:"/delafun-calculator/safari-pinned-tab.svg",revision:"a46c378eb0dd9678c44c80882c209ef2"},{url:"/delafun-calculator/screenshot-desktop.png",revision:"60aaec94deab6f93f577854b46ddf535"},{url:"/delafun-calculator/screenshot-mobile.png",revision:"60aaec94deab6f93f577854b46ddf535"},{url:"/delafun-calculator/screenshot-wide.png",revision:"60aaec94deab6f93f577854b46ddf535"}],{}),l.registerRoute(new l.NavigationRoute(l.createHandlerBoundToURL("/delafun-calculator/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
