let watched = 0;
const debug = false;

window.navigation.addEventListener("navigate", (event) => {
    if (event.canIntercept) {
        let windowPath = window.location.pathname;
        let eventPath = new URL(event.destination.url).pathname;
        windowPath = windowPath.replace(/\/$/, "");
        eventPath = eventPath.replace(/\/$/, "");
        let windowURLParam = windowPath.substring(windowPath.lastIndexOf("/") + 1);
        let eventURLParam = eventPath.substring(eventPath.lastIndexOf("/") + 1);
        let windowSearchParam = window.location.search === "" ? undefined : new URLSearchParams(window.location.search).get("trackId");
        let eventUrl = new URL(event.destination.url);
        let eventSearchParam = eventUrl.search === "" ? undefined : new URLSearchParams(eventUrl.search).get("trackId");
        let differentEpisodes = windowURLParam !== eventURLParam;
        if (debug) {
            console.log("Watched: " + watched);
            console.log(windowURLParam, eventURLParam, windowSearchParam, eventSearchParam, windowURLParam !== eventURLParam, differentEpisodes);
        }

        let watchStrings;
        if (window.location.href.includes("netflix") && event.destination.url.includes("netflix")) {
            watchStrings = ["watch"];
            if (eventPath.includes(watchStrings[0]) && window.location.search === "" && window.location.href.includes("browse")) {
                watched -= 1;
            }
        } else if (window.location.href.includes("disney") && event.destination.url.includes("disney")) {
            watchStrings = ["video", "play"];
        } else if (window.location.href.includes("iplayer") && event.destination.url.includes("iplayer")) {
            watchStrings = ["episode/"];
        }

        if (
            watchStrings &&
            watchStrings.reduce((a, c) => a + (window.location.href.includes(c) && event.destination.url.includes(c)), 0) == 1 &&
            differentEpisodes
        ) {
            if (debug) {
                console.log(
                    watched,
                    window.location,
                    window.location.href,
                    event.destination,
                    event.destination.url,
                    event.downloadRequest,
                    event.formData,
                    event.hashChange,
                    event.navigationType,
                    event.signal,
                    event.userInitiated
                );
            }
            chrome.storage.sync.get(["toWatch", "enabled"], (values) => {
                if (values.enabled === undefined) {
                    chrome.storage.sync.set({ enabled: true });
                    values.enabled = true;
                }
                console.log(values.enabled);
                if (values.enabled) {
                    watched++;
                    if (values.toWatch === undefined) {
                        chrome.storage.sync.set({ toWatch: 1 });
                        values.toWatch = 1;
                    }
                    console.log(watched, values.toWatch);
                    if (watched >= values.toWatch) {
                        watched = -1;
                        if (debug) {
                            console.log("CLOSE");
                        } else {
                            chrome.runtime.sendMessage({ closeTab: true });
                        }
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
