chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.closeTab) {
        chrome.tabs.query({ active: true }, function (tabs) {
            chrome.tabs.remove(tabs[0].id);
        });
    }
});
