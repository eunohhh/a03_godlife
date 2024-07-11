"use client";

import { useAuth } from "@/context/auth.context";
import supabase from "@/supabase/client";
import Image from "next/image";
import React, { useState } from "react";

const ProfilePage: React.FC = () => {
    const { me } = useAuth();

    const [profileImg, setProfileImg] = useState(me?.userTableInfo.avatar ?? "/profile_camera.svg");
    const [nickname, setNickname] = useState(me?.userTableInfo.nickname ?? "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [introduction, setIntroduction] = useState(me?.userTableInfo.introduction ?? "");

    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // optimistic update
        if (!e.target.files) return;
        const avatarFile = e.target.files?.[0];
        setAvatarFile(avatarFile);
        const url = URL.createObjectURL(avatarFile);
        setProfileImg(url);
    };

    const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const updatedFields: Record<string, any> = {};

        if (!me) return;
        if (avatarFile !== null) {
            const fileName = `avatars_${me.id}.jpg`;

            const { error: uploadError } = await supabase.storage
                .from("profile")
                .upload(fileName, avatarFile, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (uploadError) {
                console.error(uploadError);
                return;
            }

            const { data: avatarData } = supabase.storage.from("profile").getPublicUrl(fileName);

            // true update
            updatedFields.avatar = avatarData.publicUrl;
            setProfileImg(avatarData.publicUrl);
        }

        if (nickname) updatedFields.nickname = nickname;
        if (introduction) updatedFields.introduction = introduction;

        const updatedData = {
            ...me.userTableInfo,
            ...updatedFields,
        };

        const { data, error: updateError } = await supabase.from("users").upsert(updatedData).select();

        if (updateError) {
            console.error(updateError);
            return;
        }

        // true update
        setProfileImg(data[0].avatar);
        setNickname(data[0].nickname);
        setIntroduction(data[0].introduction);

        console.log("User updated =>>>", data);
    };

    // useEffect(() => {
    //     console.log(me);
    // }, [me]);

    return (
        <div className="max-w-md mx-auto bg-white h-[138px]">
            {/* 헤더 섹션 */}
            <div className="bg-[#B7E6CB] h-[138px] flex items-center justify-between">
                <div className="flex-grow text-center">
                    <div className="font-semibold text-2xl text-[#ffffff]">God Life Mate</div>
                </div>
            </div>
            {/* submit form 시작 */}
            {/* 프로필 섹션 */}
            <form onSubmit={handleUpdateSubmit}>
                <div>
                    <div className="flex justify-end mt-6 px-4">
                        <button type="submit" className="cursor-pointer">
                            <Image src="/update_btn_2.svg" alt="update button" width={93} height={32} />
                        </button>
                    </div>
                    <div className="flex flex-col items-center mt-10 mb-10 cursor-pointer">
                        <div className="relative">
                            <div className="rounded-full flex items-center justify-center">
                                <input type="file" accept="image/*" onChange={handleImgChange} />
                                <div className="rounded-full w-[96px] h-[96px] overflow-hidden">
                                    <Image
                                        src={profileImg}
                                        alt="profile camera icon"
                                        width={96}
                                        height={96}
                                        className="rounded-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 입력 섹션 */}
                <div className="px-4 mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">닉네임</label>
                        <input
                            type="text"
                            placeholder="nickname"
                            value={nickname ?? ""}
                            onChange={(e) => setNickname(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B7E6CB] focus:border-[#B7E6CB] sm:text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">자기소개</label>
                        <textarea
                            value={introduction ?? ""}
                            onChange={(e) => setIntroduction(e.target.value)}
                            placeholder="자기소개 글입니다."
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#B7E6CB] focus:border-[#B7E6CB] sm:text-sm"
                        ></textarea>
                    </div>
                </div>
            </form>
            {/* submit form 끝 */}

            {/* 바닥 아이콘 섹션 */}
            <div className="flex justify-center mt-20 mb-4">
                <Image src="/turtle.svg" alt="turtle icon" width={70} height={70} />
            </div>
        </div>
    );
};

export default ProfilePage;
