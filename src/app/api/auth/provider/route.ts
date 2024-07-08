import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider as any,
    });

    if (error) {
        return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    return NextResponse.json(data, { status: 200 });
}
