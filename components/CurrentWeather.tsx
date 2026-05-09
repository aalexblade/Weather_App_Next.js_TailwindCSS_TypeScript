import React from "react";
import { WeatherData } from "@/types/weather";
import { Cloud, Droplets, Wind, Thermometer, MapPin } from "lucide-react";
import Image from "next/image";

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const { name, main, weather, wind } = data;
  const current = weather[0];

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl p-8 shadow-2xl text-white overflow-hidden relative">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/30 rounded-full blur-3xl"></div>

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-white/80">
            <MapPin size={18} />
            <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
          </div>
          <p className="text-sm uppercase tracking-widest text-white/60 mb-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center justify-center md:justify-start">
            <span className="text-8xl font-black tracking-tighter">
              {Math.round(main.temp)}°
            </span>
            <div className="ml-4 flex flex-col items-center">
              <Image
                src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`}
                alt={current.description}
                width={100}
                height={100}
                className="drop-shadow-lg"
              />
              <span className="text-lg font-medium capitalize -mt-2">
                {current.description}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center border border-white/10">
            <Thermometer className="text-orange-300 mb-2" />
            <span className="text-xs text-white/60 uppercase">Feels Like</span>
            <span className="text-xl font-bold">
              {Math.round(main.feels_like)}°
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center border border-white/10">
            <Droplets className="text-blue-300 mb-2" />
            <span className="text-xs text-white/60 uppercase">Humidity</span>
            <span className="text-xl font-bold">{main.humidity}%</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center border border-white/10">
            <Wind className="text-teal-300 mb-2" />
            <span className="text-xs text-white/60 uppercase">Wind</span>
            <span className="text-xl font-bold">{wind.speed} m/s</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center border border-white/10">
            <Cloud className="text-gray-300 mb-2" />
            <span className="text-xs text-white/60 uppercase">Clouds</span>
            <span className="text-xl font-bold">{data.clouds.all}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
