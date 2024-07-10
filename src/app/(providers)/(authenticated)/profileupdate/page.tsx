import React from "react";
import Image from "next/image";

const ProfilePage: React.FC = () => {
  return (
    <div
      className="max-w-md mx-auto bg-white h-screen overflow-hidden"
      style={{ height: "428px" }}
    >
      {/* 헤더 섹션 */}
      <div className="bg-[#B7E6CB] h-[138px] flex items-center justify-between px-4 relative">
        <button className="left-4">
          <Image
            src="/back_btn.svg"
            alt="backbtn"
            width={32}
            height={32}
            className="hover:bg-green-700 cursor-pointer"
          />
        </button>
        <div className="flex-grow text-center">
          <div className="font-semibold text-2xl text-[#ffffff]">
            God Life Mate
          </div>
        </div>
        <div className="w-8"></div>{" "}
      </div>

      {/* 프로필 섹션 */}
      <div className="flex flex-col items-center mt-4">
        <div className="relative">
          <div className="rounded-full flex items-center justify-center">
            <Image
              src="/profile_camera.svg"
              alt="profile camera icon"
              width={96}
              height={96}
              className="rounded-full"
            />
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            자기소개
          </label>
          <textarea
            placeholder="자기소개 글입니다."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
          ></textarea>
        </div>
      </div>

      {/* 바닥 아이콘 섹션 */}
      <div className="flex justify-center mt-auto mb-4">
        <Image src="/turtle.svg" alt="turtle icon" width={48} height={48} />
      </div>
    </div>
  );
};

export default ProfilePage;
