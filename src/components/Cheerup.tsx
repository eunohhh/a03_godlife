// src/app/(root)/cheerup.tsx 쿼리 사용한 에러가득 코드

"use client";

import React from "react";
import Image from "next/image";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import supabase from "@/supabase/client";

interface CheerupProps {
  postId: number;
}

// 좋아요 상태를 가져오는 함수
const fetchCheerupStatus = async (postId: number): Promise<number> => {
  const { data, error } = await supabase
    .from("cheerup")
    .select("id")
    .eq("postid", postId);

  if (error) {
    throw new Error(error.message);
  }

  return data.length; // 좋아요 개수를 반환
};

// 좋아요 상태를 변경하는 함수
const handleCheerupToggle = async ({
  postId,
  isCheeruped,
}: {
  postId: number;
  isCheeruped: boolean;
}): Promise<void> => {
  if (isCheeruped) {
    const { error } = await supabase
      .from("cheerup")
      .delete()
      .eq("postid", postId);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("cheerup")
      .insert([{ postid: postId }]);

    if (error) {
      throw new Error(error.message);
    }
  }
};

const CheerupButton: React.FC<CheerupProps> = ({ postId }) => {
  const queryClient = useQueryClient();

  // 좋아요 상태를 가져오는 useQuery
  const { data: cheerupCount = 0, isLoading } = useQuery<number>({
    queryKey: ["cheerupStatus", postId],
    queryFn: () => fetchCheerupStatus(postId),
    staleTime: 300000,
  });

  const isCheeruped = cheerupCount > 0;

  // 좋아요 상태를 변경하는 useMutation
  // const likeMutation = useMutation<
  //  void,
  //  Error,
  //   { postId: number; isCheeruped: boolean }
  //>({
  //  mutationFn: ({ postId, isCheeruped }) => handleCheerupToggle({ postId, isCheeruped }),
  //  onSuccess: () => {
  //  queryClient.invalidateQueries(['cheerupStatus', postId]);
  //  }
  // })

  // const mutation = useMutation<
  //   void,
  //   Error,
  //   { postId: number; isCheeruped: boolean }
  // >({
  //   mutationFn: ({ postId, isCheeruped }) =>
  //     handleCheerupToggle({ postId, isCheeruped }),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cheerupStatus", postId] });
  //   },
  // });

  const { mutate: likeToggle } = useMutation<
    void,
    Error,
    { postId: number; isCheeruped: boolean }
  >({
    mutationFn: ({ postId, isCheeruped }) => {
      return handleCheerupToggle({ postId, isCheeruped });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cheerupStatus", postId] }); // 데이터 갱신
    },
  });

  // const mutation = useMutation<
  //   void,
  //   Error,
  //   { postId: number; isCheeruped: boolean }
  // >(({ postId, isCheeruped }) => handleCheerupToggle({ postId, isCheeruped }), {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["cheerupStatus", postId] }); // 데이터 갱신
  //   },
  // } as UseMutationOptions<void, Error, { postId: number; isCheeruped: boolean }>);

  const handleCheerup = () => {
    likeToggle({ postId, isCheeruped });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="justify-end flex w-full">
      <button onClick={handleCheerup} className="flex items-center text-3xl">
        <Image
          src="/fire_btn.svg"
          alt="backbtn"
          width={18}
          height={18}
          className="cursor-pointer"
        />
        <span className="ml-2 text-[18px]">
          {cheerupCount.toLocaleString()}
        </span>
      </button>
    </div>
  );
};

export default CheerupButton;
