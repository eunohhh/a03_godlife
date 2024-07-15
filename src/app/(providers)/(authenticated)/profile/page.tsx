"use client";

import BasicLoader from "@/components/ui/BasicLoader";
import PostCard from "@/components/ui/PostCard";
import useMeQuery from "@/hooks/useMeQuery";
import supabase from "@/supabase/client";
import { Post } from "@/types/post.type";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ProfilePage() {
  // const { me } = useAuth();

  const { data, isPending: userIsPending, error: userError } = useMeQuery();
  const me = data?.userTableInfo;

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (!me) return;
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("email", me?.email);

        if (error) throw error;
        setPosts(data as Post[]);
      } catch (error) {
        console.error("Error fetching posts:", (error as Error).message);
      }
    }
    fetchPosts();
  }, [me]);

  return (
    <div className="max-w-[428px] mx-auto bg-white h-[138px] relative">
      {/* 헤더 섹션 */}
      <div className="bg-[#B7E6CB] h-full flex items-center justify-center">
        <Link href={"/"}>
          <div className="font-MangoByeolbyeol text-2xl text-white">
            God Life Mate
          </div>
        </Link>
      </div>

      {/* 자기소개 섹션 */}
      <div className="flex justify-between px-4 py-2 border-b relative -top-8 pb-4 font-Pretendard-Regular">
        <div className="w-[50%] items-center relative">
          {/* 프로필 이미지 */}
          <div className="ml-[10px] relative">
            <div className="rounded-full overflow-hidden w-[68px] h-[68px] border-[5px] border-white">
              <Image
                className="object-cover w-full h-full"
                src={me?.avatar as string}
                alt="profile"
                width={68}
                height={68}
                priority
              />
            </div>

            <div className="font-semibold text-lg text-gray-700 mt-2">
              {me?.nickname}
            </div>
            <div className="text-gray-600 text-sm">{me?.introduction}</div>
            <div className="text-gray-600 text-sm">{me?.email}</div>
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
            <button className="w-[93px] h-[32px] bg-transparent text-[#B7E6CB] text-xs font-semi-bold py-1 px-3 border-[1.3px] border-[#B7E6CB] rounded-full transition duration-300 ease-in-out flex items-center justify-center hover:bg-[#B7E6CB] hover:text-white">
              Edit profile
            </button>
          </Link>
        </div>
      </div>

      {/* supabase 데이터 불러오는 로직 */}
      <div className="space-y-3 font-Pretendard-Regular">
        {posts === null && <BasicLoader isSmall={true} />}
        {posts && posts.length === 0 && (
          <div className="text-center">내가 쓴 글이 없습니다!</div>
        )}
        {posts &&
          posts.length > 0 &&
          posts.map((post: Post) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}

export default ProfilePage;
