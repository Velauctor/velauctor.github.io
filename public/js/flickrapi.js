var getImage = function getImage() {
    var imageUrl;
    var getPromise = fetch('...');
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