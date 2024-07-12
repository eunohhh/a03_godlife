import { useRouter } from "next/router";

export default function CenterLogo() {
    const router = useRouter();

    const handleLogoClick = () => router.reload();

    return (
        <div className="flex">
            <img src="/center_logo.svg" onClick={handleLogoClick} style={{ cursor: "pointer" }} />
        </div>
    );
}
