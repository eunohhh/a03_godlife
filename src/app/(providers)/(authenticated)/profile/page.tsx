"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import supabase from "@/supabase/client";
import { Separator } from "@radix-ui/react-separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

// Post 인터페이스 정의
interface Post {
  id: number;
  avatar: string;
  nickname: string;
  email: string;
  contents: string;
  // 필요한 다른 필드들을 여기에 추가
}

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
                src="/profile_btn.svg"
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
      {/* 게시물 섹션
      <div className="p-4 border-t">
        <div className="flex items-center mb-2">
          <div className="bg-green-700 h-10 w-10 rounded-full"></div>
          <div className="ml-2">
            <div className="font-bold">nickname</div>
            <div className="text-gray-600">@email</div>
          </div>
          <div className="ml-auto text-red-500">15</div>
        </div>
        <div className="mb-2">
          돌아봐도 후회 없게 매 순간을 놀러 담아서 오늘을 살아가는 것
        </div>
        <div className="relative">
          {/* 이미지 섹션 */}
      {/* <Image
            src="/edit_profile_btn.svg"
            alt="post image"
            layout="responsive"
            width={500}
            height={300}
            className="w-full h-auto rounded-md"
          />
        </div> */}
      {/* </div> */}
      <div className="space-y-3">
        {posts.map((post: Post) => (
          <div
            key={post.id}
            className="post-card max-h-[200px] bg-white rounded-lg p-5 "
          >
            <div className="flex flex-row">
              <Avatar className="flex">
                <AvatarImage src={post.avatar} alt="@profile" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col card content container ml-5">
                <div className="flex items-center">
                  <h4 className="text-sm font-medium leading-none mr-2">
                    {post.nickname}
                  </h4>
                  <p className="text-sm text-muted-foreground">{post.email}</p>
                </div>
                <Separator className="my-4 border-black" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <p>{post.contents}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
