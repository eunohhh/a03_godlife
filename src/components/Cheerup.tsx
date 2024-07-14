"use client";

import { useAuth } from "@/hooks/useAuth";
import { showAlert } from "@/lib/openCustomAlert";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

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
  const isCheeruped = data?.some((item) => item.userid === me?.id) ?? false;

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

  if (isLoading)
    return (
      <div className="justify-end flex w-full h-6 text-gray-100 gap-2">
        <Image
          src="/fire_btn.svg"
          alt="backbtn"
          width={100}
          height={100}
          className="cursor-pointer w-auto h-auto"
        />
        <span className="text-[18px]">...</span>
      </div>
    );

  return (
    <div className="justify-end items-center flex w-full h-6 gap-2">
      <button onClick={handleCheerup} className="flex items-center text-3xl">
        <Image
          src="/fire_btn.svg"
          alt="backbtn"
          width={100}
          height={100}
          className="cursor-pointer w-auto h-auto"
        />
      </button>
      <span className="text-[18px]">{cheerupCount.toLocaleString()}</span>
    </div>
  );
};

export default CheerupButton;
