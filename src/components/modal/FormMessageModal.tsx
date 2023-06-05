import React, { FC, RefObject } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BsCheckCircle, BsExclamationCircle } from "react-icons/bs";


interface FormMessageModalProps {
    ref?: RefObject<FormMessageModal>,
}



class FormMessageModal extends React.Component<FormMessageModalProps> {
    // Your component implementation...
    state = { open: false, message: '', title: '', isError: false, }

    handlerOpen() {
        console.log('worked')
    }

    success(message: string) {
        this.setState({
            open: true,
            isError: false,
            title: 'Success',
            message: message,
        })
    }

    error(message: string, title?: string) {
        this.setState({
            open: true,
            isError: true,
            title: title ?? 'Invalid',
            message: message,
        })
    }

    render() {
        return (
            <Transition appear show={this.state.open} as={Fragment}>
                <Dialog as="div" className="relative z-[100] " onClose={() => { }}>
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
                        <div className="flex min-h-full items-center justify-center p-4 text-center ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className={`w-[28rem] shadow-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle  transition-all`}>
                                    <Dialog.Title
                                        as="h3"
                                        className={`w-full flex  items-center gap-2 text-base font-medium leading-6 ${this.state.isError ? 'text-red-500' : 'text-green-500'}`}
                                    >
                                        {this.state.isError ? <BsExclamationCircle /> : <BsCheckCircle />} <span>{this.state.title}</span>

                                    </Dialog.Title>
                                    <hr />
                                    <div className="text-sm my-4">
                                        {this.state.message}
                                    </div>

                                    <div className="mt-4 flex gap-2 justify-end">
                                        {this.state.isError ?
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => this.setState({ open: false })}
                                            >
                                                Close
                                            </button> : <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => this.handlerOpen()}
                                            >
                                                View Detail
                                            </button>}


                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        )
    }
}

export default FormMessageModal;





