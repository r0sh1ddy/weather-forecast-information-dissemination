import React, { useState } from 'react';

function CityWeather() {
  const [cityName, setCityName] = useState('Nairobi');
  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
  const [weatherData, setWeatherData] = useState(null);

  const getCoordinates = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json`);
      const data = await response.json();

      if (data && data.length > 0) {
        const latitude = data[0].lat;
        const longitude = data[0].lon;
        setCoordinates({ latitude, longitude });

        fetchWeatherData(latitude, longitude);
      } else {
        console.log(`Coordinates not found for ${cityName}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = "3f4d24d471f6fd1d474d955225b70156";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    console.log(url)
  
    try {
      const response = await fetch(url);
      const data = await response.json();
    const { coord, weather, main, wind, clouds, sys, name } = data;
    const weatherDescription = weather[0].description;
    const humidity = main.humidity;
    const temperatureMax = main.temp_max;
    const temperatureMin = main.temp_min;
    const pressure = main.pressure;
    const temperature = main.temp;
    const windSpeed = wind.speed;
    const windDegree = wind.deg;
    const windGust = wind.gust;
    const country = sys.country;
    const cityName = name;

    sendMessage(weatherDescription, humidity, temperatureMax, temperatureMin, pressure, temperature, windSpeed, windDegree, windGust, country, cityName);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const sendMessage = async (weatherDescription, humidity, temperatureMax, temperatureMin, pressure, temperature, windSpeed, windDegree, windGust, country, cityName) => {

    const messageBody = `
    Hello, here is the weather today \n
    
    
    Weather: ${weatherDescription}
    Humidity: ${humidity}
    Temperature Max: ${temperatureMax}
    Temperature Min: ${temperatureMin}
    Pressure: ${pressure}
    Temperature: ${temperature}
    Wind Speed: ${windSpeed}
    Wind Degree: ${windDegree}
    Wind Gust: ${windGust}
    Country: ${country}
    City Name: ${cityName}`;
    console.log(messageBody)
    const phoneNumber = "254704847676"


    const apiUrl = 'https://api.infobip.com/sms/2/text/advanced';
    // const authKey = '080b5ae987d0df26dd5d4f063d60c964-63ed81ac-466d-4048-aa2a-36dfa5918f33'; // Replace with your Infobip API authentication key
    
    const requestBody = {
      "messages": [
        {
          "from": "InfoSMS",
          "destinations": [
            {
              "to": phoneNumber
            }
          ],
          "text": messageBody
        }
      ]
    };
    
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `App ${authKey}`
      },
      body: JSON.stringify(requestBody)
    })
      .then(response => response.json())
      .then(data => console.log('SMS sent successfully', data))
      .catch(error => console.error('Error sending SMS', error));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city name"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={getCoordinates}>Get Weather</button>
      {weatherData && (
        <div>
          <h2>Hourly Forecast for {cityName}</h2>

        </div>
      )}
    </div>
  );
}

export default CityWeather;
