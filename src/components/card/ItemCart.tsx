import React from "react"
import { AiOutlineCheckSquare } from "react-icons/ai";

interface ItemCardProps {
    title?: string,
    icon?: React.ReactNode,
    onClick?: () => void,
    amount: number;
}


export default function ItemCard({ title, icon, onClick, amount }: ItemCardProps) {
    return (
        <div role="button" className='flex flex-col justify-between item-box bg-white hover:shadow-lg shadow h-[14rem] 2xl:h-[13rem] xl:h-[10.8rem] p-4 border  rounded-lg' onClick={onClick}>
            <div className='grow xl:text-[13px]'>{title}</div>
            <span className='text-[3rem] flex justify-end 2xl:text-[2.4rem] xl:text-[1.8rem]'>{icon}</span>
            <div className='flex justify-between relative'>
                <div className='flex items-center text-2xl gap-3 2xl:text-xl xl:text-base'>
                    <span className={amount > 0 ? 'text-sky-500' : 'text-gray-500'}><AiOutlineCheckSquare /></span>
                    <span className={'text-gray-500'} >{amount}</span>
                </div>
            </div>
        </div>
    )
}