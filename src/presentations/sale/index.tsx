import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineFileAdd, AiOutlineFileUnknown, AiOutlineSolution, AiOutlineSnippets, AiOutlineFileExcel, AiOutlineFileProtect } from "react-icons/ai";


const SaleMasterPage = () => {

    const navigate = useNavigate();

    const goTo = (route: string) => navigate('/sale/' + route);

    return <>
        <MainContainer title='Sales'>
            <ItemCard title='Sale Quoatation' icon={<AiOutlineFileProtect />} />
            <ItemCard title='Sale Order' icon={<AiOutlineFileAdd />} />
        </MainContainer>
    </>
}

export default SaleMasterPage;