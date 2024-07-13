"use client";

import Image from "next/image";

function TopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-[1%] right-[1%] group">
            <Image
                className="cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                src="top_btn.svg"
                alt="Top Button"
                width={50}
                height={50}
                onClick={scrollToTop}
            />
        </div>
    );
}

export default TopButton;
