$(document).ready(function() {
    var long;
    var lat;
<<<<<<< Updated upstream
    var temp;
     
=======
    
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                var weatherType = data.weather[0].description;
                var fahrenheit = data.main.temp;
                var city = data.name;

                console.log(city);
                console.log(api);
=======
                var fTemp;
                var cTemp;
                var changeMeasure = true;
                var weatherType = data.weather[0].description;
                var kTemp = data.main.temp;
                var windSpeed = data.wind.speed;
                var city = data.name;

                fTemp = (kTemp * (9/5) - 459.67).toFixed(1);

                const subtractor = 273;
                cTemp = (kTemp - subtractor).toFixed(1);

                $("<li class=\"weather-widget\" id=\"city\">" + city + "</li>").appendTo(".weather");
                $("<li class=\"weather-widget\" id=\"weatherType\">" + weatherType + "</li>").appendTo(".weather");
                $("<li class=\"weather-widget\" id=\"fTemp\">" + fTemp + '&#8457;'+ "</li>").appendTo(".weather");
                $('#fTemp').click(function() {
                    if (changeMeasure === false) {
                        $('#fTemp').html(cTemp + '&#8451;');
                        changeMeasure = true;
                    } else {
                        $('#fTemp').html(fTemp + '&#8457;');
                        changeMeasure = false;
                    }
                });
>>>>>>> Stashed changes
            });
            // $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
        });
    }
});
