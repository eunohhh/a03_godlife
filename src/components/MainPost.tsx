"use client";

import { format } from "date-fns";
import supabase from "@/supabase/client";
import React from "react";
import { Separator } from "@/components/ui/Separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import CheerupButton from "@/components/Cheerup";

interface Post {
  id: string;
  avatar: string;
  nickname: string;
  email: string;
  contents: string;
  created_at: string;
  likecount: number;
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
      query = query.order("created_at", { ascending: false });
      const { data, error } = await query;
      if (error) throw error;

      if (sortBy === "latest") {
        setPosts(data as Post[]);
      } else if (sortBy === "popular") {
        const supabasecount = await supabase
          .from("cheerup_likes")
          .select("*")
          .order("likecount", { ascending: false });
        if (!supabasecount.data) return;
        const Sorted = supabasecount.data.map((aItem) =>
          data.find((bItem) => bItem.id === aItem.postid)
        );
        console.log(Sorted);
        setPosts(Sorted);
      }
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
            className="post-card max-h-[170px] bg-white rounded-lg p-5"
          >
            <div className="flex flex-row">
              <Avatar className="flex">
                <AvatarImage src={post.avatar} alt="@profile" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col card content container">
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
                <div className="flex h-15 space-x-4 text-sm">
                  <p className="text-ellipsis line-clamp-3 overflow-hidden">
                    {post.contents}
                  </p>
                </div>
              </div>
              <div className="flex place-items-end pb-0 pr-5">
                <CheerupButton postId={post.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
