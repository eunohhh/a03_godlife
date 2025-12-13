"use client";
import Image from "next/image";

type BasicLoaderProps = {
	isSmall?: boolean;
};

function BasicLoader({ isSmall = false }: BasicLoaderProps) {
	return (
		<div className="relative w-[428px] min-w-svw min-h-svh my-0 mx-auto flex items-center justify-center">
			<div className="relative aspect-square w-[96px] h-[96px]">
				<Image
					className="object-contain animate-bounce"
					src="/turtle.png"
					alt="turtle"
					fill
					priority
					sizes="(min-width: 640px) 96px, 96px"
				/>
			</div>
		</div>
	);
}

export default BasicLoader;
