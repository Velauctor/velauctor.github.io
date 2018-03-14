$(document).ready(function() {
    var long;
    var lat;
    
    $.getJSON('http://ip-api.com/json', function(where){
        lat = where.lat;
        long = where.lon;

    //stitch together API request URL by concating location data and API key
        var api = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=7dcbac0df9ce57d2c1cf1c53ede149a9';
        
        $.getJSON(api, function(data){
            var fTemp;
            var cTemp;
            var changeMeasure = true;
            var weatherType = data.weather[0].description;
            var kTemp = data.main.temp;
            var windSpeed = data.wind.speed;
            var city = data.name;
            var mainWeather = data.weather[0].main;

            fTemp = (kTemp * (9/5) - 459.67).toFixed(1);

            const subtractor = 273;
            cTemp = (kTemp - subtractor).toFixed(1);

            $("<li class=\"weather-widget\" id=\"city\">" + city + "</li>").appendTo(".weather");
            $("<li class=\"weather-widget\" id=\"weatherType\">" + weatherType + "</li>").appendTo(".weather");
            $("<li class=\"weather-widget\" id=\"weatherIcon\"> </li>").appendTo(".weather");
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
            $('#weatherIcon').addClass('weatherItem');
            var $weatherItem = $('.weatherItem');

            function setIcon(weatherStatus) {
                weatherStatus = weatherStatus.toLowerCase();

                switch(weatherStatus) {
                case "clouds":
                    $weatherItem.html('<i class="fas fa-cloud"></i>');
                    break;
                case "thunderstorm":
                    $weatherItem.html('<i class="fas fa-bolt"></i>');
                    break;
                case "drizzle":
                    $weatherItem.html('<i class="fas fa-tint-xs"></i>');
                    break;
                case "rain":
                    $weatherItem.html('<i class="fas fa-tint"></i>');
                    break;
                case "snow":
                    $weatherItem.html('<i class="far fa-snowflake"></i>');
                    break;
                case "clear":
                    $weatherItem.html('<i class="fas fa-sun"></i>');
                    break;
                default:
                    $weatherItem.html('<i></i>');}
            }
            setIcon(mainWeather);
        });
    });
});