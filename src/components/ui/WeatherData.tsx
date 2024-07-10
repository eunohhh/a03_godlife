"use client";

import { Weather } from "@/types/weather";
import React, { useEffect, useState } from "react";

const WeatherData: React.FC = () => {
  const [weather, setWeather] = useState<Weather["weather"] | null>(null);
  const [feelslike, setFeelslike] = useState<number | null>(null);
  const [temp, setTemp] = useState<number | null>(null);
  //useState랑 useEffect 앞에 React.를 붙이면 import 안 해와도 되나?
  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch("/api/weather");
      const data: Weather = await response.json();
      setWeather(data.weather);
      setFeelslike(data.main.feels_like);
      setTemp(data.main.temp);
    };
    fetchWeatherData();
  }, []);
  // if(!weather) return(<div>날씨 없음</div>)
  return (
    <>
      <div>
        기온 : {temp?.toFixed(1)}°C (체감 온도 : {feelslike?.toFixed(1)}°C)
      </div>

      <div>
        {weather ? (
          weather.map((e) => (
            <div key={e.id} className="h-[20px] ">
              <div>날씨 : {e.description}</div>
              {/* <div>{e.icon}</div> */}
            </div>
          ))
        ) : (
          <div className="h-[20px]">날씨 데이터 없음</div>
        )}
      </div>
    </>
  );
};

export default WeatherData;
