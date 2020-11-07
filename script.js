
let searchInput = document.getElementById("city");
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

  for (let i = 0; i < 5; i++) {
    let date = res.list[i].dt_txt;
    let iconNumber = res.list[i].weather[0].icon;
    let temperature = res.list[i].main.temp;
    let humidity = res.list[i].main.humidity;
    let windSpeed = res.list[i].wind.speed;

    console.log(date)
    console.log(iconNumber)
    console.log(temperature)
    console.log(humidity)
    console.log(windSpeed)
  }


  // for (let i = 0; i < 5; i++) {
  //     console.log(res.list[i])

  //     let searchResultEl = document.createElement("p")

  //     searchResultEl.innerText = res.list[i].main.temp

  //     searchResultParentEl.appendChild(searchResultEl)
  // }
};