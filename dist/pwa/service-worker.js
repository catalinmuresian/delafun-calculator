if(!self.define){let l,n={};const c=(c,e)=>(c=new URL(c+".js",e).href,n[c]||new Promise((n=>{if("document"in self){const l=document.createElement("script");l.src=c,l.onload=n,document.head.appendChild(l)}else l=c,importScripts(c),n()})).then((()=>{let l=n[c];if(!l)throw new Error(`Module ${c} didn’t register its module`);return l})));self.define=(e,a)=>{const o=l||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let u={};const r=l=>c(l,o),f={module:{uri:o},exports:u,require:r};n[o]=Promise.all(e.map((l=>f[l]||r(l)))).then((l=>(a(...l),u)))}}define(["./workbox-49d4ab5b"],(function(l){"use strict";l.setCacheNameDetails({prefix:"delafun-calculator"}),self.addEventListener("message",(l=>{l.data&&"SKIP_WAITING"===l.data.type&&self.skipWaiting()})),l.precacheAndRoute([{url:"/delafun-calculator/css/app.31d6cfe0.css",revision:null},{url:"/delafun-calculator/css/vendor.0438c5d0.css",revision:null},{url:"/delafun-calculator/favicon.ico",revision:"f4facfeaed834544d622544acfbb7722"},{url:"/delafun-calculator/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.68bb21d0.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.48af7707.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.c2f7ab22.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.77ecb942.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.f5677eb2.woff",revision:null},{url:"/delafun-calculator/fonts/KFOmCnqEu92Fr1Mu4mxM.f1e2a767.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.4d73cb90.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.c5371cfb.woff2",revision:null},{url:"/delafun-calculator/icons/apple-icon-120x120.png",revision:"d082235f6e6d2109e84e397f66fa868d"},{url:"/delafun-calculator/icons/apple-icon-152x152.png",revision:"3c728ce3e709b7395be487becf76283a"},{url:"/delafun-calculator/icons/apple-icon-167x167.png",revision:"3fec89672a18e4b402ede58646917c2d"},{url:"/delafun-calculator/icons/apple-icon-180x180.png",revision:"aa47843bd47f34b7ca4b99f65dd25955"},{url:"/delafun-calculator/icons/favicon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"/delafun-calculator/icons/favicon-16x16.png",revision:"e4b046d41e08e6fa06626d6410ab381d"},{url:"/delafun-calculator/icons/favicon-32x32.png",revision:"410858b01fa6d3d66b7bf21447c5f1fc"},{url:"/delafun-calculator/icons/favicon-96x96.png",revision:"db2bde7f824fb4057ffd1c42f6ed756e"},{url:"/delafun-calculator/icons/icon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"/delafun-calculator/icons/icon-192x192.png",revision:"7659f0d3e9602e71811f8b7cf2ce0e8e"},{url:"/delafun-calculator/icons/icon-256x256.png",revision:"cf5ad3498fb6fda43bdafd3c6ce9b824"},{url:"/delafun-calculator/icons/icon-384x384.png",revision:"fdfc1b3612b6833a27a7b260c9990247"},{url:"/delafun-calculator/icons/icon-512x512.png",revision:"2c2dc987945806196bd18cb6028d8bf4"},{url:"/delafun-calculator/icons/ms-icon-144x144.png",revision:"8de1b0e67a62b881cd22d935f102a0e6"},{url:"/delafun-calculator/icons/safari-pinned-tab.svg",revision:"3e4c3730b00c89591de9505efb73afd3"},{url:"/delafun-calculator/img/delafun__1_-removebg-preview.2a78f892.png",revision:null},{url:"/delafun-calculator/index.html",revision:"7cd36e5e6fb5f2927afe9c92fce2c9cf"},{url:"/delafun-calculator/js/376.42518d84.js",revision:null},{url:"/delafun-calculator/js/487.a1683361.js",revision:null},{url:"/delafun-calculator/js/640.c6d620e1.js",revision:null},{url:"/delafun-calculator/js/app.bc7b1641.js",revision:null},{url:"/delafun-calculator/js/vendor.9c5b5524.js",revision:null},{url:"/delafun-calculator/manifest.json",revision:"d5cf4ebd1ed0eb77bc0b3e9c8f034dbe"}],{}),l.registerRoute(new l.NavigationRoute(l.createHandlerBoundToURL("/delafun-calculator/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));