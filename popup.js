function clickHandler(e) {
    chrome.runtime.sendMessage({ directive: "popup-click" }, function (response) {
        console.log(response);
    });
    
     var gImageSearch;
		var pageNumber=0;		
    google.load('search', '1');
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('analyzeButton').addEventListener('click', clickHandler);
})