"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/context/auth.context";
import supabase from "@/supabase/client";
import { User } from "@supabase/supabase-js";

const ProfilePage: React.FC = () => {
  const { me } = useAuth();
  const dataRef = useRef<User | null>(null);

  const handleUpdateSubmit = async (): Promise<void> => {
    const { data: userData, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", me?.id)
      .single();
  };

  return (
    <div className="max-w-md mx-auto bg-white h-[138px]">
      {/* 헤더 섹션 */}
      <div className="bg-[#B7E6CB] h-[138px] flex items-center justify-between">
        <div className="flex-grow text-center">
          <div className="font-semibold text-2xl text-[#ffffff]">
            God Life Mate
          </div>
        </div>
      </div>

      {/* 프로필 섹션 */}
      <div>
        <div className="flex justify-end mt-6 px-4">
          <button className="cursor-pointer">
            <Image
              src="/update_btn_2.svg"
              alt="update button"
              width={93}
              height={32}
            />
          </button>
        </div>
        <div className="flex flex-col items-center mt-10 mb-10 cursor-pointer">
          <div className="relative">
            <div className="rounded-full flex items-center justify-center">
              <Image
                src="/profile_camera.svg"
                alt="profile camera icon"
                width={96}
                height={96}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 입력 섹션 */}
      <div className="px-4 mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            닉네임
          </label>
          <input
            type="text"
            placeholder="nickname"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B7E6CB] focus:border-[#B7E6CB] sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            자기소개
          </label>
          <input
            placeholder="자기소개 글입니다."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B7E6CB] focus:border-[#B7E6CB] sm:text-sm"
          ></input>
        </div>
      </div>

      {/* 바닥 아이콘 섹션 */}
      <div className="flex justify-center mt-20 mb-4">
        <Image src="/turtle.svg" alt="turtle icon" width={70} height={70} />
      </div>
    </div>
  );
};

export default ProfilePage;
