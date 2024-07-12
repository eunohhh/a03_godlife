import supabase from "@/supabase/client";

// const addPost = async () => {
//   if (!me) return;
//   const { error } = await supabase.from("posts").insert([
//     {
//       contents: contents,
//       nickname: me.userTableInfo.nickname,
//       email: me.userTableInfo.email,
//       avatar: me.userTableInfo.avatar,
//     },
//   ]);

//   if (error instanceof Error) {
//     console.error(error.message);
//   } else {
//     return showAlert("success", "게시물이 등록되었습니다.", () =>
//       router.push("/")
//     );
//   }
// };

export const deletePost = async (id: string) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  if (error instanceof Error) {
    console.error(error.message);
    return false;
  }

  if (data) return true;

  // 해당 사용자가 맞는지 확인하는 validation 필요
  // 삭제 원하는지 확인하는 validation 필요
};
// 성공 실패 여부를 트루 펄스로 리턴하게 isSuccess -> reload, 재렌더링 등 최신화 되는 로직에 사용

// export deletePost;
