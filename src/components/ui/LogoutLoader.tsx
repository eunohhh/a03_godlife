import clsx from "clsx";
import Image from "next/image";

type BasicLoaderProps = {
  isSmall?: boolean;
};

function LogoutLoader({ isSmall = false }: BasicLoaderProps) {
  return (
    <div
      className={clsx(
        "relative w-[428px] my-0 mx-auto flex flex-col items-center justify-center",
        isSmall ? "h-[40vh]" : "h-dvh"
      )}
    >
      <div className="relative aspect-square w-[96px] h-[96px]">
        <Image
          className="object-contain animate-bounce"
          src="/turtle.svg"
          alt="turtle"
          fill
          sizes="(min-width: 640px) 96px, 96px"
          priority
          unoptimized
        />
      </div>
      <div className="mt-4 text-center text-lg font-semibold">로그아웃...</div>
    </div>
  );
}

export default LogoutLoader;
