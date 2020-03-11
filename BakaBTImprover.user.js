// ==UserScript==
// @name         Bakabt Improver
// @version      0.1.7
// @description  Some simple improvements for easier browsing bakabt
// @downloadURL  https://github.com/Efreak/BakaBT-Improver/raw/master/BakaBTImprover.user.js
// @updateURL    https://github.com/Efreak/BakaBT-Improver/raw/master/BakaBTImprover.user.js
// @homepage     https://github.com/Efreak/BakaBT-Improver
// @author       Cholik, Efreak
// @match        https://www.bakabt.me/*
// @match        https://bakabt.me/*
// @grant        none
// @namespace    https://github.com/Efreak/BakaBT-Improver
// ==/UserScript==

(function() {
    'use strict';

    var userlink = '',
        setBackground = true,
        setBakaIconOnKnown = true,
        knownBackgroundColor = '#0029972d',
        knownAltBackgroundColor = '#00299717',
        freeleechBackgroundColor = '#bce0bc68',
        freeleechAltBackgroundColor = '#bce0bc34',
        knownTorrents = [],
        updateInterval = 5, //in minutes
        $ = window.$;

    if(document.location.pathname.indexOf('/browse.php') > -1) {
        updateKnownTorrents();
    }

    function addOwnedIcon(ele) {
        var ico=document.createElement('span');
        ico.className="icon owned";
        ico.title="On your account/profile";
        var eles=ele.querySelectorAll('td.name');
        if(eles[0]){
            eles[0].querySelector('a.title').insertAdjacentElement('afterend',ico)
        }
    }
    function markTorrents() {
        // remove all 'owned' icons before putting them back...too lazy to to this right
        Array.prototype.slice.call($('span.icon.owned')).forEach(ele => {
            ele.parentNode.removeChild(ele);
        });
        // mark freeleech torrents before known torrents (known don't matter)
        Array.prototype.slice.call($('tr.torrent.alt1 td span.icon.freeleech, tr.torrent_alt td span.icon.freeleech')).forEach(function(icon){
            if(setBackground==true) {
                $(icon.parentNode.parentNode.querySelector('td.category')).attr('style', 'background-color:' + freeleechBackgroundColor);
            }
        });
        Array.prototype.slice.call($('tr.torrent.alt0 td span.icon.freeleech, tr.torrent_alt td span.icon.freeleech')).forEach(function(icon){
            if(setBackground==true) {
                $(icon.parentNode.parentNode.querySelector('td.category')).attr('style', 'background-color:' + freeleechAltBackgroundColor);
            }
        });
        // mark known torrents
        if(knownTorrents.length > 0) {
            var alt = null;
            for(var i = 0; i < knownTorrents.length; i++) {
                alt = null;
                if(setBackground==true) {
                    $('tr.torrent.alt1[data-torrentid="' + knownTorrents[i] + '"]').attr('style', 'background-color:' + knownBackgroundColor);
                    $('tr.torrent.alt0[data-torrentid="' + knownTorrents[i] + '"]').attr('style', 'background-color:' + knownAltBackgroundColor);
                }
                if(setBakaIconOnKnown==true) {
                    Array.prototype.slice.call($('tr.torrent[data-torrentid="' + knownTorrents[i] + '"]')).forEach(ele=>addOwnedIcon(ele));
                }
                alt = $('tr.torrent_alt[data-torrentid="' + knownTorrents[i] + '"]');
                if($('tr.torrent_alt[data-torrentid="' + knownTorrents[i] + '"]').length) {
                    while(alt.hasClass('torrent_alt')) {
                        if(setBackground==true) {
                            alt.attr('style', 'background-color:' + knownBackgroundColor);
                        }
                        alt = alt.next();
                    }
                }
            }
        }
    }

    function updateKnownTorrents() {
        if(!needUpdate()) {
            markTorrents();
            return;
        }
        var user = $('.username');
        if(user.length) {
            userlink = 'https://www.bakabt.me/' + user.attr('href');

            $.ajax({
                type: 'GET',
                url: userlink,
                success: function(res, success) {
                    var body = $(res);
                    knownTorrents = [];
                    body.find('tr.torrent').each(function(index, item){
                        knownTorrents.push(item.getAttribute('data-torrentid'));
                    });

                    localStorage.setItem('BI_needUpdate', Date.now());
                    localStorage.setItem('BI_knownTorrents', JSON.stringify(knownTorrents));
                    markTorrents();
                }
            });
        }
    }

    function needUpdate() {
        var update = false;
        var lastUpdate = localStorage.getItem('BI_needUpdate');
        knownTorrents = JSON.parse(localStorage.getItem('BI_knownTorrents'));
        if(!lastUpdate) {
            update = true;
        }
        else {
            if(((Date.now() - lastUpdate) / 1000 / 60) > updateInterval) {
                update = true;
            }
        }

        return update;
    }
    window.addEventListener('load',markTorrents);
    var styleToAdd=document.createElement('style');
    styleToAdd.innerHTML='span.icon.owned {\n    background:none;\n    overflow: hidden;\n    width:16px;\n    display:inline-block;\n    height:16px;\n    margin-left:2px;\n}\nspan.icon.owned:after{\n    content: url(/resources/img/favicon.png);\n}';
    document.head.appendChild(styleToAdd);
})();
