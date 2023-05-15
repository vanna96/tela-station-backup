
import * as React from 'react';
import { IoChevronForwardSharp } from 'react-icons/io5';

export interface FormCardProps {
    title: string,
    children?: React.ReactNode,

}

export default class FormCard extends React.Component<FormCardProps> {
    constructor(props: FormCardProps) {
        super(props);
    }

    state = {
        collapse: true
    }

    public render() {
        return (
            <div className={`flex flex-col gap-4 bg-white rounded-lg p-4 shadow ${this.state.collapse ? 'pb-6' : ''}`}>
                <div
                    role="button"
                    className="font-bold text-lg flex justify-between items-center p-2 px-4 rounded hover:bg-gray-100"
                    onClick={() => this.setState({ collapse: !this.state.collapse })}
                >
                    <h2>{this.props.title ?? 'Information'}</h2>
                    <div
                        role="button"
                        className={`${this.state.collapse ? "rotate-90" : "rotate-0"
                            }  rounded-full  duration-150 `}
                    >
                        <IoChevronForwardSharp />
                    </div>
                </div>
                {this.state.collapse ? <hr /> : null}

                <div
                    className={`grid grid-cols-2 md:grid-cols-1 gap-10 rounded-lg px-4 ${this.state.collapse ? "" : "hidden"
                        } overflow-hidden transition-height duration-300 `}
                >

                    {this.props.children}
                </div>
            </div>
        );
    }
}
