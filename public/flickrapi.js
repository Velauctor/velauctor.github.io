//load our images from RSS Feed 
var ourRequest = new XMLHttpRequest();

function imageLoad() {
    ourRequest.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=https%3A//api.flickr.com/services/feeds/photos_public.gne%3Fid%3D160069044@N05%26lang%3Den-us%26format%3Drss_200', true);
    //what happens when the data is loaded
    ourRequest.onload = function() {
        var ourData = JSON.parse(ourRequest.responseText);
        console.log(JSON.parse(ourRequest.responseText));
        renderHTML(ourData);
    };
    ourRequest.onerror = function() {
        //set background to default image
    };
    ourRequest.send();
}
imageLoad();

var switcher;
var delay = 3600;
function delaySwitch() {
    switcher = setInterval(renderHTML, 3600);
}

function renderHTML(data) {
    var background = document.getElementById("background");
    var sliderOuter = document.createElement('div');
    sliderOuter.classList.add("slider-outer");
    var sliderInner = document.createElement('div');
    sliderInner.classList.add("slider-inner");
    sliderOuter.appendChild(sliderInner);
    background.appendChild(sliderOuter);
    //create a list of images to be used to create a slider
    for (var i = 0; i < data.items.length; ++i) {
        image = data.items[i].enclosure.link;
        spanTag = document.createElement('span');
        itemTag = document.createElement('div');
        itemTag.classList.add("slide-item");
        spanTag.classList.add("slide-image");
        spanTag.setAttribute("style", "background-image: url(" + image + ");");
        itemTag.appendChild(spanTag);
        sliderInner.appendChild(itemTag);
    }
    console.log('background: ', background);
}
//slider
var slideCount = document.querySelectorAll('.slider-inner .slide-item').length;
var slideWidth = document.querySelectorAll('.slider-outer')[0].offsetWidth;
var slideHeight = document.querySelectorAll('.slider-outer')[0].offsetHeight;

var sliderUlWidth = slideCount * slideWidth;
document.querySelectorAll('.slider-inner')[0].style.cssText = "width:" + sliderUlWidth + "px";

for (var i = 0; i < slideCount; i++) {
    document.querySelectorAll('.slide-item')[i].style.cssText = "width:" + slideWidth + "px;height:" + slideHeight + "px";
}

setInterval(function() {
moveRight();
}, 36000);
var counter = 1;

function moveRight() {
var slideNum = counter++;
    if (slideNum < slideCount) {
    var transformSize = slideWidth * slideNum;
    document.querySelectorAll('.slider-inner')[0].style.cssText = 
        "width:" + sliderUlWidth + "px; -webkit-transition:all 1000ms ease; -webkit-transform:translate3d(-" + transformSize + "px, 0px, 0px);-moz-transition:all 1000ms ease; -moz-transform:translate3d(-" + transformSize + "px, 0px, 0px);-o-transition:all 1000ms ease; -o-transform:translate3d(-" + transformSize + "px, 0px, 0px);transition:all 1000ms ease; transform:translate3d(-" + transformSize + "px, 0px, 0px)";
    } else {
    counter = 1;
    document.querySelectorAll('.slider-inner')[0].style.cssText = "width:" + sliderUlWidth + "px;-webkit-transition:all 1000ms ease; -webkit-transform:translate3d(0px, 0px, 0px);-moz-transition:all 1000ms ease; -moz-transform:translate3d(0px, 0px, 0px);-o-transition:all 1000ms ease; -o-transform:translate3d(0px, 0px, 0px);transition:all 1000ms ease; transform:translate3d(0px, 0px, 0px)";
    }
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