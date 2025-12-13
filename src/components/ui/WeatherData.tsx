"use client";

import { useEffect } from "react";
import type { Weather } from "@/types/weather";

interface WeatherDataProps {
	onWeatherData: (
		weather: Weather["weather"],
		temp: number,
		tempMin: number,
		tempMax: number,
		humidity: number,
	) => void;
}

const WeatherData = ({ onWeatherData }: WeatherDataProps) => {
	useEffect(() => {
		const fetchWeatherData = async () => {
			const response = await fetch("/api/weather", {
				method: "GET",
				cache: "no-store",
			});
			const data: Weather = await response.json();

			console.log("data ====>", data);

			onWeatherData(
				data.weather,
				data.main.temp,
				data.main.temp_min,
				data.main.temp_max,
				data.main.humidity,
			);
		};
		fetchWeatherData();
	}, [onWeatherData]);
	return null;
};

export default WeatherData;
