import React, { useState, useEffect } from 'react';
import { WiDayCloudy, WiDaySunny, WiRain, WiSnow, WiFog, WiStrongWind } from 'react-icons/wi';
import Accordion from 'react-bootstrap/Accordion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip'; 

function WeatherChart({ forecast, showIcons, weatherIcons }) {
  const data = forecast.map((data) => ({
    time: new Date(data.dt * 1000).toLocaleTimeString(),
    temperature: Math.round(data.main.temp),
    weather: data.weather[0].main,
    windSpeed: data.wind.speed,
    humidity: data.main.humidity,
    pressure: data.main.pressure
  }));

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="time"fontSize={16}  />
        <YAxis fontSize={16} />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#f00" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="windSpeed" stroke="#0f0" />
        <Line type="monotone" dataKey="humidity" stroke="#00f" />
        <Line type="monotone" dataKey="pressure" stroke="hsl(0, 0%, 3.9215686274509802%)" />
      </LineChart>
      {showIcons && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {data.map((data, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                  {weatherIcons[data.weather] && weatherIcons[data.weather].icon}
                </div>
                <div style={{ marginRight: '10px' }}>
                  <span>{new Date(data.dt * 1000).toLocaleTimeString()}</span>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>{Math.round(data.temperature)}°C</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            {data.map((data, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <div style={{ marginRight: '10px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Wind Speed: {data.windSpeed} m/s</p>
                </div>
                <div style={{ marginRight: '10px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Humidity: {data.humidity}%</p>
                </div>
                <div>
                  <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Pressure: {data.pressure} hPa</p>
                </div>
              </div>
           ))}
          </div>
        </div>
      )}
    </div>
  );
}

function getWeatherSummary(dayForecast) {
  const maxTemp = Math.max(...dayForecast.map(data => data.main.temp));
  const minTemp = Math.min(...dayForecast.map(data => data.main.temp));
  const avgWindSpeed = dayForecast.reduce((sum, data) => sum + data.wind.speed, 0) / dayForecast.length;

  const precipitationCount = dayForecast.filter(data => data.weather[0].main === 'Rain' || data.weather[0].main === 'Snow').length;
  const precipitationPercentage = (precipitationCount / dayForecast.length) * 100;

  const summary = `Max Temp: ${Math.round(maxTemp)}°C, Min Temp: ${Math.round(minTemp)}°C, Avg Wind Speed: ${avgWindSpeed.toFixed(1)} m/s, Precipitation: ${precipitationPercentage.toFixed(0)}%`;
  return summary;
}

function Realtime() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [summaryTarget, setSummaryTarget] = useState(null);
  const [summaryContent, setSummaryContent] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "d933136c5d5fd441b856c7e1e8952f32";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const apiUrl = [
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`,
            `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&cnt=28`
          ];
          try {
            const responses = await Promise.all(apiUrl.map(url => fetch(url)));
            const data = await Promise.all(responses.map(response => response.json()));

            // Get current weather data
            const currentWeatherData = data[0].weather? data[0].weather[0] : null;
            setCurrentWeather(currentWeatherData);

            // Get forecast data for the next two weeks
            const forecastData = data[1].list? data[1].list : [];
            setForecast(forecastData);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchWeatherData();
  }, []);

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clouds":
        return <WiDayCloudy style={{ width: '50px', height: '50px' }} />;
      case "Clear":
        return <WiDaySunny style={{ width: '50px', height: '50px' }} />;
      case "Rain":
        return <WiRain style={{ width:'50px', height: '50px' }} />;
      case "Snow":
        return <WiSnow style={{ width: '50px', height: '50px' }} />;
      case "Mist":
        return <WiFog style={{ width: '50px', height: '50px' }} />;
      case "Wind":
        return <WiStrongWind style={{ width: '50px', height: '50px' }} />;
      default:
        return null;
    }
  };

  const groupForecastByDayOfWeek = (forecast) => {
    const groupedForecast = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: []
    };

    forecast.forEach((data) => {
      const date = new Date(data.dt * 1000);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      groupedForecast[dayOfWeek].push(data);
      });
      return Object.entries(groupedForecast);
    };
    const handleSummaryHover = (event, dayForecast) => {
    setShowSummary(true);
    setSummaryTarget(event.target);
    setSummaryContent(getWeatherSummary(dayForecast));
    };
    const handleSummaryLeave = () => {
    setShowSummary(false);
    setSummaryTarget(null);
    setSummaryContent('');
    };
    return (
    <div style={{ backgroundColor: 'lightblue', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    {currentWeather && (
    <div className="current-weather" style={{ marginBottom: '20px' }}>
    <h2>{currentWeather.name}, {currentWeather.sys && currentWeather.sys.country}</h2>
    <div style={{ display: 'flex', alignItems: 'center' }}>
    {getWeatherIcon(currentWeather.main)}
    <h1 style={{ marginLeft: '20px' }}>{Math.round(currentWeather.main.temp)}°C</h1>
    </div>
    <p>{currentWeather.weather && currentWeather.weather[0].description}</p>
    </div>
    )}
    <div className="forecast-accordion" style={{ width: '75vw' }}>
    <Accordion>
      {groupForecastByDayOfWeek(forecast).map(([dayOfWeek, dayForecast], index) => (
        <Accordion.Item eventKey={index} key={index}>
          <Accordion.Header
            onMouseEnter={(e) => handleSummaryHover(e, dayForecast)}
            onMouseLeave={handleSummaryLeave}
            style={{ fontSize: '29px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {dayForecast[0] && dayForecast[0].weather && dayForecast[0].weather[0] && getWeatherIcon(dayForecast[0].weather[0].main)}
                <span style={{ marginLeft: '10px' }}>{dayOfWeek}</span>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {dayForecast.length === 0 ? (
              <p>No forecast data available for this day.</p>
            ) : (
              <div>
                <WeatherChart forecast={dayForecast} showIcons={false} weatherIcons={{
                  Clouds: { icon: <WiDayCloudy style={{ width: '100px', height: '100px' }} /> },
                  Clear: { icon: <WiDaySunny style={{ width: '100px', height: '100px' }} /> },
                  Rain: { icon: <WiRain style={{ width:'100px', height: '100px' }} /> },
                  Snow: { icon: <WiSnow style={{ width: '100px', height: '100px' }} /> },
                  Mist: { icon: <WiFog style={{ width: '100px', height: '100px' }} /> },
                  Wind: { icon: <WiStrongWind style={{ width: '100px', height: '100px' }} /> }
                }} />
              </div>
            )}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </div>

  <Overlay
    show={showSummary}
    target={summaryTarget}
    placement="top"
    container={document.body}
    containerPadding={20}
  >
    <Tooltip id="weather-summary-tooltip">{summaryContent}</Tooltip>
  </Overlay>
</div>
);
}
export default Realtime;