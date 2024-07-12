import { Post } from "@/types/post.type";
import { QueryFunctionContext } from "@tanstack/react-query";

export async function getInfinitePosts({
    pageParam = 0,
}: QueryFunctionContext<string[], number>): Promise<Post[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${pageParam}`, {
        method: "GET",
        next: {
            tags: ["postsInfinite"],
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("fetch 실패");
    }

    const data = await response.json();
    return data;
}
