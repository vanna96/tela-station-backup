import MainContainer from '@/components/MainContainer';
import ItemCard from '@/components/card/ItemCart';
import BranchModal from '@/components/modal/BranhModal';
import React from 'react'
import { AiOutlineFileSync, AiOutlineSolution, AiOutlineFileExclamation, AiOutlineFileText } from "react-icons/ai";
import DimensionModal from './../../components/modal/DimensionsModal';
import UsersModal from '@/components/modal/UsersModal';
import DocumentNumberingModal from '@/components/modal/DocumentNumberingModal';

export default function InventoryMasterPage() {
    

    return (
        <>
            <MainContainer title='Inventory'>
                <ItemCard title='Branch' icon={<AiOutlineSolution />}  />
                <ItemCard title='Dimension' icon={<AiOutlineFileSync />} />
                <ItemCard title='Document Numbering' icon={<AiOutlineFileExclamation />}  />
                <ItemCard title='User Licensing' icon={<AiOutlineFileText />} />
                <ItemCard title='User Master Data' icon={<AiOutlineFileText />} />

            </MainContainer>
        </>
    )
}