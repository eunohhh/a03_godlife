"use Client";

import { useAuth } from "@/context/auth.context";
import supabase from "@/supabase/client";
import React, { PropsWithChildren, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import WeatherData from "./WeatherData";
import { Separator } from "./Separator";

import {
  Sheet,
  SheetTrigger,
  SheetTitle,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetDescription,
} from "./Sheet";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Weather } from "@/types/weather";

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
  // const [profileImg, setProfileImg] = useState(
  //   me?.userTableInfo.avatar ?? "/profile_camera.svg"
  // );
  // const [nickname, setNickname] = useState(me?.userTableInfo.nickname ?? "");
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const [introduction, setIntroduction] = useState(
  //   me?.userTableInfo.introduction ?? ""
  // );

  const handleClickLogout = () => {
    //로더를 띄우거나 (1)
    //화면을 천천히 사라지게
    //transition
    logOut();
  };

  const handleClick = () => {
    handleOpen(false);
  };
  // if (!me) return null;
  //이 부분 때문에, 로그인 안 됐을 때 SideBar를 누를 수 있는 버튼이 없어졌었다
  //return null 대신 스켈레톤이나 loading을 알려줄 수 잇는 거 추가하기

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
    <div className="w-[428px]">
      {/* as Child 삭제해도 동작하는 이유? */}
      <Sheet open={isOpen}>
        <SheetTrigger asChild>{children}</SheetTrigger>
        {/* hover시 cursor 바뀌게 수정해야 함! */}
        <SheetContent handleClick={handleClick}>
          <SheetHeader>
            {me && me.userTableInfo ? (
              <>
                <Image
                  src={me.userTableInfo.avatar as string | StaticImport}
                  alt="profile_btn"
                  width={67}
                  height={34}
                />
                <SheetTitle>{me.userTableInfo.nickname}</SheetTitle>
                <div className="flex flex-col items-start">
                  <SheetDescription className="">
                    여기 안떠?
                    {/* {me.userTableInfo.introduction} */}
                  </SheetDescription>
                  <SheetDescription>@{me.userTableInfo.email}</SheetDescription>
                </div>
              </>
            ) : (
              <div>로딩중</div>
            )}
          </SheetHeader>
          {/* <SheetDescription>
            {me && me.userTableInfo.introduction ? (
              me.userTableInfo.introduction
            ) : (
              <div>로딩중</div>
            )}
          </SheetDescription> */}
          {/* <SheetDescription>
            {me && me.userTableInfo.email ? (
              `@${me.userTableInfo.introduction}`
            ) : (
              <div>로딩중</div>
            )}
          </SheetDescription> */}
          <Link href="/profile">
            <div className="flex flex-row mt-3 mb-3">
              <Image
                className="mr-3"
                src="/profile_icon.svg"
                width={18}
                height={21}
                alt="profile_icon"
              />
              <SheetTitle> 내 프로필</SheetTitle>
            </div>
          </Link>
          <Link href="/write">
            <div className="flex flex-row mb-10">
              <Image
                className="mr-3"
                src="/write_icon.svg"
                alt="write_icon"
                width={20}
                height={20}
              />
              <SheetTitle> 글 작성하기</SheetTitle>
            </div>
          </Link>
          <Separator />
          {/* <h3>날씨</h3> */}
          <Card className="font-Cafe24SsurroundAir max-w-80 max-h-40 mt-10 mb-10 bg-turtleGreen">
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
                {weather ? weather[0].description : "Loading..."}
              </CardTitle>
              <CardDescription className="mb-3">
                {temp ? `${temp.toFixed(1)}°C` : "Loading..."}
              </CardDescription>
            </div>
            <CardContent className="text-[12px] flex flex-row items-center">
              <p className="ml-3 mr-3">
                {tempMin ? `🔽최저:  ${tempMin.toFixed(1)}°C` : "Loading..."}
              </p>
              <p className="ml-3 mr-3">
                {tempMax ? `🔼최고:  ${tempMax.toFixed(1)}°C` : "Loading..."}
              </p>
              <p className="ml-3 mr-3">
                {humidity ? `💧습도:  ${humidity.toFixed(1)}%` : "Loading..."}
              </p>
            </CardContent>
          </Card>
          <WeatherData onWeatherData={handleWeatherData} />

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
