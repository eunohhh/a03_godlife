"use client";

import React from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth.context";
import { showAlert } from "@/lib/openCustomAlert";

interface CheerupProps {
  postId: number;
}

// 좋아요 상태를 가져오는 함수
const fetchCheerupStatus = async (postId: number): Promise<number> => {
  const response = await fetch(`/api/cheerup?postId=${postId}`);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data.length;
};

// 좋아요 상태를 변경하는 함수
const updateCheerupStatus = async ({
  postId,
  isCheeruped,
}: {
  postId: number;
  isCheeruped: boolean;
}): Promise<void> => {
  const response = await fetch(`/api/cheerup`, {
    method: "POST",
    headers: {
      "Content-Type": "",
    },
    body: JSON.stringify({ postId, isCheeruped }),
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
};

const CheerupButton: React.FC<CheerupProps> = ({ postId }) => {
  const { me } = useAuth();
  console.log(me);
  const queryClient = useQueryClient();

  // 좋아요 상태를 가져오는 useQuery
  const { data: cheerupCount = 0, isLoading } = useQuery<number>({
    queryKey: ["cheerupStatus", postId],
    queryFn: () => fetchCheerupStatus(postId),
    // staleTime: 300000,
  });

  const isCheeruped = cheerupCount > 0;

  // 좋아요 상태를 변경하는 useMutation
  const { mutate: likeToggle } = useMutation<
    void,
    Error,
    { postId: number; isCheeruped: boolean }
  >({
    mutationFn: ({ postId, isCheeruped }) =>
      updateCheerupStatus({ postId, isCheeruped }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cheerupStatus", postId] });
    },
  });

  const handleCheerup = () => {
    likeToggle({ postId, isCheeruped });
    showAlert("success", "열정 활활!");
  };

  // const handleCheerup = () => {
  //   if (isCheeruped) {
  //     likeToggle({ postId, isCheeruped: false });
  //     showAlert("error", "좋아요를 취소했습니다.");
  //   } else {
  //     likeToggle({ postId, isCheeruped: true });
  //     showAlert("success", "열정 활활!");
  //   }
  // };

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
