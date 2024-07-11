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

const SideBar = ({
  children,
  isOpen,
  handleOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  handleOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { me } = useAuth();
  // const [profileImg, setProfileImg] = useState(
  //   me?.userTableInfo.avatar ?? "/profile_camera.svg"
  // );
  // const [nickname, setNickname] = useState(me?.userTableInfo.nickname ?? "");
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const [introduction, setIntroduction] = useState(
  //   me?.userTableInfo.introduction ?? ""
  // );

  const handleClick = () => {
    handleOpen(false);
  };
  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger>{children}</SheetTrigger>
        {/* hover시 cursor 바뀌게 수정해야 함! */}
        <SheetContent handleClick={handleClick}>
          <SheetHeader>
            <Image
              src={me?.userTableInfo.avatar as string | StaticImport}
              alt="profile_btn"
              width={67}
              height={34}
            />
            <SheetTitle>{me?.userTableInfo.nickname}</SheetTitle>
          </SheetHeader>
          <SheetDescription>{me?.userTableInfo.introduction}</SheetDescription>
          <SheetDescription>@{me?.userTableInfo.email}</SheetDescription>
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
            <div className="flex flex-row mb-3">
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
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
          <WeatherData />
          <Separator />
          <SheetFooter>
            <SheetClose asChild>
              <button onClick={handleClick}>닫기</button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBar;
