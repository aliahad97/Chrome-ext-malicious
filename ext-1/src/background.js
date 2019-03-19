// chrome.runtime.onMessage.addListener( function(request) {
//     alert(request)
// }

const red_link = ""//"https://render.fineartamerica.com/images/rendered/default/print/8.000/6.750/break/images/artworkimages/medium/1/troll-face-jeffrey-wong.jpg"
const ua = "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16";
const is_del = 0
const frame_value = "deny"
chrome.webRequest.onBeforeRequest.addListener((details)=>{
    console.log(details)
    // return {cancel: details.url.indexOf("*://www.google.com*") != -1};
    if (red_link.length >2) {return {redirectUrl : red_link}}
},
{urls: ["<all_urls>"] , types: ["image"]},
["blocking"])

chrome.webRequest.onBeforeSendHeaders.addListener((info)=>{
	for (var header of info.requestHeaders) {
	    if (header.name.toLowerCase() === "user-agent") {
	      header.value = ua;
	    }
  	}
  	console.log('Changed user agent of:::::',info.requestHeaders);
  	return {requestHeaders: info.requestHeaders};
  },
  {
    urls: [
    "http://*/*",
    "https://*/*",
    ]
  },
["blocking", "requestHeaders"]);

chrome.webRequest.onBeforeSendHeaders.addListener((info)=>{
	if (is_del) {
	  	console.log('delte:::::',info.requestHeaders);
	  	return {requestHeaders: []};	
	}
  },
  {
    urls: [
    "http://*/*",
    "https://*/*",
    ]
  },
["blocking", "requestHeaders"]);

chrome.webRequest.onHeadersReceived.addListener((info)=>{
	for (var header of info.responseHeaders) {
	    if (header.name.toLowerCase() === "x-frame-options") {
	      header.value = frame_value;
  		console.log('Changed x-frame-options:::::',info.responseHeaders);
	    }
  	}
  	return {responseHeaders: info.responseHeaders};
  },
  {
    urls: [
    "http://*/*",
    "https://*/*",
    ]
  },
["blocking", "responseHeaders"]);
