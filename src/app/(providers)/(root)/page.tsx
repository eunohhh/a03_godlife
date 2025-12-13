// import { getInfinitePosts } from "@/api/getInfinitePosts";

// import { Post } from "@/types/post.type";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import { getUserFn } from "@/api/getUserFn";
import CenterLogo from "@/components/ui/CenterLogo";
import { DropdownMenuCheckboxes } from "@/components/ui/Checkbox";
import MainPageSection from "@/components/ui/MainPageSection";
import TopButton from "@/components/ui/TopButton";

async function MainPage() {
	const queryClient = new QueryClient();

	// await queryClient.prefetchInfiniteQuery({
	//     queryKey: ["postsInfinite"],
	//     initialPageParam: 0,
	//     getNextPageParam: (lastPage: Post[], allPages: Post[][]) => {
	//         if (lastPage.length === 0) return null;
	//         return allPages.length;
	//     },
	//     queryFn: () => getInfinitePosts({ pageParam: 0 }),
	//     pages: 1, // 설정한 페이지 단위 중 첫 1페이지만 가져옴
	// });

	await queryClient.prefetchQuery({
		queryKey: ["user"],
		queryFn: () => getUserFn(),
	});

	const dehydratedState = dehydrate(queryClient);

	return (
		<>
			<div className="fixed top-0 left-1/2 -translate-x-1/2 w-[428px] flex justify-center items-center py-2">
				<CenterLogo />
				<DropdownMenuCheckboxes />
			</div>
			<HydrationBoundary state={dehydratedState}>
				<MainPageSection />
			</HydrationBoundary>
			<TopButton />
		</>
	);
}

export default MainPage;
