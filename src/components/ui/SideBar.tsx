"use Client";

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

import { useAuth } from "@/hooks/useAuth";
import { Weather } from "@/types/weather";
import BasicLoader from "./BasicLoader";
import { Card, CardContent, CardDescription, CardTitle } from "./Card";

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
        handleOpen((prev) => !prev);
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
        <div className="w-[10%]">
            {/* as Child 삭제해도 동작하는 이유? */}
            <Sheet open={isOpen}>
                <SheetTrigger asChild>{children}</SheetTrigger>
                {/* hover시 cursor 바뀌게 수정해야 함! */}
                <SheetContent handleClick={handleClick}>
                    <SheetHeader>
                        {me ? (
                            <div className="flex flex-col h-[150px]">
                                <Image
                                    src={me.avatar as string}
                                    alt="profile_btn"
                                    className="rounded-full w-[50px] h-[50px] mb-2"
                                    width={50}
                                    height={50}
                                />
                                <SheetTitle>
                                    {me.nickname ? me.nickname : "닉네임을 추가해주세요"}
                                </SheetTitle>
                                <div className="flex flex-col items-start">
                                    <SheetDescription className="">
                                        {me.introduction ? me.introduction : "자기소개를 추가해주세요"}
                                    </SheetDescription>
                                    <SheetDescription>@{me.email}</SheetDescription>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center rounded-lg h-[150px] w-[80%]">
                                <BasicLoader isSmall={true} />
                            </div>
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
                                className="mr-3 w-auto h-auto"
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
                                className="mr-3 w-auto h-auto"
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

                    <WeatherData onWeatherData={handleWeatherData} />

                    {!weather && (
                        <div className="font-Cafe24SsurroundAir max-w-80 max-h-40 mt-10 mb-10 bg-turtleGreen/60"></div>
                    )}
                    {/* <h3>날</h3> */}
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
                                {weather ? weather[0].description : "Loading..."}
                            </CardTitle>
                            <CardDescription className="mb-3">
                                {temp ? `${temp.toFixed(1)}°C` : "Loading..."}
                            </CardDescription>
                        </div>
                        <CardContent className="text-[12px] ml-1 font-semibold flex flex-row items-center">
                            <p className="ml-3 mr-3">
                                {tempMin ? `🔽최저  ${tempMin.toFixed(1)}°C` : "Loading..."}
                            </p>
                            <p className="ml-5 mr-3">
                                {tempMax ? `🔼최고  ${tempMax.toFixed(1)}°C` : "Loading..."}
                            </p>
                            <p className="ml-3 mr-3">
                                {humidity ? `💧습도  ${humidity.toFixed(1)}%` : "Loading..."}
                            </p>
                        </CardContent>
                    </Card>

                    <SheetFooter className="flex flex-row justify-center">
                        {/* <SheetClose asChild>
              <button onClick={handleClick}>닫기</button>
            </SheetClose> */}
                        <button
                            onClick={handleClickLogout}
                            className="w-[67px] h-[34px] bg-[#B7E6CB] text-white font-semi-bold text-sm py-0 px-1 rounded-full hover:bg-[#073A33] transition duration-300 ease-in-out flex items-center justify-center focus-visible:outline-none"
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
