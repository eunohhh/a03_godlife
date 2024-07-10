import { createClient } from "@/supabase/server";
import { Me } from "@/types/me.type";
// import { User } from "@supabase/supabase-js";

export default async function serverGetUser(): Promise<Me | null> {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error || !user) {
        console.error(error);
        return null;
    }

    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

    if (userError) {
        console.error(userError);
        return null;
    }

    const response = {
        ...user,
        userTableInfo: userData,
    };

    const me = response || null;

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
