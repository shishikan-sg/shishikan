if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,t,r)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const n={uri:location.origin+s.slice(1)};return Promise.all(t.map(s=>{switch(s){case"exports":return c;case"module":return n;default:return e(s)}})).then(e=>{const s=r(...e);return c.default||(c.default=s),c})}))}}define("./sw.js",["./workbox-8778d57b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/c3H7wIgz_A4Ztj6OIrB10/_buildManifest.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/c3H7wIgz_A4Ztj6OIrB10/_ssgManifest.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/05d954cf.1bfb247e55b51d0dc166.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/0ed649ed584081fcb610d3c4b7d9fdcae9de79f5.696174d73aaa5272e76e.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/1a48c3c1.d05e1d1c62a7d3d9fae0.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/252f366e.f27316a0dfb2adc8e6bc.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/3a33a243eee8e2aadf9fffa5cd4c6e8778f3ecbf.be92106058101e109512.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/42424140b3d94e2c39d10f0e3a19a95b0aa99eb2.ee0d091533c1b28b4188.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/49e8c8f5ccae626bde7fd65c81a21a1197f6e7fa.002c67f48db72eca6b67.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/80a79669a99ec9d23c86be0cc1a32bcce0edfeb1.88a72e09df7af6a7aa22.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/9f28187a1eca4d0d68a074c2af2bf678fd331b3b.225fa054dd7d6205a72c.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/b98bc7c3.e5e2b775b37ec0384134.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/bee240a3.0d9837969591cff14524.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/commons.7e1de37342e3ff166d4b.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/d7eeaac4.16fcc3b95a4671d1a222.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/e4ddef9a48737557eb7aafd0eddaa547f270d102.9026b82c47155fd27524.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/f2e80800.6f633cfc1c6248f7cb31.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/ff239f9d.e4d0a8b81e7ac2982aaa.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/framework.9707fddd9ae5927c17c3.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/main-df6b1c0fecf9109ba075.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/_app-fc2a99793e678fef371c.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/_error-c0093430ced9896d0c89.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/add-1fb54119434368dac49d.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/food/%5BfoodId%5D-c3f0536b221ca6bbc40e.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/index-5e2311077c6978bf78a8.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/list/%5BlistId%5D-1ce26c28fbb076fbe713.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/pages/lists-69749c06ec07bf99bc43.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/polyfills-780bbb25ca31cca5194f.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/_next/static/css/a97dbaad771ac8afc86e.css",revision:"c3H7wIgz_A4Ztj6OIrB10"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"f01c965a1c51e997c475e447692adb59"},{url:"/ssk.png",revision:"ca30e9c265ec1818f7c852debb11f7b7"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
