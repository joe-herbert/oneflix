chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.closeTab) {
        chrome.tabs.remove(sender.tab.id);
    } else {
        return true;
    }
});

chrome.commands.onCommand.addListener((command) => {
    if (command === "toggle-enabled") {
        chrome.storage.sync.get("enabled", (values) => {
            chrome.storage.sync.set({ enabled: !values.enabled });
        });
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.storage.sync.set({ toWatch: 1, enabled: true });
    }
});
