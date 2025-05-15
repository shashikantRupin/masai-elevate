import React from 'react';
import { CloudRain, Wind, Droplets, Thermometer, Sunset, Sunrise } from 'lucide-react';
import '../styles/Weather.css';

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feels_like: number;
  condition: string;
  description: string;
  icon: string;
  humidity: number;
  wind: {
    speed: number;
    deg: number;
  };
  sunrise: number;
  sunset: number;
  time: number;
}

interface WeatherInfoProps {
  data: WeatherData;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ data }) => {
  // Format time for sunrise and sunset
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Choose background class based on weather condition
  const getWeatherClass = (condition: string): string => {
    const lowerCondition = condition.toLowerCase();
    if (lowerCondition.includes('clear')) return 'weather-clear';
    if (lowerCondition.includes('cloud')) return 'weather-clouds';
    if (lowerCondition.includes('rain') || lowerCondition.includes('drizzle')) return 'weather-rain';
    if (lowerCondition.includes('snow')) return 'weather-snow';
    if (lowerCondition.includes('thunderstorm')) return 'weather-thunderstorm';
    if (lowerCondition.includes('mist') || lowerCondition.includes('fog')) return 'weather-mist';
    return 'weather-default';
  };

  return (
    <div className={`weather-info ${getWeatherClass(data.condition)}`}>
      <div className="weather-header">
        <div className="weather-location">
          <h2>{data.city}, {data.country}</h2>
          <p className="weather-time">
            {new Date(data.time * 1000).toLocaleDateString([], {
              weekday: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="weather-icon">
          <img 
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} 
            alt={data.description} 
          />
        </div>
      </div>
      
      <div className="weather-main">
        <div className="weather-temp">
          <h1>{data.temperature}°C</h1>
          <p className="feels-like">Feels like: {data.feels_like}°C</p>
        </div>
        <div className="weather-condition">
          <h3>{data.condition}</h3>
          <p>{data.description}</p>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="weather-detail-item">
          <Thermometer size={24} />
          <div className="detail-text">
            <span className="detail-label">Temperature</span>
            <span className="detail-value">{data.temperature}°C</span>
          </div>
        </div>
        
        <div className="weather-detail-item">
          <Wind size={24} />
          <div className="detail-text">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{data.wind.speed} m/s</span>
          </div>
        </div>
        
        <div className="weather-detail-item">
          <Droplets size={24} />
          <div className="detail-text">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{data.humidity}%</span>
          </div>
        </div>
      </div>
      
      <div className="sun-times">
        <div className="sun-time-item">
          <Sunrise size={20} />
          <span>Sunrise: {formatTime(data.sunrise)}</span>
        </div>
        <div className="sun-time-item">
          <Sunset size={20} />
          <span>Sunset: {formatTime(data.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;