"use client";

import PostCard from "@/components/ui/PostCard";
import { useAuth } from "@/context/auth.context";
import supabase from "@/supabase/client";
import { Post } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfilePage() {
  const { me } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!me) return;
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("email", me?.userTableInfo.email);

        if (error) throw error;
        setPosts(data as Post[]);
      } catch (error) {
        console.error("Error fetching posts:", (error as Error).message);
      }
    }
    fetchPosts();
  }, [me]);

  // console.log(posts);

  // max-w-md
  return (
    <div
      className="max-w-[428px] mx-auto bg-white h-[138px] relative"
      // style={{ height: "428px" }}
    >
      {/* 헤더 섹션 */}
      <div className="bg-[#B7E6CB] h-full flex items-center justify-center">
        <div className="font-MangoByeolbyeol text-2xl text-white">
          God Life Mate
        </div>
      </div>

      {/* 자기소개 섹션 */}
      <div className="flex justify-between px-4 py-2 border-b height-[150px] relative -top-11 pb-4">
        <div className="flex w-[50%] items-center relative">
          {/* 프로필 이미지 */}
          <div className="ml-[10px]">
            <div className="w-[68px] h-[68px] rounded-full overflow-hidden">
              <Image
                className="object-contain"

                src={me?.userTableInfo.avatar as string}
                alt="profile"
                width={68}
                height={68}
                priority
              />
             </div>

            <div className="font-bold text-lg">
              {me?.userTableInfo.nickname}
            </div>
            <div className="text-gray-600">
              {me?.userTableInfo.introduction}
            </div>
            <div className="text-gray-600">{me?.userTableInfo.email}</div>
          </div>
        </div>
        {/* 프로필 수정 버튼 */}
        <div className="w-[50%] flex flex-col justify-end items-end gap-1">
          <Link href={"/write"}>
            <button className="w-[93px] h-[32px] bg-transparent text-[#B7E6CB] text-sm font-semi-bold py-1 px-3 border-[1.3px] border-[#B7E6CB] rounded-full transition duration-300 ease-in-out flex items-center justify-center hover:bg-[#B7E6CB] hover:text-white">
              write
            </button>
          </Link>
          <Link href="/profileupdate">
            <button className="w-[93px] h-[32px] bg-transparent text-[#B7E6CB] text-sm font-semi-bold py-1 px-3 border-[1.3px] border-[#B7E6CB] rounded-full transition duration-300 ease-in-out flex items-center justify-center hover:bg-[#B7E6CB] hover:text-white">
              Edit profile
            </button>
          </Link>
        </div>
      </div> 

      {/* supabase 데이터 불러오는 로직 */}
      <div className="space-y-3 font-Pretendard-Regular">
        {posts.length === 0 && (
          <div className="text-center">내가 쓴 글이 없습니다!</div>
        )}
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
