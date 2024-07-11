import { Post } from "@/types/post.type";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { format } from "date-fns";
import { Separator } from "./Separator";
import CheerupButton from "../Cheerup";

function PostCard({ post }: { post: Post }) {
    return (
        <div className="post-card max-h-[200px] bg-white rounded-lg p-5 ">
            <div className="flex flex-row">
                <Avatar className="flex">
                    <AvatarImage src={post.avatar!} alt="@profile" />
                    <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div className="flex flex-col card content container ml-5">
                    <div className="flex items-center">
                        <h4 className="text-sm font-medium leading-none mr-2">
                            {post.nickname}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {post.email}
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(post.created_at), "yyyy-MM-dd HH:mm")}
                    </p>
                    <Separator className="my-4 border-black" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <p>{post.contents}</p>
                    </div>
                    <CheerupButton postId={post.id} />
                </div>
            </div>
        </div>
    );
}

export default PostCard;
