"use strict";
var token;
var tagsArray = [];
GetAccessToken();

var taggedImages = [];


function GetAccessToken(){
$.ajax({
    url: 'https://api.clarifai.com/v1/token/',
    type: 'post',
    data: {
        "grant_type": "client_credentials",
        "client_id": "VrqMJZgz_u2OT6hBnw4s6nZ5Cck1KYsxpKnYS34J",
        "client_secret": "2SMSixhmgjr5N-aW3uOzpGU1z021LhC7vpM1ug_R"
    },
    success: function (data, textStatus, jQxhr) {
        token = data.access_token;
        GetImageLinks();
    },
    error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
    }
});
}

function GetImageLinks(){
var images = document.getElementsByTagName("img");
var srcArray = [];
var pattern = new RegExp(".*\.((jpg|gif|png|mp4)$)");
for (var i = 0; i < images.length; i++) {
    if (pattern.test(images[i].src)) {
        //srcArray.push(images[i].src);
        //console.log(images[i].src);
        GetTags(images[i].parentElement, images[i].src)
    }
}
}

function GetTags(parentElement, imgUrl) {
    var tags = [];
    var probs = [];
    var probsSorted = [];
    var tagProbPairs = [];
    $.ajax({
        url: 'https://api.clarifai.com/v1/tag/?url='+imgUrl,
        type: 'get',
        success: function (data, textStatus, jQxhr) {
            tags = data.results[0].result.tag.classes;
            probs = data.results[0].result.tag.probs;
                  
            //console.log(tags);
            //console.log(probs);
             var i=0;
            tags.forEach(function(tag) {
                var pair = {key: probs[i], value: tag}
                i=i+1;
                tagProbPairs.push(pair);
            }, this);       
            tagProbPairs = tagProbPairs.sort(function(a,b){
        return b.key - a.key;
    }).slice(0,3);  
    var taggedImage = new TaggedImage(parentElement, imgUrl, tagProbPairs);    
    taggedImages.push(taggedImage);
    //console.log(taggedImage);
    ModifyHTML(taggedImage); 
        },
        error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
        },
        beforeSend: function (xhr, settings) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); }
    });
   
      class TaggedImage{
    constructor(parent, imageUrl, tagProbPair){
        this.parent = parent;
        this.imageUrl = imageUrl;
        this.tagProbPair = tagProbPair;
    }      
      }
}

function ModifyHTML(taggedImage){
    //console.log(taggedImage.parent.outerHTML);
    var divToAdd="<div>";
    var i=0;
    taggedImage.tagProbPair.forEach(function(element) {
        i=i+1;
        divToAdd = divToAdd + element.value;
        if(i!=3)
            divToAdd = divToAdd + ", ";
         
    }, this);
    divToAdd = divToAdd + "</div>";
    taggedImage.parent.outerHTML = taggedImage.parent.outerHTML + divToAdd;
    //console.log(taggedImage.parent.outerHTML);
}

//console.log(srcArray);
