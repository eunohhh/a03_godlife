import { Post } from "@/types/post.type";

export async function getInfinitePosts({ pageParam = 0 }: { pageParam: number }): Promise<Post[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${pageParam}`, {
        method: "GET",
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("fetch 실패");
    }

    const data = await response.json();
    return data;
}
