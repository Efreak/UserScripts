// ==UserScript==
// @name         Block ESC Interception
// @version      0.0.1
// @description  Blocks ESC on websites that do obnoxious things. Submit a pull request (NOT an issue) if you want to update it.
// @downloadURL  https://github.com/Efreak/UserScripts/raw/master/Block-ESC/BlockEsc.user.js
// @updateURL    https://github.com/Efreak/UserScripts/raw/master/Block-ESC/BlockEsc.user.js
// @homepage     https://github.com/Efreak/UserScripts/tree/master/Block-ESC
// @author       Efreak
// @namespace    https://github.com/Efreak/UserScripts
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var esc_counter=3;
    window.addEventListener('keyup', event => {
        if (event.keyCode == 27 && esc_counter > 0) {
            esc_counter--;
            event.stopPropagation();
            return true;
        }
        return false;
    }, true);
})();