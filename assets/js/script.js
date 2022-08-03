//Declaring global variables
var searchBTN = document.getElementById('searchBtn');
var apiKey = "458caba92592b3c1eece46e7c6fef991";

var cityInput;

var cityReport = $('#cityReport');
var searchHistory = $('#searchHistory');

var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

var latitude;
var longitude;

//Declaring functions
function formSearch() { //takes search input and gathers necessary information

    cityInput = document.getElementById('cityInput').value;

    if(!recentSearches.includes(cityInput)) {
        recentSearches.unshift(cityInput);
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))

    $('#cityInput').val(""); //Removes text from input field after clicking search
    searchButtonCreate(); //Creates a button from previous entered text

    //Retrieves the latitude and longitude of the cityInput, only takes the first result
    var geocodeCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`

    fetch(geocodeCall)
    .then(function (response) {
        
        return response.json();
    })
    .then(function (data) {
       
        latitude = data[0].lat;
        longitude = data[0].lon;
        var weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`


        fetch(weatherURL) //Gets data based on city information
        .then(function (response) {
            return response.json();
        })
        .then (function (data) {
            displayWeather(data)
        });
        console.log(latitude);
    })

    console.log(latitude);

    
};


function searchButtonCreate() { //Creates history buttons based on local storage

    $('#searchHistory').empty(); //Clears history before reinserting
     
    for(let i = 0; i < recentSearches.length; i++) {
        $('#searchHistory').append('<a type="submit" class="btn btn-primary w-100 text-white my-2" id="historyBtn">' + recentSearches[i] + "</a>");
    }
};

function displayWeather(weatherInfo) {
    console.log(weatherInfo);

    $('#currentCity').text(cityInput + " , " + weatherInfo.current.dt)
    
    $('#currentTemp').text("Temp: " + weatherInfo.current.temp);
    $('#currentIcon').setAtt
    $('#currentWind').text("Wind Speed: " + weatherInfo.current.wind_speed);
    $('#currentHumidity').text("Humidity: " + weatherInfo.current.humidity + "%");
    $('#currentUV').text("UV Index: " + weatherInfo.current.uvi);

    //Adjusts UV Index Background based on how high it is
    if (weatherInfo.current.uvi <= 2.9) {
        $('#currentUV').removeClass("bg-warning bg-danger").addClass("bg-success");
      } else if (weatherInfo.current.uvi > 2.9 && weatherInfo.current.uvi <= 5.9) {
        $('#currentUV').removeClass("bg-success bg-danger").addClass("bg-warning");
      } else {
        $('#currentUV').removeClass("bg-warning bg-success").addClass("bg-danger");
      }


      $('#5DayForecast').empty(); //Removes previous city data to create new elements
}



//Adding event listeners
searchBTN.addEventListener("click", formSearch);

//Calling certain functions on page load
searchButtonCreate();