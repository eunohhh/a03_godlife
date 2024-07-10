import { createClient } from "@/supabase/server";
// import { User } from "@supabase/supabase-js";

export default async function serverGetUser() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const me = user || null;

    return me;

    // try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`);
    //     const { data }: { data: { user: User | string } } = await response.json();

    //     return data.user;
    // } catch (error) {
    //     if (error instanceof Error) {
    //         console.log("Error fetching user:", error.message);
    //         // throw error;
    //     }
    //     throw new Error("Unknown error");
    // }
}
