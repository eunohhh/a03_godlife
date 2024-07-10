//Request 타입에 user 정보가 없어서 에러가 나고 있어서 수정해야합니다

import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { nickname, avatar, introduction } = await request.json();
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      nickname,
      avatar,
      introduction,
    })
    .eq("id", request.user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
