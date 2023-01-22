//Checks if user is online or not consistently:
setInterval(() => {
    var connection = navigator.onLine;
    if (connection == false) {
        document.getElementById('current-section').style.display = 'none';
    }
}, 1000);
if (navigator.onLine == false) {
    alert("You're Offline, check your connection!")
}

//Don't show current weather till the page loads
document.getElementById('current-section').style.display = 'none';
window.addEventListener("load", loadWeather());