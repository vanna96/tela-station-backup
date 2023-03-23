


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PurchaseAgreementLists from '../presentations/procuments/purchase_agreement/index';
import PurchaseAgreementDetail from '../presentations/procuments/purchase_agreement/page/PurchaseAgreementDetail';
import Form from '@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm';
import PurchaseAgreementForm from '@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm';
import ProcumentPage from '@/presentations/procuments';
import PurchaseRequestLists from '../presentations/procuments/purchase_agreement/purchase_request/PurchaseRequestLists';
import PurchaseRequestForm from '@/presentations/procuments/purchase_agreement/purchase_request/page/PurchaseRequestForm';
import PurchaseRequestDetail from '@/presentations/procuments/purchase_agreement/purchase_request/page/PurchaseRequestDetail';

export default function ProcumentRoute() {
    return (
        <Routes>
            <Route index element={<ProcumentPage />} />
            <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseAgreementForm />} />
            </Route>
            <Route path='/purchase-request' >
                <Route index element={<PurchaseRequestLists />} />
                <Route path=':id' element={<PurchaseRequestDetail />} />
                <Route path='create' element={<PurchaseRequestForm />} />
            </Route>
        </Routes>
    )
}
