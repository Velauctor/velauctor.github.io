$(document).ready(function() {
    var long;
    var lat;
    var temp;
     
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(long);
            console.log(lat);
            //create API with GEOlocation
            var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=7dcbac0df9ce57d2c1cf1c53ede149a9';
            console.log(api);
            
            $.getJSON(api, function(data){
                var weatherType = data.weather[0].description;
                var fahrenheit = data.main.temp;
                var city = data.name;

                console.log(city);
                console.log(api);
            });
            // $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
        });
    }
});
