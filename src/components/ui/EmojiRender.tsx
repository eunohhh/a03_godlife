import React, { useState } from "react";
import EmojiSelector from "./EmojiSelector";

export default function HomePageView() {
  const [text, setText] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="mt-20 mx-auto bg-zinc-200 w-full max-w-2xl p-6 rounded-xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">
          Welcome to the Next.js Emoji Selector!
        </h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter some text</span>
          </label>
          <textarea
            className="textarea h-24 textarea-bordered textarea-lg"
            placeholder="Enter some text"
            value={text}
            onChange={handleChange}
          />
        </div>

        <EmojiSelector setter={setText} />
      </div>
    </>
  );
}
