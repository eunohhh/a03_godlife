"use client";

import supabase from "@/supabase/client";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/Separator";
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

export function MainPost() {
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
    <div className="flex flex-col w-full max-w-[428px] p-2 my-2">
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

export default MainPost;
