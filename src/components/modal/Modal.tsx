import React, { FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoClose } from "react-icons/io5";
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ModalProps {
    open: boolean,
    onClose: () => void,
    size?: ModalSize;
    widthClass?: string,
    heightClass?: string,
    children?: JSX.Element,
    title?: string,
    disableClose?: boolean,
    okLabel?: string,
    disableTitle?: boolean,
}

const Modal: FC<ModalProps> = ({ open, onClose, widthClass, heightClass, size, children, title, disableClose = false, okLabel, disableTitle = false }) => {
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[100] " onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto w-full">
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
                            <Dialog.Panel className={`${widthClass ?? 'max-w-md'} ${heightClass ?? ''} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                {!disableTitle ? <Dialog.Title
                                    as="h3"
                                    className="w-full flex justify-between items-center text-lg font-medium leading-6 text-gray-900"
                                >
                                    <span>{title ?? 'No Title'}</span>
                                    {disableClose ? <div role='button' className='text-xl hover:bg-gray-200 rounded'><IoClose /></div> : null}

                                </Dialog.Title> : null}
                                <div className=" my-4">
                                    {children}
                                </div>

                                <div className="mt-4 flex justify-end">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={onClose}
                                    >
                                        {okLabel ? okLabel : 'Ok'}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal;

