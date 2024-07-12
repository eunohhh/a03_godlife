import clsx from "clsx";
import Image from "next/image";
import turtle from "../../../public/turtle.svg";

type BasicLoaderProps = {
    isSmall?: boolean;
};

function BasicLoader({ isSmall = false }: BasicLoaderProps) {
    return (
        <div className={clsx("relative w-[428px] my-0 mx-auto", isSmall ? "h-[40vh]" : "h-dvh")}>
            <div className="relative aspect-square w-[96px] h-[96px] top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                <Image
                    className="object-contain animate-bounce"
                    src={turtle}
                    alt="turtle"
                    fill
                    sizes="(min-width: 640px) 96px, 96px"
                    priority
                />
            </div>
        </div>
    );
}

export default BasicLoader;
