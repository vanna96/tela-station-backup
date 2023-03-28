


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PurchaseAgreementLists from '../presentations/procuments/purchase_agreement/index';
import PurchaseAgreementDetail from '../presentations/procuments/purchase_agreement/page/PurchaseAgreementDetail';
import PurchaseAgreementForm from '@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm';
import ProcumentPage from '@/presentations/procuments';
import PurchaseOrderLists from '@/presentations/procuments/purchase_order';
import PurchaseOrderDetail from '@/presentations/procuments/purchase_order/page/PurchaseOrderDetail';
import PurchaseorderForm from '@/presentations/procuments/purchase_order/page/PurchaseorderForm';

export default function ProcumentRoute() {
    return (
        <Routes>
            <Route index element={<ProcumentPage />} />
            <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                {/* <Route path=':id' element={<PurchaseAgreementDetail />} /> */}
                <Route path='create' element={<PurchaseAgreementForm />} />
                <Route path=':id/edit' element={<PurchaseAgreementForm edit={true} />} />
            </Route>
            <Route path='/purchase-order' >
                <Route index element={<PurchaseOrderLists />} />
                <Route path=':id' element={<PurchaseOrderDetail />} />
                <Route path='create' element={<PurchaseorderForm />} />
            </Route>
        </Routes>
    )
}
