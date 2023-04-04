


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MasterDataPage from '@/presentations/master';
import WarehoseLists from '@/presentations/master/Warehouse';
import WarehouseDetail from '@/presentations/master/Warehouse/page/WarehouseDetail';
import WarehouseForm from '@/presentations/master/Warehouse/page/WarehouseForm';

export default function MasterDataRoute() {
    return (
        <Routes>
            <Route index element={<MasterDataPage />} />
            <Route path='/warehouse' >
                <Route index element={<WarehoseLists />} />
                <Route path=':id' element={<WarehouseDetail />} />
                <Route path='create' element={<WarehouseForm />} />
                <Route path=':id/edit' element={<WarehouseForm edit={true} />} />

            </Route>
        </Routes>
    )
}
