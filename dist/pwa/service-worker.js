if(!self.define){let a,e={};const l=(l,o)=>(l=new URL(l+".js",o).href,e[l]||new Promise((e=>{if("document"in self){const a=document.createElement("script");a.src=l,a.onload=e,document.head.appendChild(a)}else a=l,importScripts(l),e()})).then((()=>{let a=e[l];if(!a)throw new Error(`Module ${l} didn’t register its module`);return a})));self.define=(o,n)=>{const r=a||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let c={};const d=a=>l(a,r),u={module:{uri:r},exports:c,require:d};e[r]=Promise.all(o.map((a=>u[a]||d(a)))).then((a=>(n(...a),c)))}}define(["./workbox-49d4ab5b"],(function(a){"use strict";a.setCacheNameDetails({prefix:"delafun-calculator"}),self.addEventListener("message",(a=>{a.data&&"SKIP_WAITING"===a.data.type&&self.skipWaiting()})),a.precacheAndRoute([{url:"/delafun-calculator/android/android-launchericon-144-144.png",revision:"8eb2501c2eba380a5fa2691100db96cf"},{url:"/delafun-calculator/android/android-launchericon-192-192.png",revision:"ed8b0fa109e10532f2679d56cdc5718a"},{url:"/delafun-calculator/android/android-launchericon-48-48.png",revision:"d9351f15309abbb9a1c03fb860d5217d"},{url:"/delafun-calculator/android/android-launchericon-512-512.png",revision:"2be116d46b29adcfb5f12b726b52d29e"},{url:"/delafun-calculator/android/android-launchericon-72-72.png",revision:"b19fa38db4d23c86eaa79eaf47423a4e"},{url:"/delafun-calculator/android/android-launchericon-96-96.png",revision:"87a4beeffbf8021e385abd76d37ca71b"},{url:"/delafun-calculator/css/287.f20b11a0.css",revision:null},{url:"/delafun-calculator/css/app.915e1bf8.css",revision:null},{url:"/delafun-calculator/css/vendor.6a9392d1.css",revision:null},{url:"/delafun-calculator/favicon.ico",revision:"f4facfeaed834544d622544acfbb7722"},{url:"/delafun-calculator/fonts/KFOkCnqEu92Fr1MmgVxIIzQ.68bb21d0.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmEU9fBBc-.48af7707.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmSU5fBBc-.c2f7ab22.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmWUlfBBc-.77ecb942.woff",revision:null},{url:"/delafun-calculator/fonts/KFOlCnqEu92Fr1MmYUtfBBc-.f5677eb2.woff",revision:null},{url:"/delafun-calculator/fonts/KFOmCnqEu92Fr1Mu4mxM.f1e2a767.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.4d73cb90.woff",revision:null},{url:"/delafun-calculator/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.c5371cfb.woff2",revision:null},{url:"/delafun-calculator/icons/apple-icon-120x120.png",revision:"d082235f6e6d2109e84e397f66fa868d"},{url:"/delafun-calculator/icons/apple-icon-152x152.png",revision:"3c728ce3e709b7395be487becf76283a"},{url:"/delafun-calculator/icons/apple-icon-167x167.png",revision:"3fec89672a18e4b402ede58646917c2d"},{url:"/delafun-calculator/icons/apple-icon-180x180.png",revision:"aa47843bd47f34b7ca4b99f65dd25955"},{url:"/delafun-calculator/icons/favicon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"/delafun-calculator/icons/favicon-16x16.png",revision:"e4b046d41e08e6fa06626d6410ab381d"},{url:"/delafun-calculator/icons/favicon-32x32.png",revision:"410858b01fa6d3d66b7bf21447c5f1fc"},{url:"/delafun-calculator/icons/favicon-96x96.png",revision:"db2bde7f824fb4057ffd1c42f6ed756e"},{url:"/delafun-calculator/icons/icon-128x128.png",revision:"ab92df0270f054ca388127c9703a4911"},{url:"/delafun-calculator/icons/icon-192x192.png",revision:"7659f0d3e9602e71811f8b7cf2ce0e8e"},{url:"/delafun-calculator/icons/icon-256x256.png",revision:"cf5ad3498fb6fda43bdafd3c6ce9b824"},{url:"/delafun-calculator/icons/icon-384x384.png",revision:"fdfc1b3612b6833a27a7b260c9990247"},{url:"/delafun-calculator/icons/icon-512x512.png",revision:"2c2dc987945806196bd18cb6028d8bf4"},{url:"/delafun-calculator/icons/ms-icon-144x144.png",revision:"8de1b0e67a62b881cd22d935f102a0e6"},{url:"/delafun-calculator/icons/safari-pinned-tab.svg",revision:"3e4c3730b00c89591de9505efb73afd3"},{url:"/delafun-calculator/img/delafun__1_-removebg-preview.2a78f892.png",revision:null},{url:"/delafun-calculator/index.html",revision:"b4bd6d4a118cdd3c1c2fc748898a3641"},{url:"/delafun-calculator/ios/100.png",revision:"7f123a90b586584e279e4b4e64e8cc1a"},{url:"/delafun-calculator/ios/1024.png",revision:"df12751ad53e4a6085be8000777e1e77"},{url:"/delafun-calculator/ios/114.png",revision:"88ed71cb5c32ee34a0081f3616e0c60c"},{url:"/delafun-calculator/ios/120.png",revision:"e424ff60276a41c7d60ed1a82b985949"},{url:"/delafun-calculator/ios/128.png",revision:"0c9c1fefb1a69d1f4d6ef107d6bb13f5"},{url:"/delafun-calculator/ios/144.png",revision:"8eb2501c2eba380a5fa2691100db96cf"},{url:"/delafun-calculator/ios/152.png",revision:"e867f2d3e0a698521d3e66374da834f0"},{url:"/delafun-calculator/ios/16.png",revision:"3c28c4f81a54bbcc5910e9a90ed58d0d"},{url:"/delafun-calculator/ios/167.png",revision:"916e4ef7af1989e6262bddcf251c8c6f"},{url:"/delafun-calculator/ios/180.png",revision:"e9118b61364584a95a800f6041ee89ff"},{url:"/delafun-calculator/ios/192.png",revision:"ed8b0fa109e10532f2679d56cdc5718a"},{url:"/delafun-calculator/ios/20.png",revision:"62b5644653090ae98bfceb5aca6a450d"},{url:"/delafun-calculator/ios/256.png",revision:"0ba3751f0d6e1aa58c2ff83b16380d4b"},{url:"/delafun-calculator/ios/29.png",revision:"128cdffdcb786327f7dfc27985125177"},{url:"/delafun-calculator/ios/32.png",revision:"eaa5a3d97f89cd354cb07eaba4090736"},{url:"/delafun-calculator/ios/40.png",revision:"1f485547c1abe2df0d379a0a75cafd97"},{url:"/delafun-calculator/ios/50.png",revision:"ffb0787cd7f1e1931dcbcbf744b12df1"},{url:"/delafun-calculator/ios/512.png",revision:"2be116d46b29adcfb5f12b726b52d29e"},{url:"/delafun-calculator/ios/57.png",revision:"25a914641db7e540b28408b304226fd7"},{url:"/delafun-calculator/ios/58.png",revision:"43654b6c799eaaa73fa6be9cc058f6ee"},{url:"/delafun-calculator/ios/60.png",revision:"5a46bf5918c1a9e1246de4d7d2bca710"},{url:"/delafun-calculator/ios/64.png",revision:"af23037f18701f65fdad7c9fa2e1e7be"},{url:"/delafun-calculator/ios/72.png",revision:"b19fa38db4d23c86eaa79eaf47423a4e"},{url:"/delafun-calculator/ios/76.png",revision:"708ed80758a989b30903563ea0ad2ed5"},{url:"/delafun-calculator/ios/80.png",revision:"4f4b4df03f4a2493b0d4b4ae5fbb8fb6"},{url:"/delafun-calculator/ios/87.png",revision:"78cbaa108b3bfcfdf7f08eb51a739d03"},{url:"/delafun-calculator/js/251.1977c6f3.js",revision:null},{url:"/delafun-calculator/js/287.ef521a1e.js",revision:null},{url:"/delafun-calculator/js/487.06fe91cf.js",revision:null},{url:"/delafun-calculator/js/app.0562d5f6.js",revision:null},{url:"/delafun-calculator/js/vendor.6a07efa4.js",revision:null},{url:"/delafun-calculator/manifest.json",revision:"d2cab8cdcb0347b27bd380f4222a5d4a"},{url:"/delafun-calculator/windows11/LargeTile.scale-100.png",revision:"62540bc466ffdd588df2fed23e8f4e73"},{url:"/delafun-calculator/windows11/LargeTile.scale-125.png",revision:"d368af347206ed58996f1a79fa316822"},{url:"/delafun-calculator/windows11/LargeTile.scale-150.png",revision:"a045f9d4aca29f40c55c53a6f5d35d18"},{url:"/delafun-calculator/windows11/LargeTile.scale-200.png",revision:"20cb19131e10abe44f732c5a0860778e"},{url:"/delafun-calculator/windows11/LargeTile.scale-400.png",revision:"84fd22439747d1c83f4edb9d6283f545"},{url:"/delafun-calculator/windows11/SmallTile.scale-100.png",revision:"417f2f7f3e90f30d4894947969141757"},{url:"/delafun-calculator/windows11/SmallTile.scale-125.png",revision:"d84476a8e9264b28b8cfad822a3367ac"},{url:"/delafun-calculator/windows11/SmallTile.scale-150.png",revision:"0a679491fb4847b39110acc3e33f1fa7"},{url:"/delafun-calculator/windows11/SmallTile.scale-200.png",revision:"53b60d0166f46759dbc0f4ee55061518"},{url:"/delafun-calculator/windows11/SmallTile.scale-400.png",revision:"aa7edeafa1a0f31702fdb26b3bbc11a3"},{url:"/delafun-calculator/windows11/SplashScreen.scale-100.png",revision:"f1c2c4e92a757cb5bc0d9604d7409404"},{url:"/delafun-calculator/windows11/SplashScreen.scale-125.png",revision:"71381b9dcb3b4ef45aa9ef81717e8ffc"},{url:"/delafun-calculator/windows11/SplashScreen.scale-150.png",revision:"e07cb1128603542fbbd719ca6ad9edf5"},{url:"/delafun-calculator/windows11/SplashScreen.scale-200.png",revision:"4259a039ba01b83055302ed3cdbdfc27"},{url:"/delafun-calculator/windows11/SplashScreen.scale-400.png",revision:"7a4a1d62a12aa4bcb3d386188c85dd5f"},{url:"/delafun-calculator/windows11/Square150x150Logo.scale-100.png",revision:"603d76276c28e20847cf77a1700e2436"},{url:"/delafun-calculator/windows11/Square150x150Logo.scale-125.png",revision:"88c41262d46443bc80d2358efb443b7f"},{url:"/delafun-calculator/windows11/Square150x150Logo.scale-150.png",revision:"672879fa9cdb2425f0dcc465952ec0df"},{url:"/delafun-calculator/windows11/Square150x150Logo.scale-200.png",revision:"5f6347c1005dd36114f18a19da98d967"},{url:"/delafun-calculator/windows11/Square150x150Logo.scale-400.png",revision:"e9f574793120700e2b32e3f0363c7bc4"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",revision:"3c28c4f81a54bbcc5910e9a90ed58d0d"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",revision:"62b5644653090ae98bfceb5aca6a450d"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",revision:"edda750f349538cfed7f09a33279651a"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",revision:"0ba3751f0d6e1aa58c2ff83b16380d4b"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",revision:"519b0aba9167e7d3909f360dd018bf51"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",revision:"eaa5a3d97f89cd354cb07eaba4090736"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",revision:"766396cbe16da74ea8b317bd88088435"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",revision:"1f485547c1abe2df0d379a0a75cafd97"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",revision:"517db63ea9309a9295b2570de78d2aef"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",revision:"d9351f15309abbb9a1c03fb860d5217d"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",revision:"5a46bf5918c1a9e1246de4d7d2bca710"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",revision:"af23037f18701f65fdad7c9fa2e1e7be"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",revision:"b19fa38db4d23c86eaa79eaf47423a4e"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",revision:"4f4b4df03f4a2493b0d4b4ae5fbb8fb6"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",revision:"87a4beeffbf8021e385abd76d37ca71b"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-16.png",revision:"3c28c4f81a54bbcc5910e9a90ed58d0d"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-20.png",revision:"62b5644653090ae98bfceb5aca6a450d"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-24.png",revision:"edda750f349538cfed7f09a33279651a"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-256.png",revision:"0ba3751f0d6e1aa58c2ff83b16380d4b"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-30.png",revision:"519b0aba9167e7d3909f360dd018bf51"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-32.png",revision:"eaa5a3d97f89cd354cb07eaba4090736"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-36.png",revision:"766396cbe16da74ea8b317bd88088435"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-40.png",revision:"1f485547c1abe2df0d379a0a75cafd97"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-44.png",revision:"517db63ea9309a9295b2570de78d2aef"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-48.png",revision:"d9351f15309abbb9a1c03fb860d5217d"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-60.png",revision:"5a46bf5918c1a9e1246de4d7d2bca710"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-64.png",revision:"af23037f18701f65fdad7c9fa2e1e7be"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-72.png",revision:"b19fa38db4d23c86eaa79eaf47423a4e"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-80.png",revision:"4f4b4df03f4a2493b0d4b4ae5fbb8fb6"},{url:"/delafun-calculator/windows11/Square44x44Logo.altform-unplated_targetsize-96.png",revision:"87a4beeffbf8021e385abd76d37ca71b"},{url:"/delafun-calculator/windows11/Square44x44Logo.scale-100.png",revision:"517db63ea9309a9295b2570de78d2aef"},{url:"/delafun-calculator/windows11/Square44x44Logo.scale-125.png",revision:"3fb9797115f2594f2b82ba031e1ece63"},{url:"/delafun-calculator/windows11/Square44x44Logo.scale-150.png",revision:"6646bced592c730b9eefb9244db19918"},{url:"/delafun-calculator/windows11/Square44x44Logo.scale-200.png",revision:"ef25aa7eace85a96448826e01e758764"},{url:"/delafun-calculator/windows11/Square44x44Logo.scale-400.png",revision:"52728fe189376957458988544d8e46b3"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-16.png",revision:"3c28c4f81a54bbcc5910e9a90ed58d0d"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-20.png",revision:"62b5644653090ae98bfceb5aca6a450d"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-24.png",revision:"edda750f349538cfed7f09a33279651a"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-256.png",revision:"0ba3751f0d6e1aa58c2ff83b16380d4b"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-30.png",revision:"519b0aba9167e7d3909f360dd018bf51"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-32.png",revision:"eaa5a3d97f89cd354cb07eaba4090736"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-36.png",revision:"766396cbe16da74ea8b317bd88088435"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-40.png",revision:"1f485547c1abe2df0d379a0a75cafd97"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-44.png",revision:"517db63ea9309a9295b2570de78d2aef"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-48.png",revision:"d9351f15309abbb9a1c03fb860d5217d"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-60.png",revision:"5a46bf5918c1a9e1246de4d7d2bca710"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-64.png",revision:"af23037f18701f65fdad7c9fa2e1e7be"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-72.png",revision:"b19fa38db4d23c86eaa79eaf47423a4e"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-80.png",revision:"4f4b4df03f4a2493b0d4b4ae5fbb8fb6"},{url:"/delafun-calculator/windows11/Square44x44Logo.targetsize-96.png",revision:"87a4beeffbf8021e385abd76d37ca71b"},{url:"/delafun-calculator/windows11/StoreLogo.scale-100.png",revision:"3bff04231a315dc00f5b7a31194e163e"},{url:"/delafun-calculator/windows11/StoreLogo.scale-125.png",revision:"9cbc5019f4ae3aff60fe0c99f32a3a05"},{url:"/delafun-calculator/windows11/StoreLogo.scale-150.png",revision:"598156c97b34b80ac5aa559e006da729"},{url:"/delafun-calculator/windows11/StoreLogo.scale-200.png",revision:"83cf9f28d1dacf3892815e3d01ee9b8b"},{url:"/delafun-calculator/windows11/StoreLogo.scale-400.png",revision:"467553357827d014a2e39baac6556e4a"},{url:"/delafun-calculator/windows11/Wide310x150Logo.scale-100.png",revision:"b5796a1fecdead5143f5a353279fea72"},{url:"/delafun-calculator/windows11/Wide310x150Logo.scale-125.png",revision:"e393fe11151efda6a5ee0367f65aa8ca"},{url:"/delafun-calculator/windows11/Wide310x150Logo.scale-150.png",revision:"6b2c4d2dc3824bd99268f6c4438b1196"},{url:"/delafun-calculator/windows11/Wide310x150Logo.scale-200.png",revision:"f1c2c4e92a757cb5bc0d9604d7409404"},{url:"/delafun-calculator/windows11/Wide310x150Logo.scale-400.png",revision:"4259a039ba01b83055302ed3cdbdfc27"}],{}),a.registerRoute(new a.NavigationRoute(a.createHandlerBoundToURL("/delafun-calculator/index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
