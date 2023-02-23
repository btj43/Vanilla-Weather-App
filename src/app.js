function todayDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${day} ${hour}:${minute}`;
}

let currentTime = new Date();
let liveDate = document.querySelector("#date");
liveDate.innerHTML = todayDate(currentTime);

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thurs", "Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
    <div class="forecast-day">${day}</div>
    <img
      src="https://openweathermap.org/img/wn/10d@2x.png"
      alt="clear"
      id="forecast-img"
      width="100%"
    />
    <div class="forecast-temp">
      <span id="higher-temp">X°</span>
      <span id="lower-temp">X°</span>
    </div>
  </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function displayWeather(response) {
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#iconImg");
  let temperature = document.querySelector("#temp");
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let iconCode = response.data.weather[0].icon;

  celciusTemp = response.data.main.temp;

  cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  temperature.innerHTML = Math.round(celciusTemp);
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  humidity.innerHTML = Math.round(response.data.main.humidity);
}

function search(city) {
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function locationSubmit(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let locationForm = document.querySelector("#location-form");
locationForm.addEventListener("submit", locationSubmit);

search("Bangkok");

function showFaren(event) {
  event.preventDefault();
  let farenTemp = (celciusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(farenTemp);
}

function showCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celciusTemp);
}

let faren = document.querySelector("#faren");
faren.addEventListener("click", showFaren);

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelcius);

displayForecast();
