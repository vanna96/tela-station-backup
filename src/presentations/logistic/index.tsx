import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'

import { AiOutlineFileSync, AiOutlineSolution, AiOutlineFileExclamation, AiOutlineFileText } from "react-icons/ai";


export default function LogisticMasterPage() {
    return (
        <>
            <MainContainer title='Inventory'>
                <div className='col-span-6 '>Master Data</div>
                <ItemCard title='Driver' icon={<AiOutlineFileSync />} />
                <ItemCard title='Vehicel' icon={<AiOutlineSolution />} />
                <ItemCard title='Route' icon={<AiOutlineFileExclamation />} />
                <ItemCard title='Check List' icon={<AiOutlineFileExclamation />} />
                <div className='col-span-6'>Transportation </div>
                <ItemCard title='Open Delivery' icon={<AiOutlineFileText />} />
                <ItemCard title='Transportation Order' icon={<AiOutlineFileText />} />
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
