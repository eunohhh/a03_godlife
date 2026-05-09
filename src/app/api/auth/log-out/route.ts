import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function DELETE() {
	const supabase = await createClient();

	await supabase.auth.signOut();

	return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
