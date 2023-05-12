import React from "react";
import BackButton from "./button/BackButton";
import { HiOutlineEye, HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineDocumentAdd, HiOutlineChevronDown } from "react-icons/hi";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface DocumentHeaderComponentProps {
    data: any,
    onCopyTo?: (data?: any) => void,
    onFirstPage?: () => void,
    onLastPage?: () => void,
    onPreviousPage?: () => void,
    onNextPage?: () => void,
}


const DocumentHeaderComponent: React.FC<DocumentHeaderComponentProps> = (props: DocumentHeaderComponentProps) => {

    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const handlerGoToEdit = () => {
        console.log(props.data);
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


    return <div className='flex justify-between items-center bg-white p-2 rounded-lg px-6 shadow-sm'>
        <div className='flex gap-2 items-center'>
            <BackButton />
            <h1 className='text-sm font-bold capitalize'>{location.pathname.split('/')[2].replace('-', ' ')}</h1>
            {/* <span className='text-[12px] border border-blue-400 font-medium  px-2 rounded '>{this.state.status?.replace('as', '')}</span> */}
        </div>
        <div className='text-[12px] flex gap-3'>
            {location.pathname.includes('edit') || location.pathname.includes('create') ? null : <div role="button" onClick={handlerGoToEdit} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 border hover:text-blue-500 text-[12px]">Edit</div>}
            {/* {!location.pathname.includes('edit') ? null : <div role="button" onClick={handlerCopyTo} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 border hover:text-blue-500 text-[12px]">Copy To</div>} */}
            {!location.pathname.includes('edit') ? null : <div role="button" onClick={handlerGoToCreate} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiOutlineDocumentAdd className="" /></div>}
            {/* <div role="button" onClick={props.onFirstPage} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronDoubleLeft className="" /></div>
            <div role="button" onClick={props.onPreviousPage} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronLeft className="" /></div>
            <div role="button" onClick={props.onNextPage} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronRight className="" /></div>
            <div role="button" onClick={props.onLastPage} className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronDoubleRight className="" /></div> */}
            <div className='mx-2'></div>
        </div>
    </div>;
}

export default DocumentHeaderComponent;