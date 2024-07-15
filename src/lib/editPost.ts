import supabase from "@/supabase/client";

export const editPost = async (id: string, contents: string) => {
  const { data, error } = await supabase
    .from("posts")
    .update([{ contents }])
    .eq("id", id)
    .select();

  if (error instanceof Error) {
    console.error(error.message);
    return false;
  }

  if (data) {
    console.log("Post 수정 성공 =>", data);
    return true;
  }
};
