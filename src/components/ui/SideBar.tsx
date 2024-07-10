import React from "react";

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
import Link from "next/link";
import Image from "next/image";
import WeatherData from "./WeatherData";
import { Separator } from "./Separator";

const SideBar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button>Open Sheet 버튼</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <Image src="/profile_btn.svg" alt="tmp" width={67} height={34} />
            <SheetTitle>nickname</SheetTitle>
          </SheetHeader>
          <SheetDescription>자기소개 글입니다.</SheetDescription>
          <SheetDescription>@email</SheetDescription>
          <Link href="/">
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
          <Link href="/">
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
          <WeatherData />
          <SheetFooter>
            <SheetClose asChild>
              <button>닫기</button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBar;
