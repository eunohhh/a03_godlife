import Image from "next/image";
import Link from "next/link";

export default function WritingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form className="bg-white p-6 pt-[60px] rounded-lg shadow-lg w-full max-w-[428px] min-h-[860px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <Link
            href="/"
            className="text-turtleGreen hover:text-green-700 cursor-pointer w-[67px] h-[34px]"
          >
            Cancel
          </Link>
          <Image
            src="/post_btn.svg"
            alt="Post"
            width={67}
            height={34}
            className=" hover:bg-green-700 cursor-pointer"
          />
        </div>
        <textarea
          className="w-full p-2 mb-4 border-none outline-none resize-none flex-grow"
          placeholder="무슨 일이 일어나고 있나요?"
        ></textarea>
        <Image src="/big_logo.svg" alt="logo" width={100} height={100} className="mx-auto my-0" />
        <div className="flex justify-between items-center mt-4">
          <div className="text-turtleGreen">{0}/280</div>
          <Image
            src="/Image_upload_btn.svg"
            alt="Image Uploader"
            width={67}
            height={34}
            className=" hover:bg-green-700 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}
