import React from "react";
import BackButton from "./button/BackButton";
import { HiOutlineEye, HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineDocumentAdd, HiOutlineChevronDown } from "react-icons/hi";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button, IconButton } from "@mui/material";
import { AiOutlinePushpin } from "react-icons/ai";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { ThemeContext } from "@/contexts";

interface DocumentHeaderComponentProps {
    data: any,
    onCopyTo?: (data?: any) => void,
    onFirstPage?: () => void,
    onLastPage?: () => void,
    onPreviousPage?: () => void,
    onNextPage?: () => void,
    menuTabs: JSX.Element | React.ReactNode,
}


const DocumentHeaderComponent: React.FC<DocumentHeaderComponentProps> = (props: DocumentHeaderComponentProps) => {
    const [collapse, setCollapse] = React.useState<boolean>(true);
    const [section, setSection] = React.useState<number>(0);
    const { theme } = React.useContext(ThemeContext);

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const handlerGoToEdit = () => {
        navigate(location.pathname + "/edit", { state: props.data, replace: true });
    }

    const handlerGoToCreate = () => {
        navigate(location.pathname.replace(`${id}/edit`, 'create'));
    }


    const handlerCopyTo = () => {
        if (props.onCopyTo) {
            props.onCopyTo(props.data ?? {});
        }
    }

    const handlerCollapse = () => {
        setCollapse(!collapse);
    }

    const handlerClickMenu = (value: number) => setSection(value);


    return <div className={`w-full flex flex-col rounded ${!collapse ? 'gap-3' : ''} justify-between items-center  sticky top-0 border-y ${theme === 'light' ? 'bg-white border-y-gray-200 shadow-lg' : 'bg-slate-700 border-y-gray-600 shadow-lg'} z-50 px-4  `} >
        <div className={`w-full flex justify-between px-6 ${!collapse ? 'border-b  py-2' : 'pt-2'} ${theme === 'light' ? 'border-b-gray-200' : 'border-b-gray-600'} z-50 px-0`}>
            <div className='flex gap-2 items-center'>
                <h1 className='text-md font-bold capitalize'>{location.pathname.split('/')[2].replace('-', ' ')} - {props?.data?.DocNum}</h1>
            </div>
            <div className='text-[12px] flex gap-3'>
                <div className='mx-2'></div>
            </div>
        </div>
        <div className={`w-full  grid grid-cols-2 gap-2 px-6 py-1  rounded ${!collapse ? '' : 'hidden'}`}>
            <div className="w-full text-[14px] flex gap-8">
                <div className="flex flex-col gap-2">
                    <span className="text-[#656565] text-[12px]">Vendor</span>
                    <span className="font-bold">{props?.data?.CardCode}</span>
                    <span className="font-bold">{props?.data?.CardName}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[#656565] text-[12px]">Total Payment Due</span>
                    <span className="font-bold">AUD {2000}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-[#656565] text-[12px]">Status</span>
                    <span className="font-bold text-green-500 uppercase">Open</span>
                </div>
            </div>
        </div>
        <div className={`w-full flex gap-2  px-4  text-sm  border-t  ${theme === 'light' ? 'border-t-gray-200' : 'border-t-gray-600'} py-0 sticky ${collapse ? 'mt-3' : ''}`}>
            {props?.menuTabs}
            <div className="absolute -top-[16px] w-full flex justify-center gap-2">
                {/* <div role="button" title="btn-pin" className={`flex items-center justify-center w-8 h-8 rounded-md  p-2 ${theme === 'light' ? 'bg-white border' : 'bg-slate-600'} `}>
                    <AiOutlinePushpin />
                </div> */}
                <div
                    title="btn-collapse"
                    role="button"
                    className={`flex items-center justify-center w-8 h-8 shadow-md drop-shadow-sm rounded-md p-2 ${theme === 'light' ? 'bg-white border' : 'bg-slate-600'} `}
                    onClick={handlerCollapse}
                >
                    {!collapse ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
        </div>
    </div>;
}

export default DocumentHeaderComponent;
