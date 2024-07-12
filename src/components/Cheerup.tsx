"use client";

import React from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth.context";
import { showAlert } from "@/lib/openCustomAlert";
import { useRouter } from "next/navigation";

interface CheerupProps {
  postId: string;
}

interface CheerupStatus {
  id: string;
  postid: string;
  userid: string;
}

// 좋아요 상태를 가져오는 함수
const fetchCheerupStatus = async (
  postId: string
): Promise<CheerupStatus[] | null> => {
  const response = await fetch(`/api/cheerup?postId=${postId}`);
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
  return data;
};

// 좋아요 상태를 변경하는 함수
const updateCheerupStatus = async ({
  postId,
  isCheeruped,
  userId,
}: {
  postId: string;
  isCheeruped: boolean;
  userId: string;
}): Promise<void> => {
  const response = await fetch(`/api/cheerup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ postId, isCheeruped, userId }),
  });
  const data = await response.json();
  if (data.error) {
    throw new Error(data.error);
  }
};

const CheerupButton: React.FC<CheerupProps> = ({ postId }) => {
  const { me } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 좋아요 상태를 가져오는 함수
  const { data, isLoading } = useQuery({
    queryKey: ["cheerupStatus", postId],
    queryFn: async () => await fetchCheerupStatus(postId),
  });

  const cheerupCount = data?.length || 0;
  const isCheeruped = data?.find((item) => item.userid === me?.id)
    ? true
    : false;

  // 좋아요 상태를 변경하는 함수
  const { mutate: likeToggle } = useMutation<
    void,
    Error,
    { postId: string; isCheeruped: boolean; userId: string }
  >({
    mutationFn: async ({ postId, isCheeruped, userId }) =>
      await updateCheerupStatus({ postId, isCheeruped, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cheerupStatus", postId],
      });
    },
  });

  //   const handleCheerup = () => {
  //     if (!me) {
  //       showAlert("error", "로그인이 필요합니다.");
  //       return;
  //     }

  const handleCheerup = () => {
    if (!me) {
      showAlert(
        "error",
        "로그인이 필요합니다.",
        () => router.push("/login"),
        true
      );
      return;
    }

    if (isCheeruped) {
      likeToggle({ postId, isCheeruped: false, userId: me.id });
      showAlert("error", "좋아요를 취소했습니다.");
    } else {
      likeToggle({ postId, isCheeruped: true, userId: me.id });
      showAlert("success", "열정 활활!");
    }
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
