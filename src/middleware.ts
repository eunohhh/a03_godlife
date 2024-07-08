import { updateSession } from "@/supabase/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    // return await updateSession(request);
    // updateSession 미들웨어를 호출하고 결과를 처리
    const updateSessionResponse = await updateSession(request);

    // updateSession 미들웨어가 리다이렉트 등을 발생시키는 경우 즉시 반환
    if (updateSessionResponse instanceof NextResponse) {
        return updateSessionResponse;
    }
    return auth;
}

// export { auth as middleware } from "@/auth";

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
