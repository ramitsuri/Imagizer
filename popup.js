/*document.addEventListener('DOMContentLoaded', function() {
  var analyzeButton = document.getElementById('analyzeButton');
  analyzeButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    });
  }, false);
}, false);
*/

/*
document.addEventListener('DOMContentLoaded', function() {
  var analyzeButton = document.getElementById('analyzeButton');
  analyzeButton.addEventListener('click', function() {
chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
        if(response.method=="getText"){
            alltext = response.data;
            console.log(alltext);
        }
    });
});
//alert("helllo");
 }, false);
}, false);
*/

/*
document.addEventListener('DOMContentLoaded', function() {
 var analyzeButton = document.getElementById('analyzeButton');
chrome.analyzeButton.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    
        // ...if it matches, send a message specifying a callback too
        //chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
        alert("hello");
   
});
}, false);*/

function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "popup-click"}, function(response) {
        console.log(response);
        //this.close(); // close the popup when the background finishes processing request
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('analyzeButton').addEventListener('click', clickHandler);
})