import React, { useState } from 'react';
import SearchBar from './SearchBar';
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import { useFetchWeather } from '../hooks/useFetchWeather';
import { CloudSun } from 'lucide-react';
import '../styles/Weather.css';

const WeatherApp: React.FC = () => {
  const [searchedCity, setSearchedCity] = useState('');
  const { data, isLoading, error } = useFetchWeather(searchedCity);

  const handleSearch = (city: string) => {
    setSearchedCity(city);
  };

  return (
    <div className="weather-app">
      <div className="app-header">
        <div className="app-logo">
          <CloudSun size={32} />
          <h1>Weather App</h1>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="app-content">
        {isLoading && <Loading />}
        
        {error && <Error message={error} />}
        
        {!isLoading && !error && data && (
          <WeatherInfo data={data} />
        )}
        
        {!isLoading && !error && !data && (
          <div className="welcome-container">
            <CloudSun size={80} className="welcome-icon" />
            <h2>Welcome to Weather App</h2>
            <p>Enter a city name to get the current weather</p>
          </div>
        )}
      </div>
      
      <footer className="app-footer">
        <p>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
};

export default WeatherApp;