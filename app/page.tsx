import { getCurrentWeather, getForecast } from "@/services/weatherService";
import SearchBar from "@/components/SearchBar";
import CurrentWeather from "@/components/CurrentWeather";
import Forecast from "@/components/Forecast";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

interface HomeProps {
  searchParams: Promise<{ city?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { city = "London" } = await searchParams;

  let weatherData = null;
  let forecastData = null;
  let error = null;

  try {
    [weatherData, forecastData] = await Promise.all([
      getCurrentWeather(city),
      getForecast(city),
    ]);
  } catch (err) {
    console.error("Error fetching weather:", err);
    error =
      "Could not find weather data for that location. Please try another city.";
  }

  return (
    <main className="flex-1 w-full bg-linear-to-br from-blue-600 via-blue-500 to-teal-400 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-md">
            SkyCast
          </h1>
          <p className="text-white/80 text-lg mb-8">Modern Weather Forecasts</p>
          <SearchBar initialCity={city} />
        </header>

        {error ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-red-300 mb-4" />
            <p className="text-center font-medium">{error}</p>
            <Link
              href="/"
              className="mt-6 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors border border-white/10"
            >
              Back to London
            </Link>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {weatherData && <CurrentWeather data={weatherData} />}
            {forecastData && <Forecast data={forecastData} />}
          </div>
        )}
      </div>
    </main>
  );
}
