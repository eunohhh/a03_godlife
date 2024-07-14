"use client";

import { useAuth } from "@/context/auth.context";
import Link from "next/link";

function MainHeader() {
  const { me } = useAuth();
  return (
    <div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-[1rem] border-gray-500 border-b-2">
      <div className="text-white text-2xl font-MangoByeolbyeol">
        God Life Mate
      </div>
      <p className="text-sm font-Pretendard-Regular text-gray-500">
        {me ? "반갑습니다!" : <Link href="/"> 로그인하기</Link>}
      </p>
    </div>
  );
}

export default MainHeader;
