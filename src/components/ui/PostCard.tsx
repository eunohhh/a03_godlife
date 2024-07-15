"use client";

import useAuth from "@/hooks/useAuth";
import { deletePost } from "@/lib/deletePost";
import { showAlert } from "@/lib/openCustomAlert";
import { Post } from "@/types/post.type";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CheerupButton from "../Cheerup";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { Separator } from "./Separator";

function PostCard({ post }: { post: Post }) {
    const { me } = useAuth();

    // const { data, isPending: userIsPending, error: userError } = useMeQuery();
    // const me = data?.userTableInfo;

    const pathname = usePathname();
    const router = useRouter();

    const handleDelete = async () => {
        if (!me) return;
        if (post.email !== me.email) {
            return showAlert("caution", "게시물 작성자만 삭제할 수 있어요!");
        }

        const isConfirmed = confirm("게시물을 삭제할까요?");
        if (!isConfirmed) return;

        const result = await deletePost(post.id);
        if (result) {
            showAlert("success", "게시물이 삭제되었어요!");
            return router.refresh();
        } else {
            return showAlert("error", "앗! 게시물 삭제에 실패했어요..");
        }
    };

    return (
        <div className="post-card max-h-[200px] bg-white rounded-lg p-5">
            <div className="flex flex-row">
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

                        {/* 여기에 수정삭제 */}
                        <div>
                            {me?.email === post.email && pathname === "/profile" && (
                                <div className="flex space-x-1 ml-2">
                                    <Link href={`/write`}>
                                        <Image src="/write_btn.svg" alt="Edit" width={17} height={17} />
                                    </Link>
                                    <button onClick={handleDelete}>
                                        <Image src="/delete_btn.svg" alt="Delete" width={17} height={17} />
                                    </button>
                                </div>
                            )}
                        </div>
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
