import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineFileAdd, AiOutlineFileUnknown, AiOutlineSolution, AiOutlineSnippets, AiOutlineFileExcel, AiOutlineFileProtect } from "react-icons/ai";


const ProcumentPage = () => {

    const navigate = useNavigate();

    const goTo = (route: string) => navigate('/procument/' + route);

    return <>
        <MainContainer title='Purchase'>
            <ItemCard title='Purchase Agreement' onClick={() => goTo('purchase-agreement')} icon={<AiOutlineFileProtect />} />
            <ItemCard title='Purchase Request' onClick={() => goTo('purchase-request')} icon={<AiOutlineFileProtect />} />
            <ItemCard title='Purchase Order' icon={<AiOutlineShopping />} />
            <ItemCard title='Purchase Quoatation' icon={<AiOutlineFileUnknown />} />
            <ItemCard title='Down Payment Request' icon={<AiOutlineSnippets />} />
            <ItemCard title='Good Return Request' onClick={() => goTo('good-return-request')} icon={<AiOutlineFileProtect />} />
            <ItemCard title='Expanse' icon={<AiOutlineFileExcel />} />
        </MainContainer>
    </>
}

export default ProcumentPage;