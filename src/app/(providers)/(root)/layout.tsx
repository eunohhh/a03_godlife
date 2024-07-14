function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="w-screen font-Pretendard-Regular">
            <div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">{children}</div>
        </main>
    );
}

export default RootLayout;
