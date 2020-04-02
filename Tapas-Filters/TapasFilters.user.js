// ==UserScript==
// @name         Tapas comic filters
// @version      0.0.1
// @description  Click on a genre in a tapas page listing to hide all results of that genre. Click on a comic name to hide just that comic.
// @downloadURL  https://github.com/Efreak/UserScripts/raw/master/Tapas-Filters/TapasFilters.user.js
// @updateURL    https://github.com/Efreak/UserScripts/raw/master/Tapas-Filters/TapasFilters.user.js
// @homepage     https://github.com/Efreak/UserScripts/tree/master/Tapas-Filters
// @author       Efreak
// @match        https://tapas.io/comics*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.querySelectorAll('li.content-item > a:nth-child(4)').forEach(el=>{
      el.removeAttribute('href');
      el.title="Hide "+el.innerText+" comics from this page";
      el.addEventListener('click',e=>{
        document.querySelectorAll('li.content-item > a:nth-child(4)').forEach(ele=>{
          if(ele.innerText===el.innerText) {
            ele.parentNode.parentNode.removeChild(ele.parentNode);
          }
        });
      });
    });
    document.querySelectorAll('li.content-item > a:nth-child(2)').forEach(el=>{
      el.removeAttribute('href');
      el.title="Hide this comic ("+el.innerText+")\n(Click the image instead to open the comic)";
      el.addEventListener('click',e=>{
        el.parentNode.parentNode.removeChild(el.parentNode);
      });
    });
})();