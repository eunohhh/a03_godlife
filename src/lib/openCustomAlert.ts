import CustomAlert from "@/components/ui/CustomAlert";
import React from "react";
import ReactDOM from "react-dom/client";

let alertContainer: HTMLDivElement | null = null;
let root: ReactDOM.Root | null = null;

export function showAlert(
    title: "success" | "caution" | "error",
    description: string,
    isConfirm?: boolean,
    onConfirm?: () => void
): void {
    if (!alertContainer) {
        alertContainer = document.createElement("div");
        document.body.appendChild(alertContainer);
        root = ReactDOM.createRoot(alertContainer);
    }

    const onClose = () => {
        if (root && alertContainer) {
            root.unmount();
            document.body.removeChild(alertContainer);
            alertContainer = null;
            root = null;
        }
    };

    const handleConfirm = () => {
        if (onConfirm && isConfirm) onConfirm(); // 확인 버튼을 눌렀을 때 추가 동작 실행
        onClose();
    };

    if (root) {
        root.render(
            React.createElement(CustomAlert, {
                title: title,
                description: description,
                isConfirm: isConfirm,
                onClose: handleConfirm,
                onJustClose: onClose,
            })
        );
    }
}

export function hideAlert() {
    if (root && alertContainer) {
        root.unmount();
        document.body.removeChild(alertContainer);
        alertContainer = null;
        root = null;
    }
}
