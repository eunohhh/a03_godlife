function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="w-screen font-Pretendard-Regular">
			<div className="my-0 mx-auto bg-turtleGreen max-w-[428px]">
				<div className="bg-turtleGreen max-w-[428px] min-w-svh p-2">
					<div className="flex flex-col justify-between px-2">{children}</div>
				</div>
			</div>
		</main>
	);
}

export default RootLayout;
