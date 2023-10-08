//time-date-Feature
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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
let time = document.querySelector("#time");
time.innerHTML = `${day} ${hours}:${minutes}`;

//temps
function showCelsius(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 19;
}
function showFahrenheit(event) {
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 66;
}
//temps-Feature
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

//showWeatherCondition
function showWeatherCondition(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

//handleSubmit
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-form").value;
  searchCity(city);
}
//handleSubmit-Feature
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//default-temp
searchCity("Tehran");

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//currentButton-Feature
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);
