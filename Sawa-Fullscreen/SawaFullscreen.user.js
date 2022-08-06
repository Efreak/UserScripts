// ==UserScript==
// @name         sawa fullscreen
// @description  Make Sawa comics fullscreen on the comic chapter, smpoth scroll on button presses, and adds pull to refresh (mostly used while debugging, since I wrote this script on a mobile device). Currently only matches urls for The Villainess Lives Twice.
// @downloadURL  https://github.com/Efreak/UserScripts/raw/master/Sawa-Fullscreen/SawaFullscreen.user.js
// @updateURL    https://github.com/Efreak/UserScripts/raw/master/Sawa-Fullscreen/SawaFullscreen.user.js
// @homepage     https://github.com/Efreak/UserScripts/tree/master/Sawa-Fullscreen
// @author       Efreak
// @version      0.1
// @match        https://sawateam.info/the-villainess-lives-twice-chapter-*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sawateam.info
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    // customize here
    var options = {
        smooth:     true,  // set this to false to disable scrolling on keypresses
        arrow:      200,   // how much to scroll on up/down arrow
        page:       1000,  // how much to scroll on page up/down{
        fullscreen: true,  // set fullscreen when tapping on title
        removepad:  true,  // remove extra paadding on various elements
        WARNINGptr: false, // enable pull to refresh. WARNINGz: if you turn this on you will *not* be able to scroll up! Rename this option to ptr ifnyou want to use it (i use it for debugging on mobile)
        comments:   false, // tapping on title alternates between going fullscreen and scrolling comments into view. TODO: consider moving chapter below comments instead
    }

    // When user clicks the title, set it to fullscreen
    if(options.fullscreen){
        var state=true, header=document.body.querySelector('.entry-header');
        header.addEventListener('click',function(e){
            if(options.comments!=false && state==false){
                document.querySelector('.comments-title').scrollIntoView(true);
                state=true;
            } else if(options.comments==false || state==true) {
                document.body.querySelector('.chaptercontent').requestFullscreen();
                state=false;
            }
        });
    }

    var head = document.head || document.getElementsByTagName('head')[0];

    // styles. enable scrolling in the fullscreen element, remove extra paddimg,
    // since we mostly want the chapter

    var sty=document.createElement('style');
    sty.innerHTML='.main-col-inner {\n';
    sty.innerHTML+='    overflow-y:scroll;\n';
    sty.innerHTML+='    overflow-x:none!important;\n';
    sty.innerHTML+='}\n';
    if(options.removepad==true){
        sty.innerHTML+='.post, .entry-title, .entry-header, .entry-header_wrap, .next-buttons, ';
        sty.innerHTML+='.prev-buttons, .item-title, .manga-control, entry-header *, .wrap { \n';
        sty.innerHTML+='    margin-top:0px!important;\n';
        sty.innerHTML+='    margin-bottom: 0px!important;\n';
        sty.innerHTML+='    padding-top:0px!important;\n';
        sty.innerHTML+='    padding-bottom: 0px!important;\n';
        sty.innerHTML+='    border-top:none!important;\n';
        sty.innerHTML+='    border-bottom!important\n';
        sty.innerHTML+='}\n';
    }
    sty.innerHTML+='html, body,.main-col-inner,.chaptercontent, * { scroll-behavior: smooth; }'
    head.insertBefore(sty, head.firstChild);

    if(options.ptr==true){
        // add pull to refresh for debugging changes
        var scr = document.createElement('script');
        scr.src = 'https://unpkg.com/pulltorefreshjs';
        scr.async = true; // optionally
        scr.addEventListener('load', function() {
            const ptr = PullToRefresh.init({
                mainElement: 'body', //'.chaptercontent',
                onRefresh() {
                    // this one was annoying, it kept reloading while fullscreen
                    if(!document.fullscreenElement){
                        window.location.reload();
                    }
                }
            });
        });
        head.insertBefore(scr, head.firstChild);
    }

    // set up smooth scrolling
    if(options.smooth != false){
        var scroll = function(e) {
            if (e.key === 'ArrowDown') {
                (document.fullscreenElement ? document.querySelector('.chaptercontent') : window).scrollBy({
                    top: +options.arrow,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
            if (e.key === 'ArrowUp') {
                (document.fullscreenElement ? document.querySelector('.chaptercontent') : window).scrollBy({
                    top: -options.arrow,
                    behavior: "smoothup"
                });
                e.preventDefault();
            }
            if (e.key === 'PageDown') {
                (document.fullscreenElement ? document.querySelector('.chaptercontent') : window).scrollBy({
                    top: +options.page,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
            if (e.key === 'PageUp') {
                (document.fullscreenElement ? document.querySelector('.chaptercontent') : window).scrollBy({
                    top: -options.page,
                    behavior: "smooth"
                });
                e.preventDefault();
            }
        }
        document.addEventListener('keydown', scroll);
        document.body.addEventListener('keydown', scroll);
        document.querySelector('.chaptercontent').addEventListener('keydown', scroll);
    }
})();
