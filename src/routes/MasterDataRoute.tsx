


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EmployeeLists from '@/presentations/master/employee/page/EmployeeList';
import EmployeeForm from '@/presentations/master/employee/page/EmployeeForm';
import MasterDataPage from '@/presentations/master';
import EmployeeDetail from '@/presentations/master/employee/page/EmployeeDetail';
import SuppilerLists from '@/presentations/master/supplierMasterData/page/SupplierList';
import SupplierForm from '@/presentations/master/supplierMasterData/page/SupplierForm';
import SupplierDetails from '@/presentations/master/supplierMasterData/page/SupplierDetails';

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
            <Route path='/supplier' >
                <Route index element={<SuppilerLists />} />
                <Route path=':id' element={<SupplierDetails />} />
                <Route path='create' element={<SupplierForm />} />
                <Route path=':id/edit' element={<SupplierForm edit={true} />} />
            </Route>
        </Routes>
    )
}
