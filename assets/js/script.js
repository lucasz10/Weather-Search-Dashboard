//Declaring global variables
var searchBTN = document.getElementById('searchBtn');
var apiKey = "458caba92592b3c1eece46e7c6fef991";

var cityInput;

var cityReport = $('#cityReport');
var searchHistory = $('#searchHistory');

var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

//Declaring functions
function formSearch() { //takes search input and gathers necessary information

    cityInput = document.getElementById('cityInput').value;

    if(!recentSearches.includes(cityInput)) {
        recentSearches.unshift(cityInput);
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))

    $('#cityInput').val(""); //Removes text from input field after clicking search
    searchButtonCreate(); //Creates a button from previous entered text

    //Retrieves the latitude and longitude of the cityInput
    var geocodeCall = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${apiKey}`

    fetch(geocodeCall)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        var latitude = data[0].lat;
        var longitude = data[0].lon;

        console.log(latitude);
        console.log(longitude);
      });


    
};

function searchButtonCreate() { //Creates history buttons based on local storage

    $('#searchHistory').empty(); //Clears history before reinserting
     
    for(let i = 0; i < recentSearches.length; i++) {
        $('#searchHistory').append('<a type="submit" class="btn btn-primary w-100 text-white my-2" id="historyBtn">' + recentSearches[i] + "</a>");
    }
};





//Adding event listeners
searchBTN.addEventListener("click", formSearch);

//Calling certain functions on page load
searchButtonCreate();