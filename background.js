chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.directive) {
            case "popup-click":
                chrome.tabs.executeScript(null, { file: "jquery-2.2.0.js" }, function () {
                    chrome.tabs.executeScript(null, { file: "contentscript.js" });
                });
                sendResponse({});
                break;
            default:
                alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
        }
    }
    );
