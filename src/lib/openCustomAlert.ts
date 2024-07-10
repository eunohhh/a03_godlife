import CustomAlert from "@/components/ui/CustomAlert";
import React from "react";
import ReactDOM from "react-dom/client";

let alertContainer: HTMLDivElement | null = null;
let root: ReactDOM.Root | null = null;

export function showAlert(title: "success" | "error", description: string, isConfirm?: boolean): void {
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

    if (root) {
        root.render(
            React.createElement(CustomAlert, {
                title: title,
                description: description,
                isConfirm: isConfirm,
                onClose: onClose,
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
