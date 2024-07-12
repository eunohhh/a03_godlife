import { createClient } from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  const supabase = createClient();
  const { data, error } = await supabase
    .from("cheerup")
    .select("*")
    .eq("postid", postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  return NextResponse.json(data, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { postId, isCheeruped, userId } = await request.json();

  if (!postId) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  const supabase = createClient();

  if (isCheeruped) {
    const { error } = await supabase
      .from("cheerup")
      .insert([{ postid: postId, userid: userId }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: "Cheerup added" }, { status: 200 });
  } else {
    const { error } = await supabase
      .from("cheerup")
      .delete()
      .eq("postid", postId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: "Cheerup removed" }, { status: 200 });
  }
}
