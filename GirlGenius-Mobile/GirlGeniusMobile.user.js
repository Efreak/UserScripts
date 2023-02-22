// ==UserScript==
// @name         Girl Genius zoom to comic
// @namespace    http://tampermonkey.net/
// @version      1.0.0
// @description  Adds a button to requestFullscreen on the GirlGenius webcomic
// @match        https://www.girlgeniusonline.com/comic.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=girlgeniusonline.com
// @downloadURL  https://github.com/Efreak/UserScripts/raw/master/GirlGenius-Mobile/GirlGeniusMobile.user.js
// @updateURL    https://github.com/Efreak/UserScripts/raw/master/GirlGenius-Mobile/GirlGeniusMobile.user.js
// @homepage     https://github.com/Efreak/UserScripts/tree/master/GirlGenius-Mobile
// @author       Efreak
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //rm takes an array for queryselectors
    var rm=eles=>{
        eles.forEach(ele=>{
           document.querySelector(ele).style.display='none';
        });
    }
    rm([
        '#comicbody > p', //company store link above comic
        '#comicbody > a[href*="backerkit.com"' // game preorders above comic
    ]);
    var d=document.createElement('div'); d.id='flay';d.innerHTML='<br>Click for fullscreen comic';
    d.addEventListener('click',e=>{
        d.style.display='none';
        document.querySelector('#comicarea').requestFullscreen();
    });
    document.body.appendChild(d);
    var c=document.createElement('style');
    c.innerHTML='div:fullscreen{overflow-y:scroll;width:100%!important;height:100%!important;margin-left:-50px}#flay{display:block;z-index:9999;position:absolute;height:50vh;width:100vw;text-align:center;opacity:0.3;font-size:10vw;top:0px;background-color:#ffff;color:#000;}</style>';
    document.head.appendChild(c);

})();
