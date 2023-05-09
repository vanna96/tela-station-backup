


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import LogisticMasterPage from '../presentations/logistic/index';
import VehicelLists from '@/presentations/logistic/vehicel';
import VehicelForm from '@/presentations/logistic/vehicel/component/VehicelForm';
import RouteMasterList from '@/presentations/logistic/route_master';
import RouteMasterForm from '@/presentations/logistic/route_master/page/RouteMasterForm';
import RouteMasterDetails from '@/presentations/logistic/route_master/page/RouteMasterDetails';
import DriverList from '@/presentations/logistic/driver/page/DriverList';
import DriverDetail from '@/presentations/logistic/driver/page/DriverDetail';
import DriverForm from '@/presentations/logistic/driver/page/DriverForm';

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
            <Route path='/driver' >
                <Route index element={<DriverList />} />
                <Route path=':id' element={<DriverDetail />} />
                <Route path='create' element={<DriverForm />} />
                <Route path=':id/edit' element={<DriverForm edit={true} />} />

            </Route>
            <Route path='/route-master' >
                <Route index element={<RouteMasterList />} />
                <Route path=':id' element={<RouteMasterDetails />} />
                <Route path='create' element={<RouteMasterForm />} />
                <Route path=':id/edit' element={<RouteMasterForm edit={true} />} />

            </Route>

        </Routes>
    )
}
