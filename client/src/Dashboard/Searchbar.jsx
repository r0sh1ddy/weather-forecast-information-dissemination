import React, { useState, useEffect } from 'react';

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch weather data from an API or any other source
    const fetchWeatherData = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setWeatherData(data);
        setFilteredData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = weatherData.filter((item) =>
      item.location.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      <h1>Weather Forecast</h1>
      <input
        type="text"
        placeholder="Search by location..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={() => console.log(searchTerm)}>Search</button>
      <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            <h3>{item.location}</h3>
            <p>Temperature: {item.temperature}°C</p>
            <p>Condition: {item.condition}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default Searchbar;