// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import supabase, { createClient } from "@/supabase/client";

// asyncs function getPost()

// async function addPost() {
//   const { data, error } = await supabase<Post>().from("posts").select("*");

//   if (error instanceof Error) {
//     console.error(error);
//   }
// }

// export default function CreateOrEditForm() {
//   const [content, setContent] = useState("");

//   // useEffect(() => {
//   //   const fetchPosts = async () => {
//   //     const { data, error } = await supabase
//   //       .from('posts')
//   //       .select("*")
//   //   }
//   //   fetchPosts();
//   // }, [])

//   const handleChange = (e: any) => {
//     setContent(e.target.value);
//     console.log(content);

//     if (content.length > 280) {
//       return alert("게시글은 280자 미만으로 입력해주세요.");
//     }
//   };

//   return (
//     <form className="bg-white p-6 pt-[60px] rounded-lg shadow-lg w-full max-w-[428px] min-h-[860px] flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <Link
//           href="/"
//           className="text-turtleGreen hover:text-green-700 cursor-pointer w-[67px] h-[34px]"
//         >
//           Cancel
//         </Link>
//         <Image
//           src="/post_btn.svg"
//           alt="Post"
//           width={67}
//           height={34}
//           className="cursor-pointer"
//         />
//       </div>
//       <textarea
//         className="w-full p-2 mb-4 border-none outline-none resize-none flex-grow"
//         placeholder="무슨 일이 일어나고 있나요?"
//         maxLength={280}
//         value={content}
//         onChange={handleChange}
//       ></textarea>
//       <Image
//         src="/big_logo.svg"
//         alt="logo"
//         width={100}
//         height={100}
//         className="mx-auto my-0"
//       />
//       <div className="flex justify-between items-center mt-8">
//         <div className="text-turtleGreen">{content.length}/280</div>
//         <Image
//           src="/Image_upload_btn.svg"
//           alt="Image Uploader"
//           width={67}
//           height={34}
//           className="cursor-pointer"
//         />
//       </div>
//     </form>
//   );
// }
