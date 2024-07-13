import supabase from "@/supabase/client";

export const deletePost = async (id: string) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select("*");

  if (error instanceof Error) {
    console.error(error.message);
    return false;
    //   } else {
    //     console.log("Post 삭제 성공 =>", data);
    //     return true;
    // user의 id도 일치 확인해야함 or
  }

  if (data) {
    console.log("Post 삭제 성공 =>", data);
    return true;
  }
};
