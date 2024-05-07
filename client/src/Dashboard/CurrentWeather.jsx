import React, { useState, useEffect } from 'react';
import ApexCharts from 'react-apexcharts';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import dayjs from 'dayjs';
import { WiDayCloudy, WiDaySunny, WiRain, WiSnow, WiFog, WiStrongWind } from 'react-icons';
import 'animate.css';
import { animateScroll as scroll } from 'react-scroll';


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentDayIndex = dayjs().day();
const currentDay = daysOfWeek[currentDayIndex];

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00']; 

function CurrentWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const apiKey = "d933136c5d5fd441b856c7e1e8952f32";

      async function checkWeather() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const apiUrl = [`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`,
              //`https://api.openweathermap.org/data/2.5/forecast/daily?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`,
            `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}`
            ]

            const responses = await Promise.all(apiUrl.map(url => fetch(url)));
            const data = await Promise.all(responses.map(response => response.json()));

            setWeatherData(data[0]);
            setCurrentWeather(data[1]);
          });
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      }

      // Call the checkWeather function to fetch and update the weather data
      checkWeather();
    };

    fetchWeatherData();
  }, []); // Empty dependency array to ensure it only runs once on mount

  return (
    <>
      <Sidebar />
      <Topbar />

      <div className="bg-secondary">
        <div className="page-wrapper">
          <div className="page-content">
            <TopMenu setWeatherData={setWeatherData} />
            <div className="row" key={weatherData}>
              <CurrentWeatherCard currentWeather={currentWeather} />
              <WeeklyForecastCard weatherData={weatherData} />
              <DailyWeatherCard weatherData={weatherData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const TopMenu = ({ setWeatherData }) => {
  const api = {
    key: "d933136c5d5fd441b856c7e1e8952f32",
    base: "https://api.openweathermap.org/data/2.5/",
  };
  const [search, setSearch] = useState('');

  const searchPressed = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const response = await axios.get(`${api.base}weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${api.key}`);
          setWeatherData(response.data); // Update the weatherData state in the parent component
          console.log(response.data);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  

  return (
    <div className="top-menu ms-auto" style={{ opacity: 1 }}>
      <ul className="navbar-nav align-items-left">
        <li className="nav-item mobile-search-icon">
          <div className="d-flex align-items-right">
            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={searchPressed}>Search</button>
          </div>
        </li>
      </ul>
    </div>
  );
};


const CurrentWeatherCard = ({ currentWeather }) => {
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Thunderstorm':
        return '⚡️';
      case 'Drizzle':
        return '🌧️';
      case 'Rain':
        return '🌨️';
      case 'Snow':
        return '☃️';
      case 'Atmosphere':
        return '🌫️';
      case 'Clear':
        return '☀️';
      case 'Clouds':
        return '☁️';
      default:
        return '🌎';
    }
  };

  const calculateFeelsLike = (temperature, windSpeed) => {
    // Placeholder for demonstration
    return temperature; // Placeholder for demonstration
  };

  const getWeatherAlertMessage = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Thunderstorm':
        return 'Thunderstorms are expected. Please stay indoors if possible.';
      case 'Drizzle':
        return 'Drizzling weather. Carry an umbrella when going out.';
      case 'Rain':
        return 'Rainy weather. Remember to take an umbrella.';
      case 'Snow':
        return 'Snowfall expected. Drive carefully.';
      case 'Atmosphere':
        return 'Atmospheric conditions. Be cautious.';
      case 'Clear':
        return 'Clear sky. Enjoy the sunny weather!';
      case 'Clouds':
        return 'Cloudy sky. It may rain, so carry an umbrella.';
      default:
        return 'Weather condition not available.';
    }
  };

  const [color, setColor] = useState('#ffffff'); // Initial color

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random color
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      setColor(randomColor);
    }, 5000); // Change color every 5 seconds

    return () => clearInterval(interval); // Clean up the interval
  }, []);

  return (
    <div className="col-12 col-xl-4 d-flex">
      <div className="card radius-50 w-100 overflow-hidden">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <div>
              <h3 className="mb-0">Current Weather</h3>
            </div>
            <div className="font-22 ms-auto">
              <i></i>
            </div>
          </div>
        </div>

        <div className="store-metrics container py-4 h-100 bg-primary text-white">
          {currentWeather && currentWeather.weather && currentWeather.weather[0] && (
            <>
              <div className="alert alert-secondary animate__animated animate__bounceIn mb-4" role="alert" style={{ color: color }}>
                {getWeatherAlertMessage(currentWeather.weather[0].main)}
              </div>
              <div className="d-flex align-items-center mb-4">
                <span
                  className="weather-icon animate__animated animate__flash animate__infinite animate__slow"
                  style={{ fontSize: '100px', color: color }}
                >
                  {getWeatherIcon(currentWeather.weather[0].main)}
                </span>
                <span className="text-white fs-1 ms-30">{currentWeather.main.temp}°C</span>
              </div>
            </>
          )}
          <br />
          <br />
          <br />
          <br />
          <div className="mt-2">
            <i className="bx bx-time"></i> Last updated: 5 minutes ago
          </div>
          <br />
          <div className="d-flex mt-2">
            <i className="bx bx-bar-chart"></i> Historical Data
          </div>
          <br />
          <div className="d-flex mt-2">
            <i className="bx bx-info-circle"></i> More Info
          </div>
          <br />

          <div className="col-md-6">
            <div className="bg-primary p-4  rounded mb-4">
              <h1>{currentWeather && currentWeather.weather && currentWeather.weather[0] && currentWeather.weather[0].main}</h1>
              <h1 className="text-white fs-1 fw-bold">{currentWeather && currentWeather.main && Math.round(currentWeather.main.temp)}°C</h1>
              <p className="text-white fw-bold">Feels like: {currentWeather && currentWeather.main && Math.round(calculateFeelsLike(currentWeather.main.temp, currentWeather.wind.speed))}°C</p>
            </div>
          </div>

          <div className="row mt-4">
            <div className="col-md-12">
              <div className="bg-primary p-4 rounded">
                <div className="row">
                  <div className="col-md-4">
                    <p>Wind Speed: {currentWeather && currentWeather.wind && currentWeather.wind.speed} m/s</p>
                  </div>
                  <div className="col-md-4">
                    <p>Humidity: {currentWeather && currentWeather.main && currentWeather.main.humidity}%</p>
                  </div>
                  <div className="col-md-4">
                    <p>Pressure: {currentWeather && currentWeather.main && currentWeather.main.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
 
const WeeklyForecastCard = ({ weatherData }) => {
  const groupForecastByDay = (forecast) => {
    const forecastByDay = {};
    if (forecast) {
      forecast.forEach((item) => {
        const date = new Date(item.dt * 1000);
        const day = daysOfWeek[date.getDay()];
        if (!forecastByDay[day]) {
          forecastByDay[day] = [];
        }
        forecastByDay[day].push(item);
      });
    }
    return forecastByDay;
  };

  const forecastByDay = weatherData && weatherData.list ? groupForecastByDay(weatherData.list) : null;

  return (
    <div className="col-12 col-xl-4 d-flex">
      <div className="card radius-10 w-100">
      <div className="card-body p-0"> 
          <div className="d-flex align-items-center">
            <div>
              <h3 className="mb-0">Weekly Forecast Updates</h3>
            </div>
            <div className="font-22 ms-auto">
              <i></i>
            </div>
          </div>
        </div>
        <Accordion>
          {forecastByDay &&
            Object.entries(forecastByDay).map(([day, forecast], index) => (
              <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div>{day}</div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${forecast[0].weather[0].icon}@2x.png`}
                        className="rounded-circle"
                        width="100"
                        height="100"
                        alt="Weather Icon"
                      />
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {forecast.map((item, index) => (
                    <div
                      key={index}
                      className="customers-list-item d-flex align-items-center border-bottom p-2 cursor-pointer"
                      onMouseEnter={(e) => e.currentTarget.classList.add('show-details')}
                      onMouseLeave={(e) => e.currentTarget.classList.remove('show-details')}
                    >
                      <div className="">
                        <img
                          src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          className="rounded-circle"
                          width="100"
                          height="100"
                          alt="Weather Icon"
                        />
                      </div>
                      <div className="ms-2">
                        <h6 className="mb-1 font-14">{item.weather[0].description}</h6>
                      </div>
                      <div className="list-inline d-flex customers-contacts ms-auto">
                        <p>{new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</p>
                      </div>
                      <div className="weather-details d-none">
                        <p>Temperature: {Math.round(item.main.temp)}°C</p>
                        <p>Humidity: {item.main.humidity}%</p>
                        <p>Wind Speed: {item.wind.speed} m/s</p>
                        <p>Pressure: {item.main.pressure} hPa</p>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </div>
  );
};

 
const timeRanges = {
  morning: { start: 5, end: 9 },
  midMorning: { start: 9, end: 12 },
  noon: { start: 12, end: 13 },
  afternoon: { start: 13, end: 15 },
  midAfternoon: { start: 15, end: 17 },
  evening: { start: 17, end: 21 },
  night: { start: 21, end: 5 },
};

const groupForecastByTimeRange = (forecast, day) => {
  const forecastByTimeRange = {};

  forecast.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();

    if (date.getDay() === day) {
      Object.entries(timeRanges).forEach(([timeRange, { start, end }]) => {
        const isWithinRange = hour >= start && (hour < end || (timeRange === 'night' && end === 5));
        if (isWithinRange) {
          if (!forecastByTimeRange[timeRange]) {
            forecastByTimeRange[timeRange] = [];
          }
          forecastByTimeRange[timeRange].push(item);
        }
      });
    }
  });

  return forecastByTimeRange;
};


const DailyWeatherCard = ({ weatherData }) => {
  // Define colors array
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00']; // Add more colors as needed

  const forecastData = weatherData && weatherData.list ? weatherData.list.filter((item) => new Date(item.dt * 1000).getDay() === currentDayIndex) : null;

  const generateWeatherInsight = (forecast) => {
    const currentTime = dayjs().format('HH:mm');
    const currentForecast = forecast && forecast.length > 0 ? forecast.find((item) => dayjs.unix(item.dt).format('HH:mm') >= currentTime) : null;

    if (!currentForecast) {
      return 'No forecast available for the current time.';
    }

    const temp = currentForecast.main.temp;
    const windSpeed = currentForecast.wind.speed;
    const humidity = currentForecast.main.humidity;

    let insight = '';

    if (temp > 25 && humidity < 50) {
      insight = 'It is a hot day, make sure to stay hydrated!';
    } else if (temp < 20) {
      insight = 'It is a chilly, dress warmly!';
    } else if (windSpeed > 2 && humidity > 70) {
      insight = 'Windy and humid conditions, be cautious when driving and it might feel uncomfortable outside!';
    } else if (windSpeed > 7) {
      insight = 'Windy conditions, be cautious when driving!';
    } else if (humidity > 75) {
      insight = 'High humidity levels, it might feel uncomfortable outside!';
    } else {
      insight = 'Mild weather conditions, enjoy the day!';
    }

    return insight;
  };

  const [showInsight, setShowInsight] = useState(false);
  const [insight, setInsight] = useState('');
  const [insightAnimation, setInsightAnimation] = useState('animate__fadeInRight');
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    if (forecastData && forecastData.length > 0) {
      const generatedInsight = generateWeatherInsight(forecastData);
      setInsight(generatedInsight);
      setShowInsight(true);
      setInsightAnimation('animate__fadeInRight');
      setColorIndex(0);
    }
  
    const intervalId = setInterval(() => {
      setColorIndex((prevColorIndex) => (prevColorIndex + 1) % colors.length);
    }, 10000); // Change color every 10 seconds
  
    return () => clearInterval(intervalId);
  }, [forecastData, colors]); // Include colors in the dependency array

  const handleInsightClose = () => {
    setInsightAnimation('animate__fadeOutRight');
    setTimeout(() => {
      setShowInsight(false);
    }, 500);
  };

  return (
    <div className="col-12 col-xl-4 d-flex">
      <div className="card radius-10 w-100">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="mb-1">Today's Weather ({currentDay})</h5>
            <div className="ms-auto"></div>
          </div>
          {showInsight && (
          <div className={`insight-popup animate__animated ${insightAnimation}`} style={{ fontSize: '1.2rem', color: colors[colorIndex] }}>
              <div className="d-flex justify-content-between align-items-center">
                <p>{insight}</p>
                <button onClick={handleInsightClose} className="btn btn-sm btn-circle">
                  X
                </button>
              </div>
            </div>
          )}
        </div>
        <Accordion className="w-100">
          {forecastData &&
            forecastData.map((item, index) => (
              <Accordion.Item eventKey={index} key={index} className="w-100">
                <Accordion.Header>
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div>{new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}</div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        className="rounded-circle"
                        width="100"
                        height="100"
                        alt="Weather Icon"
                      />
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="product-list w-100">
                    <div className="mb-4 w-100">
                      <div className="d-flex align-items-center mb-1 animate__animated animate__fadeInLeft">
                        <div className="me-4">
                          <img
                            src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt="Weather Icon"
                          />
                        </div>
                        <div className="ms-auto animate__animated animate__fadeInLeft animate__delay-60s">
                          {Math.round(item.main.temp)}°C
                        </div>
                      </div>
                      <div className="d-flex flex-column mt-2 animate__animated animate__fadeInUp animate__delay-60s">
                        <div className="mb-1">Wind Speed: {item.wind.speed} m/s</div>
                        <div className="mb-1">Humidity: {item.main.humidity}%</div>
                        <div>Pressure: {item.main.pressure} hPa</div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            ))}
        </Accordion>
      </div>
    </div>
  );
};


export default CurrentWeather;


// username +> addmin
//password   +> admin