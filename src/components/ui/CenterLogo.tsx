// "use client";

import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function CenterLogo() {
	// const router = useRouter();

	// const handleLogoClick = () => router.refresh();

	return (
		<div className="navbar-center bg-#1d1d1d w-full h-[60px] text-center pt-1">
			<Link href="/" className="text-white text-2xl font-MangoByeolbyeol">
				God Life Mate
			</Link>
		</div>
	);
}
