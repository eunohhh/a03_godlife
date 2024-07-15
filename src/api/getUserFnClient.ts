import { Me } from "./../types/me.type";

export async function getUserFnClient(): Promise<Me | null> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
        method: "GET",
        // next: {
        //     tags: ["user"],
        // },
        cache: "no-store",
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
