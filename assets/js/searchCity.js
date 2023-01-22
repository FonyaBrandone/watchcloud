//Script handles Searched City weather Forcasts:
let town = document.getElementById('input');
let searchBtn = document.getElementById('search');
let apiID = "a43be420988b4b0787fe5f55ec2ceb65";
searchBtn.addEventListener("click", () => searchWeather(town.value, apiID));


function searchWeather(town, api_val) {
    let cityVal = town;
    let apiVal = api_val;

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityVal + '&appid=' + apiVal)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
            displayForcast(data); //Show Current Location's weather info
        })
}


function displayForcast(data) {

    //Get All needed Data from Api Json Data:
    var temVal = Math.round(parseFloat(data.main.temp) - 273.15);
    var humVal = data.main.humidity;

    //If city name not given or result of forcast not found, dont pop-up
    if (temVal == NaN || town.value == "") {
        document.getElementById('searchModal').style.display = 'none';
    }

    let presVal = data.main.pressure;
    let cityNameVal = data.name;
    let windSpeedVal = data.main.pressure;
    let countryVal = data.sys.country;
    let riseVal = data.sys.sunrise;
    let setVal = data.sys.sunset;

    let riseTimeVal = new Date(riseVal * 1000);
    let setTimeVal = new Date(setVal * 1000);

    let sunriseVal = riseTimeVal.toLocaleTimeString("default");
    let sunsetVal = setTimeVal.toLocaleTimeString("default");

    var descVal = data.weather[0].description;
    var searchCondition;
    if (descVal.indexOf('rain') > 0) {
        searchCondition = 'rainy';
    } else if (descVal.indexOf('cloud') > 0) {
        searchCondition = 'cloudy';
    } else if (descVal.indexOf('sunny') > 0) {
        searchCondition = 'sunny';
    }


    //Putting values:
    document.getElementById('search-city').innerHTML = cityNameVal
    document.getElementById('search-temp').innerHTML = temVal;
    document.getElementById('search-hum').innerHTML = humVal;
    document.getElementById('search-wind').innerHTML = windSpeedVal;
    document.getElementById('search-pres').innerHTML = presVal;
    document.getElementById('search-desc').innerHTML = descVal;
    document.getElementById('country').innerHTML = countryVal;
    document.getElementById('search-loc').innerHTML = cityNameVal;
    document.getElementById('search-state').innerHTML = searchCondition;

    document.getElementById('search-rise').innerHTML = sunriseVal;
    document.getElementById('search-set').innerHTML = sunsetVal;

}