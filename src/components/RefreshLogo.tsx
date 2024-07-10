"use client";

import { useRouter } from "next/navigation";

export default function RefreshLogo() {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <img
      src="/center_logo.svg"
      alt="Center Logo"
      onClick={handleRefresh}
      style={{ cursor: "pointer" }}
    />
  );
}
