"use client";

import useMeQuery from "@/hooks/useMeQuery";
import { editPost } from "@/lib/editPost";
import { showAlert } from "@/lib/openCustomAlert";
import supabase from "@/supabase/client";
import { Post } from "@/types/post.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditingPage({ params }: { params: { id: string } }) {
  console.log(params);
  const [contents, setContents] = useState("");
  const [post, setPost] = useState<Post[] | null>(null);
  // const { me } = useAuth();

  const { data, isPending: userIsPending, error: userError } = useMeQuery();
  const me = data?.userTableInfo;
  const router = useRouter();

  useEffect(() => {
    const fetchContents = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .maybeSingle();

      if (error) {
        console.error(error.message);
      } else {
        setPost(data);
        setContents(data.contents);
      }
    };
    fetchContents();
  }, [params.id]);

  const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);

    if (contents.length > 280) {
      return showAlert("caution", "게시글은 280자 미만으로 입력해주세요.");
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contents) {
      return showAlert("caution", "게시글을 입력해주세요.");
    }

    const result = await editPost(params.id, contents);
    if (result) {
      return showAlert("success", "게시물이 수정되었어요!", () =>
        router.push("/profile")
      );
    } else {
      return showAlert("error", "앗! 게시물 수정에 실패했어요..");
    }
  };

  //min-h-[860px]
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleEditSubmit}
        className="bg-white p-6 pt-[60px] rounded-lg shadow-lg w-full max-w-[428px] h-dvh flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.back()}
            type="button"
            className="w-[67px] h-[34px] bg-[#B7E6CB] text-white font-semi-bold text-sm py-0 px-1 rounded-full hover:bg-[#073A33] transition duration-300 ease-in-out flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-[67px] h-[34px] bg-[#B7E6CB] text-white font-semi-bold text-sm py-0 px-1 rounded-full hover:bg-[#073A33] transition duration-300 ease-in-out flex items-center justify-center"
          >
            Edit
          </button>
        </div>
        <textarea
          className="w-full p-2 mb-4 border-none outline-none resize-none flex-grow"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={280}
          onChange={handleContentsChange}
          value={contents}
        ></textarea>
        <div className="flex justify-between items-center mt-4 mb-4">
          <div className="text-turtleGreen font-semi-bold">
            {contents.length}/280
          </div>
          <Image src="/turtle.svg" alt="logo" width={60} height={60} />
        </div>
      </form>
    </div>
  );
}
