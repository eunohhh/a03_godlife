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
    //내 위치에 따라 lon, lat 구해서 띄우고 싶은데

    const weatherObj = await response.json();
    console.log(weatherObj);

    const iconCode = weatherObj.weather[0].icon; //아마도 10d
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    const data = {
      ...weatherObj,
      weather: weatherObj.weather.map((weatherItem: any) => ({
        //any 말고 object로 하면 왜 안되죵..?
        ...weatherItem,
        iconUrl: `http://openweathermap.org/img/wn/${weatherItem.icon}@2x.png`,
      })),
    };
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch weather data" });
  }
};
