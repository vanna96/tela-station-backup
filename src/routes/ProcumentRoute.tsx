


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PurchaseAgreementLists from '../presentations/procuments/purchase_agreement/index';
import PurchaseAgreementDetail from '../presentations/procuments/purchase_agreement/page/PurchaseAgreementDetail';
import Form from '@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm';
import PurchaseAgreementForm from '@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm';
import ProcumentPage from '@/presentations/procuments';
import PurchaseQoutationLists from '@/presentations/procuments/purchase_qoutation';
import PurchaseQoutationForm from '@/presentations/procuments/purchase_qoutation/page/PurchaseQoutationForm';

export default function ProcumentRoute() {
    return (
        <Routes>
            <Route index element={<ProcumentPage />} />
            <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseAgreementForm />} />
            </Route>
            <Route path='/purchase-qoutation' >
                <Route index element={<PurchaseQoutationLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseQoutationForm />} />
            </Route>
        </Routes>
    )
}
