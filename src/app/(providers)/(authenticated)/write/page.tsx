import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function WritePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[480px] h-[860px]">
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="text-turtleGreen hover:text-green-700 cursor-pointer"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-turtleGreen text-white px-4 py-2 w-[68px] rounded-[14px] hover:bg-green-700 cursor-pointer"
          >
            Post
          </button>
        </div>
        <textarea
          className="w-full p-2 mb-4 border-none outline-none resize-none"
          placeholder="무슨 일이 일어나고 있나요?"
          style={{ height: "calc(100% - 120px)" }}
        ></textarea>
        {/* <Image
            src="/"
            alt="logo"
            width={}
            height={}
        /> */}
        <div className="flex justify-between items-center">
          <div className="text-turtleGreen text-sm">0/280</div>
          <button className="bg-turtleGreen text-white px-4 py-2 w-[68px] rounded-[14px] hover:bg-green-700 cursor-pointer">
            🐢
          </button>
        </div>
      </form>
    </div>
  );
}
