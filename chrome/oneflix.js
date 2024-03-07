let firstWatch = true;

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

        if (window.location.href.includes(watchString) && event.destination.url.includes(watchString) && differentEpisodes) {
            if (!firstWatch) {
                chrome.runtime.sendMessage({ closeTab: true });
            }
            firstWatch = false;
        }
    }
});
