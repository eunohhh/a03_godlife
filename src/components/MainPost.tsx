"use client";

import { getInfinitePosts } from "@/api/getInfinitePosts";
import { Post } from "@/types/post.type";
import { usePostStore } from "@/zustand/post.store";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import BasicLoader from "./ui/BasicLoader";
import InfiniteScroll from "./ui/InfiniteScroll";
import PostCard from "./ui/PostCard";

export function MainPost() {
    const { sortBy } = usePostStore((state) => ({
        sortBy: state.sortBy,
    }));

    const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: ["postsInfinite"],
        initialPageParam: 0, //5
        getNextPageParam: (lastPage: Post[], allPages: Post[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length;
        },
        queryFn: getInfinitePosts,
        select: (data) => data.pages.flat(),
    });
    const posts = data || [];

    const sortedPosts = useMemo(() => {
        const copiedPosts = [...posts];
        if (sortBy === "latest") {
            copiedPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else if (sortBy === "popular") {
            copiedPosts.sort((a, b) => (b.likecount as number) - (a.likecount as number));
        }
        return copiedPosts;
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
