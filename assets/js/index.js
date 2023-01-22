var currentCity = "London"; //Default city

if (navigator.geolocation) {
    let k = navigator.geolocation;
    k.getCurrentPosition(successFunc, errFunc);

    function successFunc(data) {
        //get coordinates and use it to get user's current City
        let lat = data.coords.latitude;
        let long = data.coords.longitude;

        //OpenCage api key = b91fa56f5ba44e18ab0246f88d51d3da
        let opencage_key = "b91fa56f5ba44e18ab0246f88d51d3da";
        let openweather_key = "a43be420988b4b0787fe5f55ec2ceb65";
        getCity(long, lat, opencage_key); //passing coordinates to get city name
        getCurrentWeatherInfo(lat, long, openweather_key); //Passing coordinates to get city weather infos
    }

    function getCity(longitude, latitude, key) {
        let apikey = key;
        let latVal = latitude;
        let longVal = longitude;
        //alert("latitude = " + latVal + " longitude = " + longVal);
        fetch('https://api.opencagedata.com/geocode/v1/json' +
                '?' +
                'key=' + apikey +
                '&q=' + encodeURIComponent(latVal + ',' + longVal) +
                '&pretty=1' +
                '&no_annotations=1'
                //Below then takes the data in json format and passes it to a function for processing

            ).then(function(resp) { return resp.json() }) // Convert data to json
            .then(function(data) {
                myCity(data.results[0].components.city); //Show Current Location's weather info
            })
    }

    function myCity(x) {
        //alert(x); = this alerts this users current city;
        currentCity = x;

    }


    function errFunc(data) {
        //Use standard City 'London' when geolocation denied or faces error:
        getCurrentWeatherInfo(51.509865, -0.118092, "a43be420988b4b0787fe5f55ec2ceb65");
    }
} else {
    //handles case where browser current location geolocation is not working:
    getCurrentWeatherInfo(3, 3, "a43be420988b4b0787fe5f55ec2ceb65");
}

function getCurrentWeatherInfo(xLat, yLong, key_id) {
    //OpenWeatherMap Api Key = a43be420988b4b0787fe5f55ec2ceb65
    let x = xLat;
    let y = yLong;
    let access_key = key_id;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + x + '&lon=' + y + '&appid=' + access_key)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            showCurrentInfo(data); //Show Current Location's weather info
        })
}

function showCurrentInfo(data) {

    var tempAvg = Math.round(parseFloat(data.main.temp) - 273.15);
    var hum = data.main.humidity;
    var pres = data.main.pressure;
    var cityName = data.name;
    let windSpeed = data.main.pressure;
    let cntry = data.sys.country;
    let rise = data.sys.sunrise;
    let set = data.sys.sunset;

    let riseTime = new Date(rise * 1000);
    let setTime = new Date(set * 1000);

    let sunrise = riseTime.toLocaleTimeString("default");
    let sunset = setTime.toLocaleTimeString("default");

    var description = data.weather[0].description;

    currentCity = cityName;
    //Putting values:
    document.getElementById('this-city').innerHTML = cityName;
    document.getElementById('temp').innerHTML = tempAvg;
    document.getElementById('hum').innerHTML = hum;
    document.getElementById('wind').innerHTML = windSpeed;
    document.getElementById('pres').innerHTML = pres;
    document.getElementById('desc').innerHTML = description;
    document.getElementById('this-loc').innerHTML = cityName;
    document.getElementById('code').innerHTML = cntry;

    document.getElementById('rise').innerHTML = sunrise;
    document.getElementById('set').innerHTML = sunset;

    if (description.indexOf('rain') > 0) {
        document.getElementById('state').innerHTML = 'rainy';
    } else if (description.indexOf('cloud') > 0) {
        document.getElementById('state').innerHTML = 'cloudy';
    } else if (description.indexOf('sunny') > 0) {
        document.getElementById('state').innerHTML = 'sunny';
    }
}

function loadWeather() {
    document.getElementById('current-section').style.display = 'block';
}