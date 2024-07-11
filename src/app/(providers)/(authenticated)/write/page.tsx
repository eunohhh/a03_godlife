"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/auth.context";
import supabase from "@/supabase/client";
import { useRouter } from "next/navigation";
// import { showAlert } from "@/lib/openCustomAlert";

export default function WritingPage() {
  const [content, setContent] = useState("");
  const { me } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (content.length > 280) {
      return alert("게시글은 280자 미만으로 입력해주세요.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!me) return;

    if (!content) {
      return alert("게시글을 먼저 입력해주세요.");
      // return showAlert("success", "게시글을 먼저 입력해주세요.")
    }
    
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    // me를 어떻게 가져올깡...?
    console.log(me);

    const email = session?.user.email;
    const userId = session?.user.id;

    const { data, error: postError } = await supabase
      .from("posts")
      .insert([{ content, nickname: me.userTableInfo.nickname, email: me.userTableInfo.email }]);

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      router.push("/write");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 pt-[60px] rounded-lg shadow-lg w-full max-w-[428px] min-h-[860px] flex flex-col"
      >
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="text-turtleGreen hover:text-green-700 cursor-pointer w-[67px] h-[34px]"
          >
            Cancel
          </Link>
          {/* <Image
            src="/post_btn.svg"
            alt="Post"
            width={67}
            height={34}
            className="cursor-pointer"
          />           */}
          <button type="submit">
            <Image
              src="/post_btn.svg"
              alt="Post"
              width={67}
              height={34}
              className="cursor-pointer"
            />
          </button>
        </div>
        <textarea
          className="w-full p-2 mb-4 border-none outline-none resize-none flex-grow"
          placeholder="무슨 일이 일어나고 있나요?"
          maxLength={280}
          onChange={handleChange}
        ></textarea>
        <Image
          src="/big_logo.svg"
          alt="logo"
          width={100}
          height={100}
          className="mx-auto my-0"
        />
        <div className="flex justify-between items-center mt-8">
          <div className="text-turtleGreen">{content.length}/280</div>
          <Image
            src="/Image_upload_btn.svg"
            alt="Image Uploader"
            width={67}
            height={34}
            className="cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
