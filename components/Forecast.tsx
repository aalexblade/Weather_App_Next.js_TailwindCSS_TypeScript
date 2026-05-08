import React from "react";
import { ForecastData } from "@/types/weather";
import Image from "next/image";

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  if (!data?.list?.length) return null;

  const dailyForecast = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-12 pb-12">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 px-4">
        {dailyForecast.length}-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
        {dailyForecast.map((day) => {
          const weather = day.weather[0];
          const date = new Date(day.dt * 1000);
          const tempMax = Math.round(day.main.temp_max);
          const tempMin = Math.round(day.main.temp_min);

          return (
            <div
              key={day.dt}
              className="shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 md:p-4 flex flex-col items-center shadow-lg transition-transform hover:scale-105"
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
