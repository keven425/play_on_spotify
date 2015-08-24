chrome.runtime.onMessage.addListener(function(data) {
	var uri = data.uri;
	// document.location = 'spotify:pause';
	document.location = uri;
})
