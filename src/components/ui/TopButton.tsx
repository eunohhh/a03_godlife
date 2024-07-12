"use client";

function TopButton() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="fixed bottom-[5%] right-[35%] group">
            <img
                className="cursor-pointer transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                src="top_btn.svg"
                alt="Top Button"
                onClick={scrollToTop}
            />
        </div>
    );
}

export default TopButton;
