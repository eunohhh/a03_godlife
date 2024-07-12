"use client";

import { Weather } from "@/types/weather";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// WeatherData 컴포넌트 속 interface는 TypeScript에서 컴포넌트의 props를 정의하는 데 사용됩니다.
// 이는 코드의 가독성을 높이고 타입 검사를 통해 컴파일 타임에 오류를 방지하는 데 도움이 됩니다.

// 아래는 WeatherData 컴포넌트에서 WeatherDataProps 인터페이스를 왜 사용하는지 설명합니다.

// 이유 1: 타입 안전성 제공
// WeatherData 컴포넌트가 onWeatherData라는 콜백 함수를 prop으로 받습니다.
// 이 콜백 함수의 인자는 날씨 데이터와 관련된 여러 값들입니다. 인터페이스를 사용하면 이 prop의 타입을 명시적으로 정의할 수 있습니다. 이는 타입 안전성을 제공하고, 잘못된 타입의 데이터가 전달되는 것을 방지합니다.

// 이유 2: 코드 가독성 향상
// 인터페이스를 사용하면 컴포넌트가 어떤 props를 기대하는지 명확히 알 수 있습니다.
// 이는 코드의 가독성을 높이고, 다른 개발자가 코드를 읽을 때 prop의 구조를 쉽게 이해할 수 있게 합니다.

// 이유 3: 자동 완성 지원
// TypeScript 인터페이스를 사용하면 IDE에서 prop에 대한 자동 완성을 지원합니다.
// 이는 개발 생산성을 높이고, 코드 작성 중에 실수를 줄이는 데 도움이 됩니다.

interface WeatherDataProps {
  onWeatherData: (
    weather: Weather["weather"],
    temp: number,
    tempMin: number,
    tempMax: number,
    humidity: number
  ) => void;
}

const WeatherData: React.FC<WeatherDataProps> = ({ onWeatherData }) => {
  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch("/api/weather");
      const data: Weather = await response.json();
      onWeatherData(
        data.weather,
        data.main.temp,
        data.main.temp_min,
        data.main.temp_max,
        data.main.humidity
      );
    };
    fetchWeatherData();
  }, []);
  return null;
};

export default WeatherData;
