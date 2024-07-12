import { getInfinitePosts } from "@/api/getInfinitePosts";
import MainPost from "@/components/MainPost";
import CenterLogo from "@/components/ui/CenterLogo";
import { DropdownMenuCheckboxes } from "@/components/ui/Checkbox";
import SidebarComponent from "@/components/ui/SidebarComponent";
import TopButton from "@/components/ui/TopButton";
import { Post } from "@/types/post.type";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

async function MainPage() {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["postsInfinite"],
        initialPageParam: 0,
        getNextPageParam: (lastPage: Post[], allPages: Post[][]) => {
            if (lastPage.length === 0) return null;
            return allPages.length;
        },
        queryFn: getInfinitePosts,
        pages: 1, // 설정한 페이지 단위 중 첫 1페이지만 가져옴
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <div className="bg-turtleGreen w-[428px]">
                <div className="flex flex-row justify-between px-2 my-5">
                    <SidebarComponent />

                    <CenterLogo />

                    <DropdownMenuCheckboxes />
                </div>
            </div>

            <MainPost />

            <TopButton />
        </HydrationBoundary>
    );
}

export default MainPage;
