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
            <div className="flex flex-row">
              <Image
                src="/profile_icon.svg"
                width={18}
                height={21}
                alt="profile_icon"
              />
              내 프로필
            </div>
          </Link>
          <Link href="/">
            <div className="flex flex-row">
              <Image
                src="/write_icon.svg"
                alt="write_icon"
                width={20}
                height={20}
              />
              글 작성하기
            </div>
          </Link>
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
