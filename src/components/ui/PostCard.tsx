"use client";

import { useAuth } from "@/context/auth.context";
import { Post } from "@/types/post.type";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CheerupButton from "../Cheerup";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Separator } from "./Separator";

function PostCard({ post }: { post: Post }) {
  const { me } = useAuth();
  const pathname = usePathname();

  return (
    <div className="post-card max-h-[200px] bg-white rounded-lg p-5 ">
      <div className="flex flex-row">
        {/* 여기에 수정삭제 */}

        <div>
          {me?.email === post.email && pathname === "/profile" && (
            <div className="flex flex-row">
              {/* 완성되면 edit 로 수정*/}
              <Link href={`/write`}>수정</Link>
              <button>삭제</button>
            </div>
          )}
        </div>

        <Avatar className="flex">
          <AvatarImage src={post.avatar!} alt="@profile" />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
        <div className="flex flex-col card content ml-5 w-full">
          <div className="flex items-center">
            <h4 className="text-sm font-medium leading-none mr-2">
              {post.nickname}
            </h4>
            <p className="text-sm text-muted-foreground">{post.email}</p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {format(new Date(post.created_at), "yyyy-MM-dd HH:mm")}
          </p>
          <Separator className="mt-1 mb-6 border-black" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <p className="text-ellipsis line-clamp-3 overflow-hidden w-[80%]">
              {post.contents}
            </p>
          </div>
          <CheerupButton postId={post.id} />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
