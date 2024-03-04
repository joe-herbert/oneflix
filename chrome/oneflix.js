window.navigation.addEventListener("navigate", (event) => {
    if (event.canIntercept) {
        if (
            window.location.href.includes("netflix") &&
            event.destination.url.includes("netflix")
        ) {
            const windowParams = new URLSearchParams(window.location.search);
            const eventSearch = new URL(event.destination.url).search;
            const eventParams = new URLSearchParams(eventSearch);
            if (
                window.location.href.includes("watch") &&
                event.destination.url.includes("watch") &&
                windowParams.get("trackId") !== eventParams.get("trackId")
            ) {
                chrome.runtime.sendMessage({ closeTab: true });
            }
        } else if (
            window.location.href.includes("disney") &&
            event.destination.url.includes("disney")
        ) {
            let windowUrl = window.location.href.replace(/\/$/, "");
            let eventUrl = event.destination.url.replace(/\/$/, "");
            if (
                window.location.href.includes("video") &&
                event.destination.url.includes("video") &&
                windowUrl.substring(windowUrl.lastIndexOf("/") + 1) !==
                    eventUrl.substring(eventUrl.lastIndexOf("/") + 1)
            ) {
                chrome.runtime.sendMessage({ closeTab: true });
            }
        }
    }
});
