import type { PostgrestResponse } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import { ITEMS_PER_PAGE } from "@/constants/constants";
import { createClient } from "@/supabase/server";
import type { Post } from "@/types/post.type";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const pageString = searchParams.get("page");

	if (pageString) {
		const supabase = await createClient();
		const page = Number(pageString);
		// 여기가 페이지네이션 하는 부분
		const start = page * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE - 1;

		const { data, error }: PostgrestResponse<Post> = await supabase
			.from("posts")
			.select("*")
			.order("created_at", { ascending: false }) // 생성일 정렬
			.range(start, end); // 데이터 범위 설정

		if (error) {
			return new NextResponse(JSON.stringify(error.message), { status: 401 });
		}

		return new NextResponse(JSON.stringify(data), { status: 200 });
	}

	return new NextResponse(JSON.stringify({ data: "파라미터 누락" }), {
		status: 401,
	});
}
