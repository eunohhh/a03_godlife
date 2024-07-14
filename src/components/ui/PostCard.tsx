"use client";

import { useAuth } from "@/hooks/useAuth";
import { Post } from "@/types/post.type";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CheerupButton from "../Cheerup";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Separator } from "./Separator";
import { deletePost } from "@/lib/deletePost";
import { showAlert } from "@/lib/openCustomAlert";

function PostCard({ post }: { post: Post }) {
  const { me } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async () => {
    console.log(post.id);

    if (!me) return;
    if (post.email !== me.userTableInfo.email) {
      return showAlert("caution", "게시물 작성자만 삭제할 수 있어요!");
    }

    const isConfirmed = confirm("게시물을 삭제할까요?");
    if (!isConfirmed) return;

    const result = await deletePost(post.id);
    if (result) {
      router.refresh();
      console.log(post.id, "삭제 성공 좀 돼라");
    } else {
      console.log("삭제 실패");
      // 에러 처리
    }
  };

  return (
    <div className="post-card max-h-[200px] bg-white rounded-lg p-5 ">
      <div className="flex flex-row">
        {/* 여기에 수정삭제 */}

        <div>
          {me?.email === post.email && pathname === "/profile" && (
            <div className="flex flex-row">

                {/* 여기에 수정삭제 */}

                <div>
                    {me?.email === post.email && pathname === "/profile" && (
                        <div className="flex flex-row">
                            {/* 완성되면 edit 로 수정*/}
                            <Link href={`/write`}>수정</Link>
                            <button>삭제</button>
                        </div>
                    )}
                </div>

                <Avatar className="flex">
                    <AvatarImage src={post.avatar!} alt="@profile" />
                    <AvatarFallback>
                        <div className="h-10 w-10 relative rounded-full overflow-hidden">
                            <Image
                                src={
                                    "https://ngtnbcqokvtyrilhkwpz.supabase.co/storage/v1/object/public/profile/Vector.png"
                                }
                                alt="profile"
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col card content ml-5 w-full">
                    <div className="flex items-center">
                        <h4 className="text-sm font-medium leading-none mr-2">{post.nickname}</h4>
                        <p className="text-sm text-muted-foreground">{post.email}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(post.created_at), "yyyy-MM-dd HH:mm")}
                    </p>
                    <Separator className="mt-1 mb-6 border-black" />
                    <div className="flex h-5 items-center space-x-4 text-sm">
                        <p className="text-ellipsis line-clamp-3 overflow-hidden w-[80%]">
                            {post.contents}
                        </p>
                    </div>
                    <CheerupButton postId={post.id} />
                </div>
              </div>
            </div>
  );
}

export default PostCard;
