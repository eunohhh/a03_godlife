"use client";

import React, { useState } from "react";
import { MainPost } from "@/components/MainPost";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import SideBar from "@/components/ui/SideBar";

import { showAlert } from "@/lib/openCustomAlert";
import { useRouter } from "next/navigation";
import { DropdownMenuCheckboxes } from "@/components/ui/Checkbox";
import { useAuth } from "@/context/auth.context";
import Image from "next/image";

function MainPage() {
  const { me } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const handleSideBarClick = () => {
    console.log("me=>", me);
    if (!me) {
      setIsOpen(false);
      showAlert("error", "로그인 해주세요", () => router.push("/login"), true);
    } else {
      setIsOpen(true);
      console.log("왜안돼");
    }
  };

  const [sortBy, setSortBy] = React.useState<"latest" | "popular">("latest");

  const handleLogoClick = () => {
    window.location.reload();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSortChange = (newSortBy: "latest" | "popular") => {
    setSortBy(newSortBy);
  };

  return (
    <main className="w-dvw ">
      <div className="my-0 mx-auto container bg-turtleGreen w-[428px] p-2">
        <div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-[1rem] border-gray-500 border-b-2">
          <div className="text-white">Main Header</div>
        </div>
        <div className="flex flex-row justify-between px-2 my-5">
          <SideBar isOpen={isOpen} handleOpen={setIsOpen}>
            <Avatar className="flex bg-white cursor-pointer">
              <AvatarImage
                onClick={handleSideBarClick}
                src="https://ngtnbcqokvtyrilhkwpz.supabase.co/storage/v1/object/public/profile/Vector.png"
                alt="profile"
              />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
          </SideBar>
          <div className="flex">
            <img
              src="/center_logo.svg"
              onClick={handleLogoClick}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="flex">
            <DropdownMenuCheckboxes onSortChange={handleSortChange} />
          </div>
        </div>
        <MainPost sortBy={sortBy} />
        {/* <div className="fixed w-[428px] h-dvh bottom-[0%] right-[0%]"> */}
        {/* </div> */}
      </div>
      <Image
        className="fixed cursor-pointer bottom-[2%] right-[2%] transition-transform duration-300 ease-in-out transform hover:scale-110"
        src="top_btn.svg"
        alt="Top Button"
        width={50}
        height={50}
        onClick={scrollToTop}
      />
    </>
  );
}

export default MainPage;
