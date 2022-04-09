// ==UserScript==
// @name         Download files from hearnow.com
// @version      0.1
// @description  Replaces 'play' links on hearnow.com with download links. Uses fetch api to ensure filenames are correct, so downloads will not begin until the browser has finished downloading the file.
// @downloadURL  https://github.com/Efreak/UserScripts/raw/master/HearNow-Download/HearNow-Download.user.js
// @downloadURL  https://github.com/Efreak/UserScripts/raw/master/HearNow-Download/HearNow-Download.user.js
// @homepage     https://github.com/Efreak/UserScripts/tree/master/HearNow-Download
// @author       Efreak
// @namespace    https://github.com/Efreak/UserScripts
// @match        https://*.hearnow.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=hearnow.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
async function downloadFile(fetchResult,filename) {
    var data = await fetchResult.blob();
    // It is necessary to create a new blob object with mime-type explicitly set
    // otherwise only Chrome works like it should
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE doesn't allow using a blob object directly as link href.
        // Workaround for "HTML7007: One or more blob URLs were
        // revoked by closing the blob for which they were created.
        // These URLs will no longer resolve as the data backing
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
        return;
    }
    // Other browsers
    // Create a link pointing to the ObjectURL containing the blob
    const blobURL = window.URL.createObjectURL(blob);
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = blobURL;
    tempLink.setAttribute('download', filename);
    // Safari thinks _blank anchor are pop ups. We only want to set _blank
    // target if the browser does not support the HTML5 download attribute.
    // This allows you to download files in desktop safari if pop up blocking
    // is enabled.
    if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank');
    }
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(blobURL);
    }, 100);
}


Array.prototype.slice.call(Array.prototype.slice.call(document.querySelectorAll('.hnalbum__tracks-list button[data-src] input[type=hidden][data-hnalbum__track-full-url=""]'))).forEach(btn=>{
console.log(btn.parentNode.title);
console.log(btn);console.log(btn.parentNode);console.log(btn.parentNode.parentNode);
	const ele=btn.parentNode.parentNode;
	const url=btn.value;
	const trackNum=ele.querySelector('.hnalbum__track-number-display').innerText;
	var tracknameele=ele.querySelector('.hnalbum__track-name');
	tracknameele.removeChild(tracknameele.children[0]);
	const trackName=ele.querySelector('.hnalbum__track-name').innerText;
	const artistName=ele.querySelector('.hnalbum__track-artist-name').innerText;
	const extension=url.replace(/^([^\.]+\.\.*)+/,'.');
	const album=document.querySelector('div.hnalbum__album-name-large').innerText;
	const name=album+' '+trackNum+'. '+trackName+' - '+artistName+extension;
/*	const name=document.title+' - '+trackNum+ele.title.replace(/^Play track ([0-9]+), (.*?). Length: [0-9:]+$/,'. $2.'+extension);console.log(name) */

	var a=document.createElement('a');
	a.download=name;
	a.target='_blank';
	a.innerText=name;
	ele.innerHTML='';
	ele.appendChild(a);
	a.onclick=function(){
		fetch(url).then(res=>{
			downloadFile(res,name);
		});
	};
/*	ele.innerHTML='<a ahref="'+url+'" download="'+name+'" target="_blank">'+name+'</a>'; */
});

})();