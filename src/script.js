function formatedDate(now) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  let year = now.getFullYear();
  return `${day}, ${month} ${date}, ${year}`;
}

function currentTime(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let formatAMPM = `${hours}:${minutes}${ampm}`;
  return formatAMPM;
}

function formatedForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "8881b33e91641557db17feae97031d9c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  console.log(forecast);

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let max = Math.round(forecastDay.temp.max);
      let min = Math.round(forecastDay.temp.min);
      let iconId = forecastDay.weather[0].icon;
      let day = formatedForecastDate(forecastDay.dt);

      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      ${day}
      <br />
      <img src="images/weather-icons/${iconId}.png" alt="icon" width="38"/>
      <div>
        <span class="forecast-temp-max">${max}</span>°/
      </div>
      <div>
        <span class="forecast-temp-min">${min}</span>° F
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(cityEntered) {
  let apiKey = "8881b33e91641557db17feae97031d9c";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityEntered}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(fahrenheitTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityEntered = document.querySelector("#enter-search-input").value;
  let city = document.querySelector("#current-city");
  search(cityEntered);

  if (cityEntered === "" || cityEntered === " ") {
    alert("Please enter a city name.");
  } else {
    return (city.innerHTML = cityEntered.trim());
  }
}

function fahrenheitTemp(response) {
  fahrenheitTemperature = response.data.main.temp;
  feelsLikeTemperature = response.data.main.feels_like;
  highTemperature = response.data.main.temp_max;
  lowTemperature = response.data.main.temp_min;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    fahrenheitTemperature
  );

  document.querySelector("#high").innerHTML = Math.round(highTemperature);

  let lowTemp = document.querySelector("#low");
  let low = Math.round(lowTemperature);
  lowTemp.innerHTML = `${low} °F`;

  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  let feelsLike = document.querySelector("#feels-like");
  let feels = Math.round(feelsLikeTemperature);
  feelsLike.innerHTML = `${feels} °F`;

  document.querySelector("#clouds").innerHTML =
    response.data.weather[0].description;

  let iconId = response.data.weather[0].icon;

  document
    .querySelector("#icon")
    .setAttribute("src", `images/weather-icons/${iconId}.png`);

  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coord);
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "8881b33e91641557db17feae97031d9c";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(fahrenheitTemp);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsius = document.querySelector("#current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let celsiusTemp = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  celsius.innerHTML = celsiusTemp;

  let feelsLikeC = document.querySelector("#feels-like");
  let feels = Math.round(((feelsLikeTemperature - 32) * 5) / 9);
  feelsLikeC.innerHTML = `${feels} °C`;

  let highTempC = document.querySelector("#high");
  highTempC.innerHTML = Math.round(((highTemperature - 32) * 5) / 9);

  let lowTempC = document.querySelector("#low");
  let low = Math.round(((lowTemperature - 32) * 5) / 9);
  lowTempC.innerHTML = `${low} °C`;
}

function showfahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let fahrenheit = document.querySelector("#current-temp");
  fahrenheit.innerHTML = Math.round(fahrenheitTemperature);

  let feelsLike = document.querySelector("#feels-like");
  let feels = Math.round(feelsLikeTemperature);
  feelsLike.innerHTML = `${feels} °F`;

  let lowTemp = document.querySelector("#low");
  let low = Math.round(lowTemperature);
  lowTemp.innerHTML = `${low} °F`;

  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = Math.round(highTemperature);
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
let time = document.querySelector("#current-time");
currentDate.innerHTML = formatedDate(now);
time.innerHTML = currentTime(now);

let searchCity = document.querySelector("#city-input");
searchCity.addEventListener("submit", handleSubmit);

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getPosition);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemp);

let fahrenheitTemperature = null;
let feelsLikeTemperature = null;
let highTemperature = null;
let lowTemperature = null;

search("New York");
