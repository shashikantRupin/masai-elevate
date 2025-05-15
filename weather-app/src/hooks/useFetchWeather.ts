import { useState, useEffect } from 'react';


// Types for the weather data
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

interface FetchWeatherResult {
  data: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetchWeather = (city: string): FetchWeatherResult => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  console.log("apikey--", apiKey);
  useEffect(() => {
    // Don't fetch if no city is provided
    if (!city) {
      return;
    }

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? 'City not found. Please check the spelling and try again.'
              : 'Failed to fetch weather data. Please try again later.'
          );
        }

        const rawData = await response.json();

        // Transform API data into our format
        const weatherData: WeatherData = {
          city: rawData.name,
          country: rawData.sys.country,
          temperature: Math.round(rawData.main.temp),
          feels_like: Math.round(rawData.main.feels_like),
          condition: rawData.weather[0].main,
          description: rawData.weather[0].description,
          icon: rawData.weather[0].icon,
          humidity: rawData.main.humidity,
          wind: {
            speed: rawData.wind.speed,
            deg: rawData.wind.deg,
          },
          sunrise: rawData.sys.sunrise,
          sunset: rawData.sys.sunset,
          time: rawData.dt,
        };

        setData(weatherData);
        setError(null);
      } catch (err) {
        setData(null);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { data, isLoading, error };
};