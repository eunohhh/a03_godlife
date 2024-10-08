import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        // console.log(error);
        return NextResponse.json({ user: null, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ user });
}
