


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MasterDataPage from '@/presentations/master';
import BinlocationLists from '@/presentations/master/binlocation';
import BinlocationDetail from '@/presentations/master/binlocation/page/BinlocationDetail';
import BinlocationForm from '@/presentations/master/binlocation/page/BinlocationForm';
import WarehoseLists from '@/presentations/master/warehouse';
import WarehouseDetail from '@/presentations/master/warehouse/page/WarehouseDetail';
import WarehouseForm from '@/presentations/master/warehouse/page/WarehouseForm';

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
            <Route path='/binlocation' >
                <Route index element={<BinlocationLists />} />
                <Route path=':id' element={<BinlocationDetail />} />
                <Route path='create' element={<BinlocationForm />} />
                <Route path=':id/edit' element={<BinlocationForm edit={true} />} />

            </Route>
        </Routes>
    )
}
