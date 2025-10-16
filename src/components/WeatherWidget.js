import React, { useState, useEffect } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock weather data - in production, integrate with Weather API
    const mockWeather = {
      temperature: 22,
      condition: 'Partly Cloudy',
      humidity: 65,
      wind: 15,
      forecast: [
        { day: 'Today', high: 24, low: 16, condition: 'Partly Cloudy' },
        { day: 'Tomorrow', high: 26, low: 18, condition: 'Sunny' },
        { day: 'Day 3', high: 23, low: 17, condition: 'Rain' }
      ]
    };

    setTimeout(() => {
      setWeather(mockWeather);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="weather-widget loading">Loading weather...</div>;

  return (
    <div className="weather-widget">
      <h4>🌤️ Weather Forecast</h4>
      <div className="current-weather">
        <div className="temp">{weather.temperature}°C</div>
        <div className="condition">{weather.condition}</div>
        <div className="details">
          💧 {weather.humidity}% • 🌬️ {weather.wind} km/h
        </div>
      </div>
      <div className="forecast">
        {weather.forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <span className="day">{day.day}</span>
            <span className="temps">{day.high}° / {day.low}°</span>
            <span className="condition">{getWeatherIcon(day.condition)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const getWeatherIcon = (condition) => {
  const icons = {
    'Sunny': '☀️',
    'Partly Cloudy': '⛅',
    'Cloudy': '☁️',
    'Rain': '🌧️',
    'Storm': '⛈️'
  };
  return icons[condition] || '🌈';
};

export default WeatherWidget;