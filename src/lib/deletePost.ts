import supabase from "@/supabase/client";

export const deletePost = async (id: string) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select();

  if (error instanceof Error) {
    console.error(error.message);
    return false;
  }

  if (data) {
    return true;
  }
};
