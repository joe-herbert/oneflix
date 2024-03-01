//browser.webNavigation.onCommitted.addListener(navigationCommitted);
//function navigationCommitted() {
//    console.log("navCommitted");
//    self.port.emit("close-tab");
//}

window.navigation.addEventListener("navigate", () => {
    console.log("navigate");
    window.close();
});

/*window.addEventListener("locationchange", () => {
window.addEventListener("hashchange", () => {
    console.log("hashchange");
});
window.addEventListener("popstate", () => {
    console.log("popstate");
});
window.addEventListener("pageshow", () => {
    console.log("pageshow");
});

let oldPushState = history.pushState;
history.pushState = function pushState() {
    let ret = oldPushState.apply(this, arguments);
    console.log("history pushState");
    window.dispatchEvent(new Event("pushstate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
};

let oldReplaceState = history.replaceState;
history.replaceState = function replaceState() {
    let ret = oldReplaceState.apply(this, arguments);
    console.log("history replaceState");
    window.dispatchEvent(new Event("replacestate"));
    window.dispatchEvent(new Event("locationchange"));
    return ret;
};

window.addEventListener("load", () => {
    let oldHref = document.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver((mutations) => {
        if (oldHref !== document.location.href) {
            oldHref = document.location.href;
            console.log("url changed!");
        }
    });
    observer.observe(body, { childList: true, subtree: true });
});*/
