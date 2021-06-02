function formatedDate(now) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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

let now = new Date();
let currentDate = document.querySelector("#current-date");
let time = document.querySelector("#current-time");
currentDate.innerHTML = formatedDate(now);
time.innerHTML = currentTime(now);

let searchCity = document.querySelector("#city-input");
searchCity.addEventListener("submit", handleSubmit);

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
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#high").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#clouds").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
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

let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getPosition);

search("New York");
