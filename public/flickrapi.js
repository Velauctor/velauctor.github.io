//load our images from RSS Feed 
function imageLoad() {
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=https%3A//api.flickr.com/services/feeds/photos_public.gne%3Fid%3D160069044@N05%26lang%3Den-us%26format%3Drss_200', true);
    //what happens when the data is loaded
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        renderHTML(ourData);
    };
    ourRequest.onerror = function() {
        //set background to default image
    };
    ourRequest.send();
}

function renderHTML(data) {
    var background = document.getElementById("background");
    var htmlString = ' ';

    // var container = document.createElement('div');

    for (var i = 0; i < data.items.length; ++i) {
        image = data.items[i].enclosure.link;
        imageTag = document.createElement('img');
        imageTag.setAttribute('src', image);
        imageContainer = document.createElement('div');
        imageContainer.appendChild(imageTag);
        container.appendChild(imageContainer);
    }
    content.appendChild(container);

}
//TODO: create timer function to switch photos hourly
//TODO: create onError item and set to default image saved to file
//TODO: separate function for imageload and htmlparse
//TODO: connect to velauctor index.html page and test successfully
//TODO: Use setInterval or requestAnimationFrame to create a slider
//TODO: create timerFunction





































// function loadImage(){
//     console.log("load event detected!");
//     const searchTerm = "landscape";
//     const flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
//     // const searchTag = $(searchTerm).text();
//     const flickrOptions = { 
//       tags: searchTerm,
//       format: "json"
//     };
  
//     //TODO: Separate functions
//     //TODO: Select only one image at a time (or something of the sort).. Make a set image function
//     //TODO: Sort for image resolution (identify and select only images that are desktop size)
//     const renderPhotos = function(data) {
//       let photosHtml = '<div class=\"background\">';
//       for (let photo of Array.from(data.items)) {
//         photosHtml = `${photosHtml} <a href=\"#\" class=\"image\">`;
//         photosHtml = `${photosHtml} <img src=\"${photo.link}\"></a>`;
//       }
//       photosHtml = `${photosHtml} </div>`;
//       $('#photo-results').html(photosHtml);
//     };
  
//     $.getJSON(flickrAPI, flickrOptions, renderPhotos);
//   }
  
//   window.onload = loadImage();