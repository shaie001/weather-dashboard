let searchBtn = document.getElementById("search-btn");
let searchInput = document.getElementById("searched-city");
let weatherApiKey = `82df0740eeb678f44927e8e2dcec03df`;
let storageIndex = 0;
let currentWeatherTitle = document.getElementById("current-weather-title");
let currentWeatherIcon = document.getElementById("current-weather-icon");
let currentWeatherDetails = document.getElementById("current-weather-details");
let futureWeatherTitle = document.getElementById("future-weather-title");
let futureWeatherIcon = document.getElementById("future-weather-icon");
let futureWeatherDetails = document.getElementById("future-weather-details");

searchBtn.addEventListener("click", function () {
  searchedCity = searchInput.value;

  if (searchedCity) {
    getCurrentForcast(searchedCity);
  } else {
    handleEmptySearch();
  }
});

function getCurrentForcast(searchedCity) {
  let currentForcastApi = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&units=imperial&Appid=${weatherApiKey}`;

  fetch(currentForcastApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      addToLocalStorage(data.name);
      addCurrentForcast(data);
      getFutureForcast(data);
    });
}

function addToLocalStorage(name) {
  localStorage.setItem(storageIndex, name);
  storageIndex++;
}

function addCurrentForcast(data) {
  clearCurrentForcastContents();

  let city = data.name;
  let date = new Date(data.dt * 1000).toLocaleDateString("en-US");

  currentWeatherTitle.innerText = `${city}: ${date}`;
  currentWeatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );

  let temp = document.createElement("P");
  temp.innerText = `Temp: ${data.main.temp}`;
  currentWeatherDetails.append(temp);

  let humidity = document.createElement("P");
  humidity.innerText = `Humidity: ${data.main.humidity}`;
  temp.append(humidity);

  let windSpeed = document.createElement("P");
  windSpeed.innerText = `Wind Speed: ${data.wind.speed}`;
  humidity.append(windSpeed);
}

function getFutureForcast(data) {
  let futureForcastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&units=imperial&Appid=${weatherApiKey}`;

  fetch(futureForcastApi)
    .then((response) => response.json())
    .then((data) => {
      addFutureForecast(data);
    });
}

function addFutureForecast(data) {
  clearFutureForcastContents();
  console.log(data);
  let daysIndex = [0, 8, 16, 24, 32];

  daysIndex.forEach(function (i) {
    let futureWeather = data.list[i];

    let icon = document.createElement("IMG");
    icon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${futureWeather.weather[0].icon}@2x.png`
    );

    futureWeatherDetails.append(icon)

    let date = new Date(futureWeather.dt * 1000).toLocaleDateString("en-US");
    let dateEl = document.createElement("P");
    dateEl.innerText = date;
    futureWeatherDetails.append(dateEl);

    let temp = document.createElement("P");
    temp.innerText = `Temp: ${futureWeather.main.temp}`;
    dateEl.append(temp);

    let humidity = document.createElement("P");
    humidity.innerText = `Humidity: ${futureWeather.main.temp}`;
    temp.append(humidity);
  });
}

// Error Handlers
function handleEmptySearch() {
  alert("City cannot be blank!");
}

function clearCurrentForcastContents() {
  while (currentWeatherDetails.firstChild) {
    currentWeatherDetails.removeChild(currentWeatherDetails.firstChild);
  }
}

function clearFutureForcastContents() {
  while (futureWeatherDetails.firstChild) {
    futureWeatherDetails.removeChild(futureWeatherDetails.firstChild);
  }
}
