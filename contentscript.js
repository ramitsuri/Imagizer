//console.log(document.all[0].innerText);
//console.log("helo");
//console.log(document.body.outerHTML);
/*var srcArray = [];
$(inputHTML).find('img').each(function(){
   src = $(this).attr('src');
   srcArray.push(src);
});
console.log(srcArray);*/
/*inputHTML.match(/(\/.*?\.\w{3})/img);
console.log(result[0]);*/
var inputHTML = document.body.outerHTML;
var images = document.getElementsByTagName("img");
var srcArray = [];
var pattern = new RegExp(".*\.((jpg|gif|png)$)");
for(var i=0; i < images.length; i++){
    /*if(images[i].src.toLowerCase().indexOf("jpg")>-1 || images[i].src.toLowerCase().indexOf("png")>-1 || images[i].src.toLowerCase().indexOf("gif")>-1)
        {
            srcArray.push(images[i].src);
        console.log(images[i].src);
        }   */
       if(pattern.test(images[i].src)){
          srcArray.push(images[i].src);
           console.log(images[i].src);
       } 
}
var token;
var tagsArray = [];
$.ajax({
                url: 'https://api.clarifai.com/v1/token/',                
                type: 'post',                
                data :  { 
                                        "grant_type":"client_credentials", 
                                        "client_id":"VrqMJZgz_u2OT6hBnw4s6nZ5Cck1KYsxpKnYS34J", 
                                        "client_secret":"2SMSixhmgjr5N-aW3uOzpGU1z021LhC7vpM1ug_R" 
                                    },            
                success: function( data, textStatus, jQxhr ){
                   token = data.access_token;
                   GetTags("s")
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                }
            });
            
        function GetTags(imgUrl) {
    $.ajax({
                url: 'https://api.clarifai.com/v1/tag/?url=http://www.clarifai.com/img/metro-north.jpg',                
                type: 'get',                                       
                success: function( data, textStatus, jQxhr ){
                   console.log(data.results[0].result.tag.classes);
                },
                error: function( jqXhr, textStatus, errorThrown ){
                    console.log( errorThrown );
                },
                beforeSend: function(xhr, settings) { xhr.setRequestHeader('Authorization','Bearer ' + token); } 
            });
            
}    
//console.log(srcArray);