import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'

import { AiOutlineFileSync, AiOutlineSolution, AiOutlineFileExclamation, AiOutlineFileText } from "react-icons/ai";
import { Navigate, useNavigate } from 'react-router-dom';


export default function LogisticMasterPage() {
    const navigate = useNavigate();

    const goTo = (route: string) => navigate('/logistic/' + route);

    return (
        <>
            <MainContainer title='Inventory'>
                <div className='col-span-6 '>Master Data</div>
                <ItemCard title='Driver' onClick={() => goTo('driver')}  icon={<AiOutlineFileSync />} />
                <ItemCard title='Vehicel' onClick={() => goTo('vehicel')} icon={<AiOutlineSolution />} />
                <ItemCard title='Route Master' onClick={() => goTo('route-master')}  icon={<AiOutlineFileExclamation />} />
                <ItemCard title='Check List' icon={<AiOutlineFileExclamation />} />
                <div className='col-span-6'>Transportation </div>
                <ItemCard title='Open Delivery' icon={<AiOutlineFileText />} />
                <ItemCard title='Transportation Order' onClick={() => goTo('transportation-order')} icon={<AiOutlineFileText />} />
                <ItemCard title='Transportation Order Open' icon={<AiOutlineFileText />} />
                <ItemCard title='Transportation Order Close' icon={<AiOutlineFileText />} />
                <ItemCard title='Available Vehicle' icon={<AiOutlineFileText />} />
                <div className='col-span-6'> </div>
                <ItemCard title='Route Process' icon={<AiOutlineFileText />} />
                <ItemCard title='Available Vehicle' icon={<AiOutlineFileText />} />
                <ItemCard title='Route Complete ' icon={<AiOutlineFileText />} />
            </MainContainer>
        </>
    )
}
