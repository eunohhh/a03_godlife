"use client";

import PostCard from "@/components/ui/PostCard";
import supabase from "@/supabase/client";
import { Post } from "@/types/post.type";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ProfilePage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const { data, error } = await supabase.from("posts").select("*");

            if (error) throw error;

            // 타입 단언을 사용하여 data를 Post[] 타입으로 처리
            setPosts(data as Post[]);
        } catch (error) {
            console.error("Error fetching posts:", (error as Error).message);
        }
    }

    return (
        <div
            className="max-w-md mx-auto bg-white h-[138px] relative"
            // style={{ height: "428px" }}
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

            {/* 자기소개 섹션 */}
            <div className="flex items-center justify-between px-4 py-2 border-b height-[150px] relative -top-11">
                <div className="flex items-center relative">
                    {/* 프로필 이미지 */}
                    <div className="ml-[10px]">
                        <button>
                            <Image
                                className="w-full h-[68px]"
                                src="/profile_icon_2.svg"
                                alt="profile"
                                width={68}
                                height={68}
                            />
                        </button>
                        <div className="font-bold text-lg">nickname</div>
                        <div className="text-gray-600">자기소개 글입니다.</div>
                        <div className="text-gray-600">@email</div>
                    </div>
                </div>
                {/* 프로필 수정 버튼 */}
                <button>
                    <Image
                        src="/edit_profile_btn.svg"
                        alt="profile"
                        width={93}
                        height={32}
                    />
                </button>
            </div>

            {/* supabase 데이터 불러오는 로직 */}
            <div className="space-y-3">
                {posts.map((post: Post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}

export default ProfilePage;
