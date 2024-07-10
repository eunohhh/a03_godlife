import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { emojis } from "@/data/emojis";

interface Props {
  setter: Dispatch<SetStateAction<string>>;
}

export default function EmojiSelector(props: Props) {
  const { setter } = props;
  const [displayEmoji, setDisplayEmoji] = useState<string>(emojis[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDisplayEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const handleClick = (emoji: string) => {
    setIsOpen(false);
    setter((old) => old + ` ${emoji}`);
  };

  return (
    <div className="collapse bg-base-200 collapse-arrow">
      <input
        type="checkbox"
        checked={isOpen}
        onChange={() => setIsOpen(!isOpen)}
      />
      <div className="collapse-title text-xl font-medium">{displayEmoji}</div>
      <div className="collapse-content text-4xl grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            className="hover:scale-125 transition-transform ease-in-out duration-200 p-4"
            onClick={() => handleClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
