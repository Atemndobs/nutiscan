if(!self.define){let e,a={};const s=(s,i)=>(s=new URL(s+".js",i).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(a[n])return;let t={};const r=e=>s(e,n),o={module:{uri:n},exports:t,require:r};a[n]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"dc70d790f4f823d65dbc51c75f797a12"},{url:"/_next/static/c8DLkiAx_XaEaqUBOakSD/_buildManifest.js",revision:"ae9eef61ecb4f32528f2e03fce5305d0"},{url:"/_next/static/c8DLkiAx_XaEaqUBOakSD/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/166-a15aa7cf80bdd844.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/395-570b66fc945b8087.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/396-9c86d7148b449cb4.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/477-15e5733a01f3124f.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/568-7b7f5d222579aaf0.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/854-7af544969f712fe1.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/864-8ec39a739e2f7f81.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/871-c7b7ecd67d02ce98.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/_not-found-1f7fdac7b2b38ab4.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/categories/%5Bname%5D/page-45b93db0c3eb502d.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/categories/page-7989a9d9c4f448df.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/history/page-8cd872baaf8ccdd9.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/layout-77d532067aba3d17.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/page-4b4e63179078fd01.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/settings/page-a61b803e03d15f2c.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/app/stats/page-fc68bd34609157fe.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/fd9d1056-9c51d7cd49990852.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/main-42a31e3ee6e1764a.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/main-app-278d311790a1f5b9.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/pages/_app-27277a117f49dcf1.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/pages/_error-91a5938854a6f402.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-0f353388888d6b14.js",revision:"c8DLkiAx_XaEaqUBOakSD"},{url:"/_next/static/css/2bffa39b42bff20c.css",revision:"2bffa39b42bff20c"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/apple-touch-icon.png",revision:"c941924502dbb6bf94cc5b48750aafe9"},{url:"/icon-192x192.png",revision:"d1f6d62992329edfe9580c17357a695f"},{url:"/icon-512x512.png",revision:"c1925a4648dfe481a099d7e35d3b5340"},{url:"/manifest.json",revision:"fc736dca373f3106b726b836a652a6cc"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:s,state:i})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
