document.addEventListener('DOMContentLoaded',()=>{
	document.querySelector('button').addEventListener('click',onclick,false)
	function onclick(){
		console.log("clicked")
		chrome.tabs.query({currentWindow: true, active: true}, (tabs)=>{
			chrome.tabs.sendMessage(tabs[0].id,'hi')
		})
	}
},false)