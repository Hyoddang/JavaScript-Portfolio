const API_KEY = '7bcd362d97ee021a35032554daaeff3d'

const locations = {
  seoul: {lat: 37.559722, lon: 126.975278},
  NY: {lat: 40.7128, lon: -74.0060},
  tokyo: {lat: 35.682839, lon: 139.759455},
  london: {lat: 51.5074, lon: -0.1278},
  moskva: {lat: 55.7558, lon: 37.6176},
  beijing: {lat: 39.9042, lon: 116.4074},
  berlin: {lat: 52.5206, lon: 13.4094},
  sydney: {lat: -33.8688, lon: 151.2093},
  taipei: {lat: 25.0330, lon: 121.5654},
  paris: {lat: 48.8566, lon: 2.3522}
}

function localWeather(locationKey, element) {
  const location = locations[locationKey];
  if (!location) {
    console.error("Invalid location key:", locationKey);
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const temp = data.main.temp;
      const weatherIconCode = data.weather[0].icon;
      const weatherDescription = data.weather[0].description;

      const iconUrl = `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;

      document.querySelector(`.${element} .weather-icon`).src = iconUrl;
      document.querySelector(`.${element} .weather-icon`).alt = weatherDescription;
      document.querySelector(`.${element} .temperature`).textContent = `${temp.toFixed(1)} ºC`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function handleSelectChange(event) {
  const selectedLocation = event.target.value;
  const element = event.target.closest(".location-one")
    ? "location-one"
    : event.target.closest(".location-two")
    ? "location-two"
    : event.target.closest(".location-three")
    ? "location-three"
    : "";

  if (element) {
    localWeather(selectedLocation, element);
  }
}

document.querySelectorAll(".select-locate").forEach((selectElement) => {
  selectElement.addEventListener("change", handleSelectChange);
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".select-locate").forEach((selectElement) => {
    handleSelectChange({ target: selectElement });
  });
});