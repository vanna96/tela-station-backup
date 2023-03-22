import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AiOutlineShopping, AiOutlineFileAdd, AiOutlineFileUnknown, AiOutlineSolution, AiOutlineSnippets, AiOutlineFileExcel, AiOutlineFileProtect } from "react-icons/ai";


const MasterDataPage = () => {

    const navigate = useNavigate();

    const goTo = (route: string) => navigate('/master-data/' + route);

    return <>
        <MainContainer title='Master Data'>
            <ItemCard title='Item Master Data' icon={<AiOutlineFileProtect />} />
            <ItemCard title='Employees' icon={<AiOutlineFileAdd />} />
            <ItemCard title='Suppliers' icon={<AiOutlineShopping />} />
            <ItemCard title='Customers' icon={<AiOutlineFileUnknown />} />
            <ItemCard title='Warehouses' icon={<AiOutlineSnippets />} />
            <ItemCard title='Bin Location' icon={<AiOutlineSolution />} />
        </MainContainer>
    </>
}

export default MasterDataPage;