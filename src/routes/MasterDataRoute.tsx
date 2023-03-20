


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MasterDataPage from '@/presentations/master';

export default function MasterDataRoute() {
    return (
        <Routes>
            <Route index element={<MasterDataPage />} />
            {/* <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseAgreementForm />} />
            </Route> */}
        </Routes>
    )
}
