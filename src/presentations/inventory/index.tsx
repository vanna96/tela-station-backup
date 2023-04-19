import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'
import { AiOutlineFileSync, AiOutlineSolution, AiOutlineFileExclamation, AiOutlineFileText } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


export default function InventoryMasterPage() {

    const navigate = useNavigate();

    const goTo = (route: string) => navigate('/inventory/' + route);

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
                <ItemCard title='Good Receipt' icon={<AiOutlineFileText />} onClick={() => goTo('good-receipt')} />
                <ItemCard title='Stock Transfer' icon={<AiOutlineFileSync />} />
            </MainContainer>
        </>
    )
}