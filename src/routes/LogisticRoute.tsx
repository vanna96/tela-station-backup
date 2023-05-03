


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import LogisticMasterPage from '../presentations/logistic/index';
import VehicelLists from '@/presentations/logistic/vehicel';
import VehicelForm from '@/presentations/logistic/vehicel/component/VehicelForm';

export default function LogisticRoute() {
    return (
        <Routes>
            <Route index element={<LogisticMasterPage />} />
            <Route path='/vehicel' >
                <Route index element={<VehicelLists />} />
                <Route path=':id' element={<VehicelForm />} />
                <Route path='create' element={<VehicelForm />} />
                <Route path=':id/edit' element={<VehicelForm edit={true} />} />

            </Route>

        </Routes>
    )
}
