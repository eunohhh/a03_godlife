import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.json();
    const email = data.email as string;
    const password = data.password as string;

    const supabase = createClient();

    const {
        data: { user },
        error,
    } = await supabase.auth.signUp({ email, password });

    if (error) {
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
}
