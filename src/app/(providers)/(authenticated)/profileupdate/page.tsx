"use client";

import { useAuth } from "@/hooks/useAuth";
import { showAlert } from "@/lib/openCustomAlert";
import supabase from "@/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ProfileUpdatePage: React.FC = () => {
  const { me } = useAuth();
  // console.log("플필 변경시 변경된 데이 클라이언트 ===>", me);
  const queryClient = useQueryClient();

  const router = useRouter();
  const [profileImg, setProfileImg] = useState(
    me?.avatar ?? "/profile_camera.svg"
  );
  const [nickname, setNickname] = useState(me?.nickname ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [introduction, setIntroduction] = useState(me?.introduction ?? "");

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const avatarFile = e.target.files[0];
    setAvatarFile(avatarFile);
    const url = URL.createObjectURL(avatarFile);
    setProfileImg(url);
  };

  const handleCancel = () => {
    router.refresh();
    router.push("/profile");
  };

  const handleUpdateSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const updatedFields: Record<string, any> = {};

    if (!me) return;
    if (nickname.length === 0 || introduction.length === 0)
      return showAlert("caution", "값을 입력해주세요");
    if (avatarFile !== null) {
      const fileName = `avatars_${new Date().getTime()}.jpg`;

      const { error: uploadError } = await supabase.storage
        .from("profile")
        .upload(fileName, avatarFile, {
          cacheControl: "10",
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      const { data: avatarData } = supabase.storage
        .from("profile")
        .getPublicUrl(fileName);

      updatedFields.avatar = avatarData.publicUrl;
      setProfileImg(avatarData.publicUrl);
    }

    if (nickname) updatedFields.nickname = nickname;
    if (introduction) updatedFields.introduction = introduction;

    const updatedData = {
      ...me,
      ...updatedFields,
    };

    // console.log("updatedData ====>", updatedData);

    // const { data, error: updateError } = await supabase.from("users").upsert(updatedData).select();
    const { data, error: updateError } = await supabase
      .from("users")
      .update(updatedData)
      .eq("id", me.id)
      .select();

    queryClient.invalidateQueries({ queryKey: ["user"] });
    // setProfileImg(data[0].avatar);
    // setNickname(data[0].nickname);
    // setIntroduction(data[0].introduction);
    showAlert("success", "업데이트에 성공했습니다!", () => {
      router.push("/profile");
      // 여기서 set me 를 해봐야...
    });
  };

  //max-w-md
  return (
    <div className="w-full max-w-[428px] mx-auto bg-white h-[138px]">
      {/* 헤더 섹션 */}
      <div className="bg-[#B7E6CB] h-[138px] flex items-center justify-between">
        <div className="flex-grow text-center">
          <div className="font-MangoByeolbyeol text-2xl text-[#ffffff]">
            God Life Mate
          </div>
        </div>
      </div>
      {/* submit form 시작 */}
      {/* 프로필 섹션 */}
      <form onSubmit={handleUpdateSubmit}>
        <div className="flex justify-between mt-6 px-4 font-Pretendard-Regular">
          <button
            type="button"
            onClick={handleCancel}
            className="w-[93px] h-[32px] bg-white text-[#B7E6CB] py-1 px-3 border-[1.3px] border-[#B7E6CB] rounded-full hover:bg-[#B7E6CB] hover:text-white transition duration-300 ease-in-out flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[93px] h-[32px] bg-white text-[#B7E6CB] font-semi-bold py-1 px-3 border-[1.3px] border-[#B7E6CB] rounded-full hover:bg-[#B7E6CB] hover:text-white transition duration-300 ease-in-out flex items-center justify-center"
          >
            Update
          </button>
        </div>
        <div className="flex flex-col items-center mt-10 mb-10 cursor-pointer">
          <div className="relative">
            <div className="rounded-full flex items-center justify-center">
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer rounded-full w-[96px] h-[96px] overflow-hidden relative flex items-center justify-center"
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImgChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Image
                  src={profileImg}
                  alt="profile camera icon"
                  width={96}
                  height={96}
                  priority
                  className="rounded-full object-contain w-auto h-auto"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 입력 섹션 */}
        <div className="px-4 mt-4">
          <div className="mb-4">
            <label className="block text-sm font-bold font-Pretendard-Regular text-gray-700">
              닉네임
            </label>
            <input
              type="text"
              placeholder="nickname"
              value={nickname ?? ""}
              onChange={(e) => setNickname(e.target.value)}
              className="font-Pretendard-Regular mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B7E6CB] focus:border-[#B7E6CB] sm:text-sm placeholder-gray-400 text-gray-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold font-Pretendard-Regular text-gray-700">
              자기소개
            </label>
            <input
              value={introduction ?? ""}
              onChange={(e) => setIntroduction(e.target.value)}
              placeholder="20자이내로 작성해주세요"
              className="font-Pretendard-Regular  mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B7E6CB] focus:border-[#B7E6CB] sm:text-sm placeholder-gray-400 text-gray-600 text-sm"
            ></input>
          </div>
        </div>
      </form>
      {/* submit form 끝 */}
      {/* 바닥 아이콘 섹션 */}
      <div className="flex justify-center mt-20 mb-4">
        <Image
          src="/turtle.png"
          alt="turtle icon"
          width={70}
          height={70}
          priority
        />
      </div>
    </div>
  );
};

export default ProfileUpdatePage;
