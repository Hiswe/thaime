/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

workbox.core.setCacheNameDetails({prefix: "thaime-cache-v1"});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "index.html",
    "revision": "f842f045cc7e2f21bf8f3163005ce602"
  },
  {
    "url": "launcher-touch-icon-4x.png",
    "revision": "8057c1633c39ca8787c7f7b0275a59cb"
  },
  {
    "url": "thaime.css",
    "revision": "c8b907c960fe5088c346c2125c371db7"
  },
  {
    "url": "thaime.js",
    "revision": "b4782dc47e667a81a4a64bc5623cd384"
  },
  {
    "url": "touch-icon-ipad-retina.png",
    "revision": "7910810d872c5322229461f271bb1b85"
  },
  {
    "url": "touch-icon-ipad.png",
    "revision": "6d3a80926305e8bdfaebbca746b48dfc"
  },
  {
    "url": "touch-icon-iphone-6-plus.png",
    "revision": "304a402e1e109fce4e4c6be4c0d3b2fd"
  },
  {
    "url": "touch-icon-iphone-retina.png",
    "revision": "05baa71762a024ec9b44de64a5e0b13f"
  },
  {
    "url": "touch-icon-iphone.png",
    "revision": "e4b0b13426aee3734fea51f1a5da44f2"
  },
  {
    "url": "touch-icon-web-app.png",
    "revision": "7f04dd3226bc6ce52c0293becbbaacb3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/index.html");

self.addEventListener('message', event => {
  if (!event.data) return
  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting()
      break
    default:
      break
  }
})
