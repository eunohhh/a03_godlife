import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  // const { searchParams } = new URL(request.url);
  // const lat = searchParams.get("lat");
  // const lon = searchParams.get("lon");

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&lang=kr&units=metric&appid=${apiKey}`
    );
    //한국, 'C로 받아오게 static 설정

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather data" });
  }
};
