import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'
import { AiOutlineFileSync, AiOutlineSolution, AiOutlineFileExclamation, AiOutlineFileText } from "react-icons/ai";


export default function InventoryMasterPage() {
    return (
        <>
            <MainContainer title='Inventory'>
                <div className='col-span-6 '>Request Document</div>
                <ItemCard title='Internal Transfer Request' icon={<AiOutlineSolution />} />
                <ItemCard title='Stock Transfer Request' icon={<AiOutlineFileSync />} />
                <ItemCard title='Damage Transfer Request' icon={<AiOutlineFileExclamation />} />
                <div className='col-span-6 border-b mt-3'></div>
                <div className='col-span-6 mb-3'>Transaction Document</div>
                <ItemCard title='Good Issue' icon={<AiOutlineFileText />} />
                <ItemCard title='Good Receipt' icon={<AiOutlineFileText />} />
                <ItemCard title='Stock Transfer' icon={<AiOutlineFileSync />} />
            </MainContainer>
        </>
    )
}