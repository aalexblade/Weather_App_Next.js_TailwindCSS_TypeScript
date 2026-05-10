import { getCurrentWeather, getForecast } from "@/services/weatherService";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import ErrorCard from "@/components/ErrorCard";

interface HomeProps {
  searchParams: Promise<{ city?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { city = "London" } = await searchParams;

  let weatherData = null;
  let forecastData = null;

  try {
    weatherData = await getCurrentWeather(city);
    if (weatherData) {
      forecastData = await getForecast(weatherData.coord.lat, weatherData.coord.lon);
    }
  } catch (err) {
    console.error("Error fetching weather:", err);
  }

  if (!weatherData) {
    return (
      <div className="flex-1 w-full bg-linear-to-br from-blue-600 via-blue-500 to-teal-400 flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto text-center">
          <header className="mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">
              SkyCast
            </h1>
            <p className="text-white/80 text-lg mb-8">Modern Weather Forecasts</p>
            <SearchBar initialCity={city} />
          </header>
          <ErrorCard message="City not found. Please check the spelling and try again." />
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 min-h-0 w-full bg-linear-to-br from-blue-600 via-blue-500 to-teal-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">
            SkyCast
          </h1>
          <p className="text-white/80 text-lg mb-8">Modern Weather Forecasts</p>
          <SearchBar initialCity={city} />
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {weatherData && <CurrentWeather data={weatherData} />}
          {forecastData && <Forecast data={forecastData} />}
        </div>
      </div>
    </main>
  );
}
