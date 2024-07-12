import supabase from "@/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const deletePost = async (id: string) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);
  // 해당 사용자가 맞는지 확인하는 validation 필요
  // 삭제 원하는지 확인하는 validation 필요
};
// 성공 실패 여부를 트루 펄스로 리턴하게 isSuccess -> reload 등 최신화 되는 로직에 사용

// export deletePost;
