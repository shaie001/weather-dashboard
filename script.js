
let searchInput = document.getElementById("searched-city");
let searchBtn = document.getElementById("search-btn");
let searchedCity;
let weatherApiKey = `82df0740eeb678f44927e8e2dcec03df`;
let searchResultParentEl = document.getElementById("search-results");

searchBtn.addEventListener("click", function () {
  searchedCity = searchInput.value;

  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&units=imperial&appid=${weatherApiKey}`,
    type: "GET",
    dataType: "json",
    success: function (res) {
      searchResults(res);
    },
  });
});

/*
 * city name
 * the date,
 * an icon representation of weather conditions
 * the temperature,
 * the humidity
 * the wind speed
 * UV index | come back to this one
 */

const searchResults = function (res) {
  console.log(res);

  let city = res.city.name;

  let resultsElObj = {
    resultsListOne: document.getElementById("results-list-1"),
    resultsListTwo: document.getElementById("results-list-2"),
    resultsListThree: document.getElementById("results-list-3"),
    resultsListFour: document.getElementById("results-list-4"),
    resultsListFive: document.getElementById("results-list-5"),
  };

  let imageElObj = {
    imageOne: document.getElementById("icon-image-1"),
    imageTwo: document.getElementById("icon-image-2"),
    imageThree: document.getElementById("icon-image-3"),
    imageFour: document.getElementById("icon-image-4"),
    imageFive: document.getElementById("icon-image-5"),
  }

  Object.values(resultsElObj).forEach((el, i) => {
    let date = res.list[i].dt_txt;
    let temperature = res.list[i].main.temp;
    let humidity = res.list[i].main.humidity;
    let windSpeed = res.list[i].wind.speed;

  
    let datelistEl = document.createElement("li");
    datelistEl.innerText = `Date: ${date}`;

    let temperatureEl = document.createElement("li");
    temperatureEl.innerText = `Temp: ${temperature}`;

    let humidityEl = document.createElement("li");
    humidityEl.innerText = `humidity: ${humidity}`;

    let windSpeedEl = document.createElement("li");
    windSpeedEl.innerText = `windSpeed: ${windSpeed}`;

    el.appendChild(datelistEl);
    datelistEl.appendChild(temperatureEl);
    temperatureEl.appendChild(humidityEl);
    humidityEl.appendChild(windSpeedEl);
  });


  Object.values(imageElObj).forEach((el, i) => {

    let iconNumber = res.list[i].weather[0].icon;
    el.setAttribute("src", `http://openweathermap.org/img/w/${iconNumber}.png`)
  })
};

const getIconImage = function (iconNumber) {
  $.ajax({
    url: `http://openweathermap.org/img/w/${iconNumber}.png`,
    type: "GET",
    dataType: "json",
    success: function (res) {
      return res
    },
  });
};