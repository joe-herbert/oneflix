chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.closeTab) {
        chrome.tabs.remove(sender.tab.id);
    } else {
        return true;
    }
});
