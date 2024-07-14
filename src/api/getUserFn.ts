import { cookies } from "next/headers";
import { Me } from "./../types/me.type";

export async function getUserFn(): Promise<Me | null> {
    const cookieStore = cookies();
    const cookiesArray = cookieStore.getAll();

    // console.log("cookiesArray ====>", cookiesArray);

    // 여기 정말 중요!!!!!!! 쿠키를 fetch 할때 같이 보내줘야 getUser가 동작함!!!!
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
        method: "GET",
        next: {
            tags: ["user"],
        },
        cache: "no-store",
        headers: {
            Cookie: cookiesArray.map((cookie) => `${cookie.name}=${cookie.value}`).join(";"),
        },
    });

    if (!response.ok) {
        const error = await response.json();

        const message = error.data.user;
        if (message === "Auth session missing!") {
            // console.log("실패??????????", message);
            return null;
        }
        // throw new Error("fetch 실패");
    }

    const data = await response.json();

    const me = data.data.user;

    // console.log("fetch 결과 ====>", me);

    return me;
}
