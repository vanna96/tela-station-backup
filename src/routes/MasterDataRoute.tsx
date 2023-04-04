


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EmployeeLists from '@/presentations/master/employee/page/EmployeeList';
import EmployeeForm from '@/presentations/master/employee/page/EmployeeForm';
import MasterDataPage from '@/presentations/master';
import EmployeeDetail from '@/presentations/master/employee/page/EmployeeDetail';

export default function MasterDataRoute() {
    return (
        <Routes>
            <Route index element={<MasterDataPage />} />
            <Route path='/employee' >
                <Route index element={<EmployeeLists />} />
                <Route path=':id' element={<EmployeeDetail />} />
                <Route path='create' element={<EmployeeForm />} />
                <Route path=':id/edit' element={<EmployeeForm edit={true} />} />
            </Route>
        </Routes>
    )
}
