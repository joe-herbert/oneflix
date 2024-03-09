let watched = -1;

window.navigation.addEventListener("navigate", (event) => {
    if (event.canIntercept) {
        let windowPath = window.location.pathname;
        let eventPath = new URL(event.destination.url).pathname;
        windowPath = windowPath.replace(/\/$/, "");
        eventPath = eventPath.replace(/\/$/, "");
        let differentEpisodes = windowPath.substring(windowPath.lastIndexOf("/") + 1) !== eventPath.substring(eventPath.lastIndexOf("/") + 1);

        let watchString;
        if (window.location.href.includes("netflix") && event.destination.url.includes("netflix")) {
            watchString = "watch";
        } else if (window.location.href.includes("disney") && event.destination.url.includes("disney")) {
            watchString = "video";
        }

        if (watchString && window.location.href.includes(watchString) && event.destination.url.includes(watchString) && differentEpisodes) {
            chrome.storage.sync.get(["toWatch", "enabled"], (values) => {
                if (values.enabled === undefined) {
                    chrome.storage.sync.set({ enabled: true });
                    values.enabled = true;
                }
                if (values.enabled) {
                    watched++;
                    if (values.toWatch === undefined) {
                        chrome.storage.sync.set({ toWatch: 1 });
                        values.toWatch = 1;
                    }
                    if (watched >= values.toWatch) {
                        watched = -1;
                        chrome.runtime.sendMessage({ closeTab: true });
                    }
                }
            });
        }
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.type) {
        case "toWatchChange":
            chrome.storage.sync.set({ toWatch: request.value });
            break;
        case "enabledChange":
            chrome.storage.sync.set({ enabled: request.value });
            break;
    }
});
