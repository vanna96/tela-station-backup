


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import LogisticMasterPage from '../presentations/logistic/index';

export default function LogisticRoute() {
    return (
        <Routes>
            <Route index element={<LogisticMasterPage />} />
            {/* <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseAgreementForm />} />
            </Route> */}
        </Routes>
    )
}
