


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import LogisticMasterPage from '../presentations/logistic/index';
import VehicelLists from '@/presentations/logistic/vehicel';
import VehicelForm from '@/presentations/logistic/vehicel/page/VehicelForm';
import VehicelDetail from '@/presentations/logistic/vehicel/page/VehicelDetail';

export default function LogisticRoute() {
    return (
        <Routes>
            <Route index element={<LogisticMasterPage />} />
            <Route path='/vehicel' >
                <Route index element={<VehicelLists />} />
                <Route path=':id' element={<VehicelDetail />} />
                <Route path='create' element={<VehicelForm />} />
                <Route path=':id/edit' element={<VehicelForm edit={true} />} />

            </Route>

        </Routes>
    )
}
