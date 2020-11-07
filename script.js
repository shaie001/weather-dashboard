let searchInput = document.getElementById("city");
let searchBtn = document.getElementById("search-btn");
let city;
let weatherApiKey = `82df0740eeb678f44927e8e2dcec03df`;

searchBtn.addEventListener("click", function () {
  city = searchInput.value;

  $.ajax({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${weatherApiKey}`,
    type: "GET",
    dataType: "json",
    success: function (res) {
      console.log(res);
    },
  });
});
