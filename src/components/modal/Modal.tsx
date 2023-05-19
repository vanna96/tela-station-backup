import React, { FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { IoClose } from "react-icons/io5";
import { ThemeContext } from '@/contexts';
type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ModalProps {
    open: boolean,
    onClose: () => void,
    onOk?: () => void,
    size?: ModalSize;
    widthClass?: string,
    heightClass?: string,
    children?: JSX.Element,
    title?: string,
    disableClose?: boolean,
    okLabel?: string,
    disableTitle?: boolean,
    disableFooter?: boolean,
    titleClass?: string,
    pannelClass?: string;
    disableShadow?: boolean,
    renderTitle?: JSX.Element,
}

const Modal: FC<ModalProps> = ({ open, onClose, widthClass, heightClass, size, children, title, disableClose = false, okLabel, disableTitle = false, disableFooter = false, onOk, titleClass, pannelClass, disableShadow, renderTitle }) => {

    const { theme } = React.useContext(ThemeContext);

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

                <div className="fixed inset-0 overflow-y-auto w-full ">
                    <div className="flex min-h-full items-center justify-center  text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className={`${widthClass ?? 'max-w-md'} ${heightClass ?? ''}  ${pannelClass ?? ''} ${disableShadow ? '' : 'shadow-xl'} relative transform overflow-hidden rounded-lg ${theme === 'light' ? 'bg-white' : 'bg-slate-600'} py-1 px-5 text-left align-middle  transition-all`}>
                                {!disableTitle ? <Dialog.Title
                                    as="h3"
                                    className="w-full flex justify-between items-center text-lg font-medium leading-6 text-gray-900"
                                >
                                    <span className={titleClass}>{title ?? 'No Title'}</span>
                                    {disableClose ? <div role='button' className='text-xl hover:bg-gray-200 rounded'><IoClose /></div> : null}

                                </Dialog.Title> : null}
                                <div className={`my-4 text-inherit`}>
                                    {children}
                                </div>

                                {!disableFooter ? <>
                                    <div className="mt-4 flex justify-end absolute bottom-5 px-12 w-full">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={onOk}
                                        >
                                            {okLabel ? okLabel : 'Ok'}
                                        </button>
                                    </div></> : null}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal;
