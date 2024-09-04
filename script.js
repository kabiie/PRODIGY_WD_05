const apiKey = '1fccff597b364ac89c252911243108';

document.getElementById('get-weather-btn').addEventListener('click', function() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetchWeatherData(location);
    } else {
        displayError('Please enter a city name.');
    }
});

document.getElementById('get-location-weather-btn').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherData(`${latitude},${longitude}`);
        }, error => {
            displayError('Unable to retrieve your location.');
            console.error('Geolocation error:', error);
        });
    } else {
        displayError('Geolocation is not supported by your browser.');
    }
});

function fetchWeatherData(location) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError('Unable to fetch weather data. Please try again.');
            console.error('Error:', error);
        });
}

function displayWeather(data) {
    document.getElementById('city-name').textContent = data.location.name;
    document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('weather-description').textContent = `Condition: ${data.current.condition.text}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
    document.getElementById('weather-icon').src = `https://www.flaticon.com/free-icon/cloudy_1163661`;
    document.getElementById('weather-icon').alt = data.current.condition.text;
    document.getElementById('error-message').textContent = '';
}

function displayError(message) {
    document.getElementById('error-message').textContent = message;
    document.getElementById('city-name').textContent = '';
    document.getElementById('temperature').textContent = '';
    document.getElementById('weather-description').textContent = '';
    document.getElementById('humidity').textContent = '';
    document.getElementById('wind-speed').textContent = '';
    document.getElementById('weather-icon').src = '';
    document.getElementById('weather-icon').alt = '';
}
document.getElementById('toggle-dark-mode').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
});
