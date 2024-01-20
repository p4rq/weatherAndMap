let map;
let marker;


document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    fetch(`/api/weather/${city}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
            mapCity(data.coord.lat, data.coord.lon, city);
            // Extract country code from the weather data and fetch country information
            const country = data.sys.country;
            fetchCountryInfo(country);
            fetchTimeZoneInfo(data.coord.lat, data.coord.lon);

        })
        .catch(error => console.error('Error:', error));
}
const ICON_BASE_URL = 'https://openweathermap.org/img/wn/';

function displayWeatherData(data) {
    const weatherInfoDiv = document.getElementById('weather-info');
    if (!weatherInfoDiv) {
        console.error('Weather info div not found');
        return;
    }

    const temp = data.main.temp;
    const feelsLike = data.main.feels_like;
    const tempMin = data.main.temp_min;
    const tempMax = data.main.temp_max;
    const pressure = data.main.pressure;
    const humidity = data.main.humidity;
    const weatherDescription = data.weather[0].description;
    const windSpeed = data.wind.speed;
    const country = data.sys.country;
    const cityName = data.name;
    const weatherIcon = data.weather[0].icon; // Icon code from OpenWeatherMap


    // Get the corresponding icon for the weather condition
    const weatherIconSrc = `${ICON_BASE_URL}${weatherIcon}@2x.png`;

    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${cityName}, ${country}</h2>
        <div class="column">
            <img src="${weatherIconSrc}" alt="Weather Icon" class="weather-icon">
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
            <p><strong>Minimum Temperature:</strong> ${tempMin}°C</p>
            <p><strong>Maximum Temperature:</strong> ${tempMax}°C</p>
        </div>
        <div class="column">
            <p><strong>Pressure:</strong> ${pressure} hPa</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Weather Description:</strong> ${weatherDescription}</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        </div>
    `;
}

function mapCity(latitude, longitude, cityName) {
    if (!map) {
        map = L.map('map').setView([latitude, longitude], 10);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    if (marker) {
        marker.remove();
    }

    marker = L.marker([latitude, longitude]).addTo(map)
        .bindPopup(cityName)
        .openPopup();

    map.panTo([latitude, longitude]);
}

// Call the geolocation function when the page loads
document.addEventListener('DOMContentLoaded', function () {
    getGeolocation();
});

function getGeolocation() {
    // Check if geolocation is supported by the browser
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Geolocation: Latitude ${latitude}, Longitude ${longitude}`);
                // Add mapping for the user's current location
                mapCity(latitude, longitude, 'Your Location');
            },
            error => {
                console.error('Error getting geolocation:', error);
            }
        );
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}
function fetchCountryInfo(countryCode) {
    // REST Countries API endpoint
    const restCountriesApiEndpoint = `https://restcountries.com/v3/alpha/${countryCode}`;

    // Make a GET request to fetch country information
    $.get(restCountriesApiEndpoint, function (data) {
        displayCountryInfo(data);
    })
    .fail(function(error) {
        console.error('Error fetching country information:', error);
        $('#country-info').html('<p>Error fetching country information</p>');
    });
}

function displayCountryInfo(countryData) {
    const countryInfoDiv = $('#country-info');
    if (!countryInfoDiv) {
        console.error('Country info div not found');
        return;
    }

    // Extract relevant country information
    const name = countryData[0].name.common;
    const population = countryData[0].population;
    const currencies = countryData[0].currencies;
    const currencyInfo = Object.values(currencies).map(currency => {
        return `${currency.name} (${currency.code} - ${currency.symbol})`;
    }).join(', ');   
     const languages = Object.values(countryData[0].languages).join(', ');

    countryInfoDiv.html(`
        <h2>Country Information</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Currencies:</strong> ${currencyInfo}</p>
        <p><strong>Languages:</strong> ${languages}</p>
    `);
}
function fetchTimeZoneInfo(latitude, longitude) {
    // TimezoneDb API endpoint (replace YOUR_API_KEY with your actual API key)
    const timezoneDbApiEndpoint = `http://api.timezonedb.com/v2.1/get-time-zone?key=VGUAKFVL6SWI&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    // Make a GET request to fetch time zone information
    $.get(timezoneDbApiEndpoint, function (data) {
        displayTimeZoneInfo(data);
    })
    .fail(function(error) {
        console.error('Error fetching time zone information:', error);
        $('#timezone-info').html('<p>Error fetching time zone information</p>');
    });
}

function displayTimeZoneInfo(timezoneData) {
    const timezoneInfoDiv = $('#timezone-info');
    if (!timezoneInfoDiv) {
        console.error('Timezone info div not found');
        return;
    }

    // Extract relevant time zone information
    const timeZoneName = timezoneData.zoneName;
    const timeZoneOffsetSeconds = timezoneData.gmtOffset;

    // Convert seconds to hours
    const timeZoneOffsetHours = timeZoneOffsetSeconds / 3600;
    const offsetSign = timeZoneOffsetHours >= 0 ? '+' : '-';

    timezoneInfoDiv.html(`
        <h2>Time Zone Information</h2>
        <p><strong>Time Zone:</strong> ${timeZoneName}</p>
        <p><strong>GMT Offset:</strong> ${offsetSign}${Math.abs(timeZoneOffsetHours)} hours</p>
    `);
}
