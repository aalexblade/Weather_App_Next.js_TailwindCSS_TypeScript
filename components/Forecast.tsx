import React from "react";
import { ForecastData } from "@/types/weather";
import Image from "next/image";

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  if (!data?.list?.length) return null;

  const dailyMap = new Map<string, ForecastData["list"][0][]>();

  for (const item of data.list) {
    const dateKey = item.dt_txt.split(" ")[0];
    if (!dailyMap.has(dateKey)) {
      dailyMap.set(dateKey, []);
    }
    dailyMap.get(dateKey)!.push(item);
  }

  const dailyForecast = Array.from(dailyMap.entries()).slice(0, 7);

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 pb-12 px-4">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">
        {dailyForecast.length}-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
        {dailyForecast.map(([dateKey, items]) => {
          const middayItem =
            items.find((item) => item.dt_txt.includes("12:00:00")) ||
            items[Math.floor(items.length / 2)];
          const weather = middayItem.weather[0];
          const date = new Date(middayItem.dt * 1000);
          const temps = items.map((item) => item.main.temp);
          const tempMax = Math.round(Math.max(...temps));
          const tempMin = Math.round(Math.min(...temps));

          return (
            <div
              key={dateKey}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 md:p-4 flex flex-col items-center shadow-lg transition-transform hover:scale-105"
            >
              <span className="text-white/60 text-xs md:text-sm font-medium uppercase tracking-wider">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span className="text-white/40 text-[10px] md:text-xs mb-1 md:mb-2">
                {date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>

              <div className="my-1 md:my-2">
                <Image
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.description}
                  width={50}
                  height={50}
                  className="drop-shadow-md w-10 h-10 md:w-13 md:h-13"
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-bold text-white leading-none">
                  {tempMax}°
                </span>
                <span className="text-white/40 text-xs md:text-sm font-medium mt-1">
                  {tempMin}°
                </span>
              </div>

              <span className="text-[10px] md:text-xs text-white/70 mt-2 md:mt-3 text-center capitalize line-clamp-1">
                {weather.main}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
