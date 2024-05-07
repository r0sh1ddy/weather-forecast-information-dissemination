import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function WeatherForecastChart({ weatherData }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = weatherData.map((item) => item.date);
    const temperatures = weatherData.map((item) => item.temperature);

    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatures,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [weatherData]);

  return <canvas ref={chartRef} />;
}

export default WeatherForecastChart;