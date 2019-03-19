// receives message from background script
chrome.runtime.onMessage.addListener(function(message) {
  document.getElementsByTagName('title')[0].innerHTML = 'LOL' 
  str = ''

  alert("title changed to LOL");
});
