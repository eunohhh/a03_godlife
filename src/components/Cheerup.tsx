// src/app/(root)/cheerup.tsx

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import supabase from "@/supabase/client";

interface CheerupProps {
  postId: number;
}

const CheerupButton: React.FC<CheerupProps> = ({ postId }) => {
  const [isCheeruped, setIsCheeruped] = useState(false);
  const [cheerupCount, setCheerupCount] = useState(0);

  useEffect(() => {
    fetchCheerupStatus();
  }, [postId]);

  const fetchCheerupStatus = async () => {
    try {
      const { data, error } = await supabase
        .from("cheerup")
        .select("id")
        .eq("postid", postId);

      if (error) {
        throw error;
      }

      setIsCheeruped(data.length > 0);
      setCheerupCount(data.length);
    } catch (error) {
      console.error("Error fetching cheerup status:", error);
    }
  };

  const handleCheerup = async () => {
    try {
      if (isCheeruped) {
        const { error } = await supabase
          .from("cheerup")
          .delete()
          .eq("postid", postId);

        if (error) {
          throw error;
        }

        setCheerupCount((prevCount) => prevCount - 1);
      } else {
        const { data, error } = await supabase
          .from("cheerup")
          .insert([{ postid: postId }]);

        if (error) {
          throw error;
        }

        setCheerupCount((prevCount) => prevCount + 1);
      }

      setIsCheeruped(!isCheeruped);
    } catch (error) {
      console.error("Error handling cheerup:", error);
    }
  };

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
