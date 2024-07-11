"use client";

import { format } from "date-fns";
import supabase from "@/supabase/client";
import React from "react";
import { Separator } from "@/components/ui/Separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import CheerupButton from "@/components/Cheerup";

interface Post {
  id: number;
  avatar: string;
  nickname: string;
  email: string;
  contents: string;
  created_at: string;
}

interface MainPostProps {
  sortBy: "latest" | "popular";
}

export function MainPost({ sortBy }: MainPostProps) {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  async function fetchPosts() {
    try {
      let query = supabase.from("posts").select("*");

      if (sortBy === "latest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "popular") {
        // 인기순 정렬 로직 (예: cheerup_count 컬럼이 있다고 가정)
        query = query.order("cheerup_count", { ascending: false });
      }

      const { data, error } = await query;

      if (error) throw error;

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
            className="post-card max-h-[200px] bg-white rounded-lg p-5"
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
                <p className="text-xs text-muted-foreground mt-2">
                  {format(new Date(post.created_at), "yyyy-MM-dd HH:mm")}
                </p>
                <Separator className="my-2 border-black" />
                <div className="flex h-5 items-center space-x-4 text-sm">
                  <p>{post.contents}</p>
                </div>
                <CheerupButton postId={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPost;
