"use client";

import { showAlert } from "@/lib/openCustomAlert";
import { useEffect } from "react";

function TestPage() {
    useEffect(() => {
        showAlert("success", "성공했습니다! 잘되냐");
    }, []);

    return <div> 테스트입니당 </div>;
}

export default TestPage;
