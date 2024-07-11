"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import {
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    AlertDialogPortal,
} from "./Alert-dialog";

interface CustomAlertProps {
    title: "success" | "caution" | "error";
    description: string;
    isConfirm?: boolean;
    onClose?: () => void;
    onJustClose?: () => void;
}

function CustomAlert({
    title = "success",
    description = "성공했습니다!",
    isConfirm = false,
    onClose = () => {},
    onJustClose,
}: CustomAlertProps) {
    return (
        <AlertDialog open={true}>
            <AlertDialogPortal>
                <AlertDialogOverlay className="bg-black/50 flex justify-center items-center">
                    <AlertDialogContent className="bg-white w-[300px] min-h-[200px] rounded-lg flex flex-col justify-center items-center gap-5 transition-all duration-300">
                        <AlertDialogHeader className="flex flex-col items-center gap-2 w-full">
                            <AlertDialogTitle
                                className={`text-2xl font-bold w-full ${
                                    title === "success" ? "text-lime-400" : "text-red-400"
                                }`}
                            >
                                {title}
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-sm text-gray-500 mt-0 w-[80%] text-center break-words">
                                {description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex flex-row justify-center items-center gap-4">
                            {isConfirm && (
                                <AlertDialogCancel
                                    className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md focus-visible:outline-none"
                                    onClick={onJustClose}
                                >
                                    취소
                                </AlertDialogCancel>
                            )}
                            <AlertDialogAction
                                className="bg-turtleGreen text-white px-4 py-2 rounded-md focus-visible:outline-none"
                                onClick={onClose}
                            >
                                확인
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialogPortal>
        </AlertDialog>
    );
}

export default CustomAlert;
