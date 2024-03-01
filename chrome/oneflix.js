window.navigation.addEventListener("navigate", (event) => {
    const windowParams = new URLSearchParams(window.location.search);
    const eventSearch = new URL(event.destination.url).search;
    const eventParams = new URLSearchParams(eventSearch);
    if (
        event.canIntercept &&
        window.location.href.includes("watch") &&
        event.destination.url.includes("watch") &&
        windowParams.get("trackId") !== eventParams.get("trackId")
    ) {
        chrome.runtime.sendMessage({ closeTab: true });
    }
});
