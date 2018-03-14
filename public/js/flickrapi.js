var getImage = function getImage() {
    var imageUrl;
    var getPromise = fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fapi.flickr.com%2Fservices%2Ffeeds%2Fphotos_public.gne%3Fid%3D160069044%40N05%26lang%3Den-us%26format%3Drss_200');
    getPromise
      .then(function(gotData) {
        return gotData.json();
      })
      .then(function(parsedData) {
        return parsedData.items;
      })
      .then(function(itemList) {
        var randomNum = Math.floor(Math.random() * itemList.length);
        imageUrl = itemList[randomNum].enclosure.link;
        var $bg = $('.background');
        var gradientString = 'linear-gradient(rgba(125,100,150,0.5) 0%,rgba(10,5,15,0.5) 100%), '
        $bg.css('background-image', gradientString+'url('+imageUrl+')');
      });
    };
  
  getImage();