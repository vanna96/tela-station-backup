


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MasterDataPage from '@/presentations/master';
import ItemMasterDataListing from '@/presentations/master/item_master_data/ItemListing';
import ItemMasterDataDetails from '../presentations/master/item_master_data/page/ItemDetails';
import ItemMasterDataForm from '../presentations/master/item_master_data/page/ItemForm';

export default function MasterDataRoute() {
    return (
        <Routes>
            <Route index element={<MasterDataPage />} />
            <Route path='/item-master-data' >
                <Route index element={<ItemMasterDataListing />} />
                <Route path=':id' element={<ItemMasterDataDetails />} />
                <Route path='create' element={<ItemMasterDataForm />} />
                <Route path=':id/edit' element={<ItemMasterDataForm edit={true} />} />

            </Route>
        </Routes>
    )
}
