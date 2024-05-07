import React, { useState, useEffect } from 'react';
import AlertMessage from './AlertMessage';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    // Fetch weather data from an API or any other source
    fetchWeatherData()
      .then((data) => {
        setWeatherData(data);
        // Check for any alert conditions and set the alert message accordingly
        const { alerts } = data;
        if (alerts && alerts.length > 0) {
          setAlertMessage(alerts[0].description);
        }
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div>
      <AlertMessage message={alertMessage} />
      {/* Render the rest of the weather forecast components */}
      {/* ... */}
    </div>
  );
};

export default WeatherForecast;