chrome.tabs.onUpdated.addListener(function(tabId, props) {
    if (props.status !== 'complete') return;
    chrome.tabs.sendMessage(tabId,
        {
            onUpdated: true
        });
});
