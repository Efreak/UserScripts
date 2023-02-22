// ==UserScript==
// @name          eruda
// @namespace     https://github.com/Efreak/UserScripts
// @description   Injects Eruda mobile devtools into all pages, along with a couple plugins
// @copyright     2016-present, liriliri (https://github.com/liriliri)
// @homepageURL   https://eruda.liriliri.io/
// @icon          https://www.google.com/s2/favicons?sz=64&domain=eruda.liriliri.io
// @require       https://cdn.jsdelivr.net/npm/eruda@latest/eruda.min.js
// @require       https://cdn.jsdelivr.net/npm/eruda-code@latest/eruda-code.min.js
// @require       https://pomelo-chuan.github.io/eruda-outline-plugin/eruda-outline-plugin.js
// @require       https://github.com/uplusion23/eruda-dom/raw/a5c4f12ef608f749effec2436e72ed5cc219df98/eruda-dom.min.js
// @run-at        document-start
// @include       *://*/*
// @version       1.0.1
// @downloadURL   https://github.com/Efreak/UserScripts/raw/master/Eruda-Mobile-Devtools/ErudaMobileDevtools.user.js
// @updateURL     https://github.com/Efreak/UserScripts/raw/master/Eruda-Mobile-Devtools/ErudaMobileDevtools.user.js
// @homepage      https://github.com/Efreak/UserScripts/tree/master/Eruda-Mobile-Devtools
// @author        Efreak
// @grant         none
// @noframes
// ==/UserScript==

eruda.init({
    tool:'console,elements,network,resources,sources,info,snippets'.split(',')
});
eruda.add(erudaCode); //buikt-in js executor, start by default
eruda.add(erudaOutlinePlugin); //better than built-in outline function
eruda.add(erudaDom) //wider than the current one, easier to scroll through
