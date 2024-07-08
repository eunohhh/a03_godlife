import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }
    if (!user) {
        return NextResponse.json({ data: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
}
