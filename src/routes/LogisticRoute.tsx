


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import LogisticMasterPage from '../presentations/logistic/index';
import VehicelLists from '@/presentations/logistic/vehicel';
import VehicelForm from '@/presentations/logistic/vehicel/page/VehicelForm';
import VehicelDetail from '@/presentations/logistic/vehicel/page/VehicelDetail';
import OpendeliveryLists from '@/presentations/logistic/openDelivery';
import OpenTransportationLists from '@/presentations/logistic/openTransportaion';

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
            <Route path='/open-delivery' >
                <Route index element={<OpendeliveryLists />} />
            </Route>
            <Route path='/open-transportation' >
                <Route index element={<OpenTransportationLists />} />
            </Route>
        </Routes>
    )
}
