


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';

export default function SaleRoute() {
    return (
        <Routes>
            <Route index element={<SaleMasterPage />} />
            {/* <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseAgreementForm />} />
            </Route> */}
        </Routes>
    )
}
