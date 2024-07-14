import { getInfinitePosts } from "@/api/getInfinitePosts";
import { getUserFn } from "@/api/getUserFn";
import MainPost from "@/components/MainPost";
import CenterLogo from "@/components/ui/CenterLogo";
import { DropdownMenuCheckboxes } from "@/components/ui/Checkbox";
import SidebarComponent from "@/components/ui/SidebarComponent";
import TopButton from "@/components/ui/TopButton";
import { Post } from "@/types/post.type";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import Loading from "./loading";

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

    await queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: () => getUserFn(),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <>
            {/* <MainHeader /> */}
            <Suspense fallback={<Loading />}>
                <HydrationBoundary state={dehydratedState}>
                    <div className="bg-turtleGreen max-w-[428px] p-2">
                        <div className="flex flex-row justify-between px-2">
                            <SidebarComponent />

                            <CenterLogo />

                            <DropdownMenuCheckboxes />
                        </div>
                    </div>

                    <MainPost />
                </HydrationBoundary>
            </Suspense>
            <TopButton />
        </>
    );
}

export default MainPage;
