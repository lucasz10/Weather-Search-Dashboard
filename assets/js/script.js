var searchBTN = document.getElementById('searchBtn');
var apiKey = "458caba92592b3c1eece46e7c6fef991";

var cityReport = $('#cityReport');
var searchHistory = $('#searchHistory');

var recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

searchBTN.addEventListener("click", formSearch);

function formSearch() {
    var cityInput = document.getElementById('cityInput').value;

    if(!recentSearches.includes(cityInput)) {
        recentSearches.push(cityInput);
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
    
};