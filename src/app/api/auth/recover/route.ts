import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { password } = await req.json();

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user }, { status: 200 });
}
