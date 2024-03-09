document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("enabled").addEventListener("change", (event) => {
        enabledChange(event.currentTarget.checked);
    });
    document.getElementById("toWatch").addEventListener("change", (event) => {
        toWatchChange(event.currentTarget.value);
    });
    chrome.storage.sync.get(["enabled", "toWatch"], (values) => {
        document.getElementById("enabled").checked = values.enabled;
        document.getElementById("toWatch").value = values.toWatch;
    });
});

function toWatchChange(value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "toWatchChange", value: value });
    });
}

function enabledChange(value) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "enabledChange", value: value });
    });
}
