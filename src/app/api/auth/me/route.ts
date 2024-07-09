import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        if (error.message === "Unauthorized")
            return NextResponse.json({ data: "Unauthorized" }, { status: 401 });
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }
    if (!user) {
        return NextResponse.json({ data: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
}
