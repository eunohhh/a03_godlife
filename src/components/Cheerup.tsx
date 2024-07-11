"use client";

import React from "react";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth.context";
import { showAlert } from "@/lib/openCustomAlert";

interface CheerupProps {
  postId: number;
}
// Add this interface definition
// CheerupStatus 인터페이스를 정의하지 않았기 때문에 오류가 발생했다고 해서 추가
interface CheerupStatus {
  id: string;
  postid: string;
  userid: string;
}

// 좋아요 상태를 가져오는 함수
// const fetchCheerupStatus = async (postId: number): Promise<number> => {
//   const response = await fetch(`/api/cheerup?postId=${postId}`);
//   const data = await response.json();
//   if (data.error) {
//     throw new Error(data.error);
//   }
//   return data.length;
// };

const fetchCheerupStatus = async (
  postId: number
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
  postId: number;
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

/**
 * 1. 게시물당 좋아요 데이터를 가져온다
 * 2. 좋아요 개수 & 좋아요 여부를 체크한다
 *    - 좋아요 개수만 가지고 오는 API를 만든다
 *    - 내가 좋아요를 했는지 여부를 API로 가져온다
 *    - 일단 한 번에
 * 3. 좋아요를 눌렀을 때
 *    - 내가 누른 적이 없다면, 좋아요를 추가한다
 *    - 내가 누른 적이 있다면, 좋아요를 삭제한다
 */

const CheerupButton: React.FC<CheerupProps> = ({ postId }) => {
  const { me } = useAuth();
  const queryClient = useQueryClient();

  // 좋아요 상태를 가져오는 useQuery
  // 1. 좋아요 개수만 있기 때문에 내가 좋아요를 눌렀는지 아닌지에 대한 데이터를 가져와야 한다.
  // const { data: cheerupCount = 0, isLoading } = useQuery<number>({
  //   queryKey: ["cheerupStatus", postId],
  //   queryFn: () => fetchCheerupStatus(postId),
  //   // staleTime: 300000,
  // });

  const { data, isLoading } = useQuery({
    queryKey: ["cheerupStatus", postId],
    queryFn: async () => await fetchCheerupStatus(postId),
  });

  // 2. isCheeruped(원래 의도: 내가 좋아요를 했는지)는 좋아요 개수가 0보다 큰지로 판단 => X
  // const isCheeruped = cheerupCount > 0;
  const cheerupCount = data?.length || 0;
  // TODO: 내가 좋아요를 누른 적이 있는지
  const isCheeruped = data?.find((item) => item.userid === me?.id)
    ? true
    : false;

  // 좋아요 상태를 변경하는 useMutation
  const { mutate: likeToggle } = useMutation<
    void,
    Error,
    { postId: number; isCheeruped: boolean; userId: string }
  >({
    mutationFn: async ({ postId, isCheeruped, userId }) =>
      await updateCheerupStatus({ postId, isCheeruped, userId }),
    onSuccess: () => {
      // 3. invalidateQueries => 쿼리키가 같은 useQuery를 무효화한다 -> 다시 요청함
      queryClient.invalidateQueries({ queryKey: ["cheerupStatus", postId] });
    },
  });

  // const handleCheerup = () => {
  //   likeToggle({ postId, isCheeruped });
  //   showAlert("success", "열정 활활!");
  // };

  const handleCheerup = () => {
    if (!me) {
      showAlert("error", "로그인이 필요합니다.");
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
