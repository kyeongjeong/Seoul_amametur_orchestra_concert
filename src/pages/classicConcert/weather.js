const apiKey = '';
const weatherContainer = document.querySelector('.weather-container');
const locationElement = document.getElementById('location');
const iconElement = document.getElementById('weather-icon');
const tempElement = document.getElementById('temperature');
const descElement = document.getElementById('description');

const seoulLat = 37.5665;
const seoulLon = 126.9780;

async function fetchWeather(lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    renderWeather(data);
}

function renderWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp } = data.main;

    document.getElementById('location').textContent = name;
    document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
    document.getElementById('weather-icon').className = `weather-icon wi wi-owm-${data.weather[0].id}`;
    document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
}

function handleError() {
    locationElement.textContent = 'Unable to fetch weather data';
}

fetchWeather(seoulLat, seoulLon);