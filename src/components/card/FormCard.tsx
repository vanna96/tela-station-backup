
import { ThemContextProps, ThemeContext } from '@/contexts';
import * as React from 'react';
import { IoChevronForwardSharp } from 'react-icons/io5';

export interface FormCardProps {
    title: string,
    children?: React.ReactNode,

}

export default class FormCard extends React.Component<FormCardProps> {

    static contextType = ThemeContext;

    constructor(props: FormCardProps) {
        super(props);
    }

    state = {
        collapse: true
    }

    public render() {

        const { theme }: any = this.context;

        return (
            <div className={`flex flex-col  ${theme === 'light' ? 'bg-white' : 'bg-slate-700'} rounded-lg p-4 px-6 shadow ${this.state.collapse ? 'pb-6' : ''}`}>
                <div
                    className={`font-bold text-lg flex justify-between items-center p-2  border-b ${theme === 'light' ? 'border-b-gray-300' : 'border-b-gray-600'} mb-3`}
                >
                    <h2>{this.props.title ?? 'Information'}</h2>
                </div>
                <div
                    className={`grid grid-cols-2 md:grid-cols-1 gap-10 rounded-lg  ${this.state.collapse ? "" : "hidden"
                        } overflow-hidden transition-height duration-300 `}
                >

                    {this.props.children}
                </div>
            </div>
        );
    }
}
