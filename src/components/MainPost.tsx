"use client";

import { getInfinitePosts } from "@/api/getInfinitePosts";
import { Post } from "@/types/post.type";
import { usePostStore } from "@/zustand/post.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import BasicLoader from "./ui/BasicLoader";
import InfiniteScroll from "./ui/InfiniteScroll";
import PostCard from "./ui/PostCard";

export function MainPost() {
    const { sortBy } = usePostStore((state) => ({
        sortBy: state.sortBy,
    }));

    const {
        data: posts = [],
        isFetching,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ["postsInfinite"],
        initialPageParam: 5,
        getNextPageParam: (lastPage: Post[], allPages: Post[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length;
        },
        queryFn: getInfinitePosts,
        select: (data) => data.pages.flat(),
    });

    const [sortedPosts, setSortedPosts] = useState<Post[]>(posts);

    useEffect(() => {
        if (!posts) return;

        const copiedPosts = [...posts];

        if (sortBy === "latest") {
            copiedPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setSortedPosts(copiedPosts);
        } else if (sortBy === "popular") {
            copiedPosts.sort((a, b) => (b.likecount as number) - (a.likecount as number));
            setSortedPosts(copiedPosts);
        }
    }, [posts, sortBy]);

    return (
        <div className="flex flex-col w-full max-w-[428px] p-2">
            <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={hasNextPage}>
                <div className="space-y-3">
                    {sortedPosts.map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                    {isFetching && <BasicLoader isSmall={true} />}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default MainPost;

{
    /* <div key={post.id} className="post-card max-h-[200px] bg-white rounded-lg p-5">
    <div className="flex flex-row">
        <Avatar className="flex">
            <AvatarImage src={post.avatar as string} alt="@profile" />
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
</div> */
}
