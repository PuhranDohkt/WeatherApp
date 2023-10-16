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
time.innerHTML = `Last Update: ${day} ${hours}:${minutes}`;

//background
function setBackground(season) {
  let tone = document.getElementById("app-body");
  let month = now.getMonth();
  switch (true) {
    case month >= 6 && month <= 8:
      document.body.style.backgroundColor = "red";
      break;
    case month >= 9 && month <= 11:
      tone.style.backgroundColor = "#ffffff";
      document.body.style.backgroundImage =
        "url('    https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/871/original/fall.jpg?1697462455')";
      break;
    case month == 12 || month == 1 || month == 2:
      tone.style.backgroundColor = "#ffffff";
      document.body.style.backgroundImage =
        "url('      https://s3.amazonaws.com/shecodesio-production/uploads/files/000/100/875/original/winter.jpg?1697464175')";
      document.body.style.backgroundColor = "red";
      break;
    case month >= 3 && month <= 5:
      document.body.style.backgroundColor = "red";
  }
}
//Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//showWeatherCondition
function showWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
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
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
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

//conversions

/*function showFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}
function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

//conversions-Feature
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

let celsiusTemperature = null;
*/
//currentButton-Feature
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

//default-temp
searchCity("Tehran");
setBackground("summer");
