"use client";

import useAuth from "@/hooks/useAuth";
import { showAlert } from "@/lib/openCustomAlert";
import supabase from "@/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WritingPage() {
    const [contents, setContents] = useState("");
    const { me } = useAuth();
    const queryClient = useQueryClient();

    // const { data, isPending: userIsPending, error: userError } = useMeQuery();
    // const me = data?.userTableInfo;

    const router = useRouter();

    const handleContentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContents(e.target.value);

        if (contents.length > 280) {
            return showAlert("caution", "게시글은 280자 미만으로 입력해주세요.");
        }
    };

    const addPost = async () => {
        if (!me) return;
        const { error } = await supabase.from("posts").insert([
            {
                contents: contents,
                nickname: me.nickname,
                email: me.email,
                avatar: me.avatar,
            },
        ]);

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            return showAlert("success", "게시물이 등록되었어요!", () => router.push("/"));
        }
    };

    const handlePostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!contents) {
            return showAlert("caution", "게시글을 입력해주세요.");
        }

        addPost();
        queryClient.invalidateQueries({ queryKey: ["postsInfinite"] });
    };

    //min-h-[860px]
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 font-Pretendard-Regular">
            <form
                onSubmit={handlePostSubmit}
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
                        Post
                    </button>
                </div>
                <textarea
                    className="w-full p-2 mb-4 border-none outline-none resize-none flex-grow"
                    placeholder="무슨 일이 일어나고 있나요?"
                    maxLength={280}
                    onChange={handleContentsChange}
                ></textarea>
                <div className="flex justify-between items-center mt-4 mb-4">
                    <div className="text-turtleGreen font-semi-bold">{contents.length}/280</div>
                    <Image src="/turtle.svg" alt="logo" width={60} height={60} />
                </div>
            </form>
        </div>
    );
}
