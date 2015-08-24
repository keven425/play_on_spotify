chrome.contextMenus.removeAll(function() {
	chrome.contextMenus.create(
		{
			title: 'Play in Spotify',
			contexts: ['selection'],
			onclick: function(data, tab) {
				var selection = data.selectionText;
				var tabId = tab.id;
				searchSpotify(selection, tabId);
			}
		},
		function() {}
	);
});

function searchSpotify(selection, tabId) {
	$.get( 'https://api.spotify.com/v1/search', { 
		q: selection, // whild card for after
		type: "track" 
	})
	.done(function( data ) {
		var uri = data.tracks.items[0].uri;
		
		// ask sender tab to change document.location - this way Chrome doesn't leave a dangling external-protocol window open
		chrome.tabs.sendMessage(tabId, {
			uri : uri
		}, function() {});  
	});
}