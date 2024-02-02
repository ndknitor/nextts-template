'use client'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, ReactElement, useEffect, useRef, useState } from 'react'
const dialog = {
    info: (message: string | ReactElement, title?: string, confirmText?: string) => { },
    error: (message: string | ReactElement, title?: string, confirmText?: string) => { },
    success: (message: string | ReactElement, title?: string, confirmText?: string) => { },
    confirm: (onConfirm: () => void | Promise<void>, message: string | ReactElement, title?: string, confirmText?: string, cancelText?: string) => { },
};
export default dialog;
export function DialogContainer() {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState<string | ReactElement>("");
    const [confirmText, setConfirmText] = useState<string>();
    const [cancelText, setCancelText] = useState("Cancel");
    const [dialogType, setDialogType] = useState<"info" | "error" | "success" | "confirm">("info");

    const onConfirm = useRef<() => void | Promise<void>>();

    function closeModal() {
        setIsOpen(false);
        setConfirmText(undefined);
    }
    function info(message: string | ReactElement, title?: string, confirmText?: string) {
        setMessage(message);
        setDialogType("info");
        setTitle(title || "Information");
        setConfirmText(confirmText);
        setIsOpen(true);
    }
    function error(message: string | ReactElement, title?: string, confirmText?: string) {
        setMessage(message);
        setDialogType("error");
        setConfirmText(confirmText);
        setTitle(title || "Error");
        setIsOpen(true);
    }
    function success(message: string | ReactElement, title?: string, confirmText?: string) {
        setMessage(message);
        setDialogType("success");
        setConfirmText(confirmText);
        setTitle(title || "Success");
        setIsOpen(true);
    }
    function confirm(onConfirmF: () => void | Promise<void>, message: string | ReactElement, title?: string, confirmText?: string, cancelText?: string) {
        setMessage(message);
        setDialogType("confirm");
        setConfirmText(confirmText);
        setTitle(title || "Confirm");
        setCancelText(cancelText || "Cancel");
        setIsOpen(true);
        onConfirm.current = onConfirmF;
    }
    useEffect(() => {
        if (dialog) {
            dialog.info = info;
            dialog.error = error;
            dialog.success = success;
            dialog.confirm = confirm;
        }
    }, []);
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    {title}
                                </Dialog.Title>
                                <div className="mt-2">
                                    {
                                        typeof message == "string" ?
                                            <p className="text-sm text-gray-500">
                                                {message}
                                            </p>
                                            :
                                            <>
                                                {message}
                                            </>
                                    }


                                </div>

                                <div className="mt-4 flex w-full justify-end gap-4">

                                    {
                                        dialogType === "confirm" &&
                                        <button
                                            type="button"
                                            className={`rounded-md border border-transparent px-4 py-2 text-sm font-medium focus-visible:ring-offset-2 focus:outline-none focus-visible:ring-2 text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500`}
                                            onClick={closeModal}>
                                            {cancelText}
                                        </button>
                                    }

                                    <button
                                        type="button"
                                        className={`rounded-md border border-transparent px-4 py-2 text-sm font-medium focus-visible:ring-offset-2 focus:outline-none focus-visible:ring-2 ${(() => {
                                            switch (dialogType) {
                                                case "info": return "text-blue-900 bg-blue-100 hover:bg-blue-200 focus-visible:ring-blue-500"
                                                case "success": return "text-green-900 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500"
                                                case "error": return "text-red-900 bg-red-100 hover:bg-red-200 focus-visible:ring-red-500"
                                                case "confirm": return "text-green-900 bg-green-100 hover:bg-green-200 focus-visible:ring-green-500"
                                            }
                                        })()}`}
                                        onClick={async () => {
                                            onConfirm.current && await onConfirm.current();
                                            onConfirm.current = undefined;
                                            closeModal();
                                        }}>
                                        {confirmText || "Ok"}
                                    </button>

                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition >
    )
};