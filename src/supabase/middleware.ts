// import { auth } from "@/auth";
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    // console.log("request 그 자체 =>", request);
    let supabaseResponse = NextResponse.next({
        request,
    });

    // console.log("first supabaseResponse =>", supabaseResponse);

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // console.log("미들웨어에서 유저 =>", user);

    // 유저가 없으면서, api, login, recover 를 제외한 라우트는 무조건 login 으로 리다이렉트
    if (
        !user &&
        request.nextUrl.pathname !== "/" &&
        !request.nextUrl.pathname.startsWith("/api") &&
        !request.nextUrl.pathname.startsWith("/login") &&
        !request.nextUrl.pathname.startsWith("/recover") &&
        !request.nextUrl.pathname.startsWith("/signup")
    ) {
        // no user, potentially respond by redirecting the user to the login page
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 유저가 있으면서, login, recover 를 제외한 라우트는 무조건 홈으로 리다이렉트
    if (
        (request.nextUrl.pathname.startsWith("/login") && user) ||
        (request.nextUrl.pathname.startsWith("/recover") && user) ||
        (request.nextUrl.pathname.startsWith("/signup") && user)
    ) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // console.log("last supabaseResponse =>", supabaseResponse);

    return supabaseResponse;
}
