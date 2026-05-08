import { WeatherData, ForecastData, CitySuggestion } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    throw new Error('OpenWeather API Key is missing');
  }

  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`,
    { next: { revalidate: 3600 } } // Revalidate every hour
  );

  if (!response.ok) {
    throw new Error('Failed to fetch current weather');
  }

  return response.json();
}

export async function getForecast(lat: number, lon: number): Promise<ForecastData | null> {
  if (!API_KEY) {
    console.error('OpenWeather API Key is missing');
    return null;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      const errorBody = await response.json();
      console.error(`OpenWeather API Error [${response.status}]:`, errorBody);
      return null;
    }

    return response.json();
  } catch (err) {
    console.error('Failed to fetch forecast:', err);
    return null;
  }
}

export async function getCitySuggestions(query: string): Promise<CitySuggestion[]> {
  if (!API_KEY) {
    throw new Error('OpenWeather API Key is missing');
  }

  if (query.length < 3) return [];

  const response = await fetch(
    `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch city suggestions');
  }

  return response.json();
}
