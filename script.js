document.addEventListener('DOMContentLoaded', () => {
    const countryInfoContainer = document.getElementById('countryInfo');

    // Replace 'YOUR_REST_COUNTRIES_API_KEY' with your actual API key
    const restCountriesAPI = 'https://restcountries.com/v2/all';

    // Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your actual API key
    const openWeatherMapAPI = 'https://api.openweathermap.org/data/2.5/weather';

    // Fetch countries data from REST Countries API
    fetch(restCountriesAPI)
        .then(response => response.json())
        .then(countries => {
            countries.forEach(country => {
                // Create Bootstrap card
                const card = document.createElement('div');
                card.classList.add('col-md-4', 'mb-4');

                // Create card body
                const cardBody = document.createElement('div');
                cardBody.classList.add('card', 'shadow');

                // Populate card body with country information
                cardBody.innerHTML = `
                    <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
                    <div class="card-body">
                        <h5 class="card-title">${country.name}</h5>
                        <p class="card-text">Capital: ${country.capital}</p>
                        <p class="card-text">Region: ${country.region}</p>
                        <p class="card-text">Country Code: ${country.alpha2Code}</p>
                        <p class="card-text">LatLng: ${country.latlng.join(', ')}</p>
                    </div>
                `;

                // Append card body to card
                card.appendChild(cardBody);

                // Append card to container
                countryInfoContainer.appendChild(card);

                // Fetch weather data from OpenWeatherMap API
                fetch(`${openWeatherMapAPI}?q=${country.capital}&appid=YOUR_OPENWEATHERMAP_API_KEY`)
                    .then(response => response.json())
                    .then(weatherData => {
                        // Append weather information to card body
                        const weatherInfo = document.createElement('div');
                        weatherInfo.innerHTML = `
                            <div class="card-footer">
                                <p class="card-text">Weather: ${weatherData.weather[0].description}</p>
                                <p class="card-text">Temperature: ${weatherData.main.temp} &#8451;</p>
                            </div>
                        `;
                        cardBody.appendChild(weatherInfo);
                    })
                    .catch(error => console.error('Error fetching weather data:', error));
            });
        })
        .catch(error => console.error('Error fetching countries data:', error));
});