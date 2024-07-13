"use Client";

import { useAuth } from "@/context/auth.context";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "./Separator";
import WeatherData from "./WeatherData";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet";

import { Weather } from "@/types/weather";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Card, CardContent, CardDescription, CardTitle } from "./Card";

import LogoutLoader from "./LogoutLoader";

const SideBar = ({
  children,
  isOpen,
  handleOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { me, logOut } = useAuth();

  const handleClickLogout = () => {
    //로더를 띄우거나 (1)
    //화면을 천천히 사라지게
    //transition
    LogoutLoader;
    logOut();
  };

  const handleClick = () => {
    handleOpen(false);
  };
  // if (!me) return BasicLoader;
  //이 부분 때문에, 로그인 안 됐을 때 SideBar를 누를 수 있는 버튼이 없어졌었다
  //return null 대신 스켈레톤이나 loading을 알려줄 수 잇는 거 추가하기
  //SideBar에서 로그아웃 눌렀을 때 로더 뜨면서 로그인 페이지로 이동됨
  //로그아웃 상태면 메인페이지에서 좌측상단 얼굴 없어짐

  const [weather, setWeather] = useState<Weather["weather"] | null>(null);
  const [tempMin, setTempMin] = useState<number | null>(null);
  const [tempMax, setTempMax] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [temp, setTemp] = useState<number | null>(null);

  const handleWeatherData = (
    weatherData: Weather["weather"],
    temperature: number,
    minimumTemp: number,
    maximumTemp: number,
    humidityLevel: number
  ) => {
    setWeather(weatherData);
    setTempMin(minimumTemp);
    setTempMax(maximumTemp);
    setHumidity(humidityLevel);
    setTemp(temperature);
  };

  return (
    <div className="w-[10%]">
      {/* as Child 삭제해도 동작하는 이유? */}
      <Sheet open={isOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        {/* hover시 cursor 바뀌게 수정해야 함! */}
        <SheetContent
          className="font-Pretendard-Regular"
          handleClick={handleClick}
        >
          <SheetHeader>
            {me && me.userTableInfo ? (
              <>
                <Image
                  src={me.userTableInfo.avatar as string | StaticImport}
                  alt="profile_btn"
                  className="rounded-full"
                  width={67}
                  height={34}
                />
                <SheetTitle>{me.userTableInfo.nickname}</SheetTitle>
                <div className="flex flex-col items-start">
                  <SheetDescription>
                    {me.userTableInfo.introduction
                      ? me.userTableInfo.introduction
                      : "자기소개를 추가해주세요"}
                  </SheetDescription>
                  <SheetDescription>@{me.userTableInfo.email}</SheetDescription>
                </div>
              </>
            ) : (
              <div>로딩중</div>
            )}
          </SheetHeader>

          <Link href="/profile">
            <div className="flex flex-row mt-3 mb-3">
              <Image
                className="mr-3"
                src="/profile_icon.svg"
                width={17}
                height={14}
                alt="profile_icon"
              />
              <SheetTitle className="font-semibold text-md text-slate-700">
                내 프로필
              </SheetTitle>
            </div>
          </Link>
          <Link href="/write">
            <div className="flex flex-row mb-10">
              <Image
                className="mr-3"
                src="/write_icon.svg"
                alt="write_icon"
                width={17}
                height={17}
              />
              <SheetTitle className="font-semibold text-md  text-slate-700">
                글 작성하기
              </SheetTitle>
            </div>
          </Link>
          <Separator />
          {/* <h3>날씨</h3> */}
          <WeatherData onWeatherData={handleWeatherData} />

          {weather && tempMin && tempMax && humidity ? (
            <Card className="font-Cafe24SsurroundAir max-w-80 max-h-40 mt-10 mb-10 bg-turtleGreen/60">
              <div className="flex flex-col items-center">
                <CardTitle>
                  {weather && weather[0] && (
                    <Image
                      src={weather[0].iconUrl}
                      alt={weather[0].description}
                      width={53}
                      height={53}
                    />
                  )}
                </CardTitle>
                <CardTitle className="text-xl">
                  {weather[0].description}
                </CardTitle>
                <CardDescription className="mb-3">
                  {`${temp?.toFixed(1)}°C`}
                </CardDescription>
              </div>
              <CardContent className="text-[12px] ml-1 font-semibold flex flex-row items-center">
                <p className="ml-3 mr-3">{`🔽최저  ${tempMin.toFixed(1)}°C`}</p>
                <p className="ml-5 mr-3">{`🔼최고  ${tempMax.toFixed(1)}°C`}</p>
                <p className="ml-3 mr-3">{`💧습도  ${humidity.toFixed(1)}%`}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="text-center font-semibold grid place-items-center font-Cafe24SsurroundAir mt-10 mb-10 bg-turtleGreen/60 w-[270px] h-[162px]">
              <p>오늘의 날씨는?</p>
            </Card>
          )}

          <SheetFooter className="flex flex-row justify-center">
            {/* <SheetClose asChild>
              <button onClick={handleClick}>닫기</button>
            </SheetClose> */}
            <button
              onClick={handleClickLogout}
              className="w-[67px] h-[34px] bg-[#B7E6CB] text-white font-semi-bold text-sm py-0 px-1 rounded-full hover:bg-[#073A33] transition duration-300 ease-in-out flex items-center justify-center"
            >
              Logout
            </button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideBar;
