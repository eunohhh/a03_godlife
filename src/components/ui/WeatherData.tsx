"use client";

import { Weather } from "@/types/weather";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const WeatherData: React.FC = () => {
  const [weather, setWeather] = useState<Weather["weather"] | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  //useState랑 useEffect 앞에 React.를 붙이면 import 안 해와도 되나?
  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch("/api/weather");
      const data: Weather = await response.json();
      setWeather(data.weather);
      setTempMin(data.main.temp_min);
      setTempMax(data.main.temp_max);
      setHumidity(data.main.humidity);
      setTemp(data.main.temp);
    };
    fetchWeatherData();
  }, []);
  // if(!weather) return(<div>날씨 없음</div>)
  return (
    <>
      <div>
        {weather ? (
          weather.map((e) => (
            <div key={e.id} className="h-[100px] ">
              <div className="flex flex-row">
                <Image
                  src={e.iconUrl}
                  alt={e.description}
                  width={60}
                  height={60}
                />
                <div className="mt-4">{e.description}</div>
                <div className="ml-2 mt-4">{temp?.toFixed(1)}°C</div>
                <div className="ml-3 mt-4">최저 {tempMin?.toFixed(1)}°C</div>
                <div className="ml-3 mt-4">최고 {tempMax?.toFixed(1)}°C</div>
                <div className="ml-3 mt-4">습도 {humidity?.toFixed(1)}%</div>
              </div>
            </div>
          ))
        ) : (
          <div className="h-[100px]">날씨 데이터 없음</div>
        )}
      </div>
    </>
  );
};

export default WeatherData;
