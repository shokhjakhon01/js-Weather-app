const api = {
  key: "478e418add58578cbafc0d89ec59827d",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
  }
}

function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerHTML = `${weather.name} ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherEl = document.querySelector('.weather')

  weatherEl.innerHTML = weather.weather[0].main

  let highlow = document.querySelector('.high-low')
  highlow.innerHTML = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`

}

function dateBuilder(s) {
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

  let days = [
    "Sunday",
    "Monday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day1 = days[s.getDay()];
  let date = s.getDate();
  let month = months[s.getMonth()];
  let year = s.getFullYear();

  return ` ${date} ${month} ${year}`;
}
