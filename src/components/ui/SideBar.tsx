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

const SideBar = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button>Open Sheet 버튼</button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <Image src="/next.svg" alt="tmp" width={30} height={30} />
            <SheetTitle>nickname</SheetTitle>
          </SheetHeader>
          <SheetDescription>자기소개 글입니다.</SheetDescription>
          <SheetDescription>@email</SheetDescription>
          <Link href="/">내 프로필</Link>
          <Link href="/">글 작성하기</Link>

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
