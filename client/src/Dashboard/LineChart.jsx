
import ApexCharts from 'react-apexcharts';
import React, { useEffect, useState } from 'react';

import { fetchWeatherApi } from 'openmeteo';

// WeatherVisualization component
const WeatherVisualization = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const params = {
      // Your parameters here
    };
    const url = "https://api.open-meteo.com/v1/forecast";

    fetchWeatherApi(url, params)
      .then((responses) => {
        // Process the response and set the state with the weatherData
        const response = responses[0];
        // Process the response and convert it to the weatherData format
        setWeatherData(processedWeatherData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  return (
    <div className="weather-visualization">
      <h1>Weather Visualization</h1>
      <table className="weather-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature (2m)</th>
            <th>Relative Humidity (2m)</th>
            {/* Add more table headers for other data points */}
          </tr>
        </thead>
        <tbody>
          {weatherData.minutely15.time.map((time, index) => (
            <tr key={index}>
              <td>{time.toISOString()}</td>
              <td>{weatherData.minutely15.temperature2m[index]}</td>
              <td>{weatherData.minutely15.relativeHumidity2m[index]}</td>
              {/* Add more table data for other data points */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeatherVisualization;
