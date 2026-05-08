import React from 'react';
import { ForecastData } from '@/types/weather';
import Image from 'next/image';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  // Filter the forecast to get one entry per day (around noon)
  const dailyForecast = data.list.filter((item) => item.dt_txt.includes('12:00:00'));

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 pb-12">
      <h3 className="text-xl font-bold text-white mb-6 px-4">5-Day Forecast</h3>
      <div className="flex overflow-x-auto gap-4 px-4 pb-4 scrollbar-hide">
        {dailyForecast.map((day, index) => {
          const date = new Date(day.dt * 1000);
          const weather = day.weather[0];

          return (
            <div 
              key={day.dt}
              className="flex-shrink-0 mt-2 w-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col items-center shadow-lg transition-transform hover:scale-105"
            >
              <span className="text-white/60 text-sm font-medium uppercase tracking-wider">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-white/40 text-xs mb-2">
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              
              <div className="my-2 ">
                <Image 
                  src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                  alt={weather.description}
                  width={60}
                  height={60}
                  className="drop-shadow-md cursor-pointer"
                />
              </div>

              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-white leading-none">
                  {Math.round(day.main.temp_max)}°
                </span>
                <span className="text-white/40 text-sm font-medium mt-1">
                  {Math.round(day.main.temp_min)}°
                </span>
              </div>
              
              <span className="text-xs text-white/70 mt-3 text-center capitalize line-clamp-1">
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
