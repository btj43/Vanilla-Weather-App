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

//want to get data from openweather then push into 4 different places
function displayTemp(response) {
  let cityName = document.querySelector("#city");
  let description = document.querySelector("#description");
  let temperature = document.querySelector("#temp");
  let windSpeed = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  description.innerHTML = response.data.weather[0].description;
  temperature.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  humidity.innerHTML = Math.round(response.data.main.humidity);
}

let city = "London";
let apiKey = "0f8bc384a7c31b717a18cfe38a95ae06";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(url).then(displayTemp);
