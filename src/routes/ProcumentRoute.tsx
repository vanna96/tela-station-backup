


import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PurchaseAgreementLists from '../presentations/procuments/purchase_agreement/index';
import PurchaseAgreementDetail from '../presentations/procuments/purchase_agreement/page/PurchaseAgreementDetail';
import PurchaseAgreementForm from '@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm';
import ProcumentPage from '@/presentations/procuments';
import PurchaseRequestLists from '../presentations/procuments/purchase_agreement/purchase_request/PurchaseRequestLists';
import PurchaseRequestForm from '@/presentations/procuments/purchase_agreement/purchase_request/page/PurchaseRequestForm';
import PurchaseRequestDetail from '@/presentations/procuments/purchase_agreement/purchase_request/page/PurchaseRequestDetail';
import GoodReturnLists from '@/presentations/procuments/good_return/page/list';
import GoodReturnDetail from '@/presentations/procuments/good_return/page/GoodReturnDetail';
import GoodReturnForm from '@/presentations/procuments/good_return/page/GoodReturnForm';
import PurchaseQoutationLists from '@/presentations/procuments/purchase_qoutation';
import PurchaseQoutationForm from '@/presentations/procuments/purchase_qoutation/page/PurchaseQoutationForm';
import PurchaseQoutationDetail from '@/presentations/procuments/purchase_qoutation/page/PurchaseQoutationDetail';
import PurchaseOrderLists from '@/presentations/procuments/purchase_order';
import PurchaseOrderDetail from '@/presentations/procuments/purchase_order/page/PurchaseOrderDetail';
import PurchaseorderForm from '@/presentations/procuments/purchase_order/page/PurchaseorderForm';
import PurchaseDownPaymentList from '@/presentations/procuments/down-payment-request';
import PurchaseDownPaymentDetail from '@/presentations/procuments/down-payment-request/page/PurchaseDownPaymentDetail';
import PurchaseDownForm from '@/presentations/procuments/down-payment-request/page/PurchaseDownPaymentForm';
import PurchaseDownPaymentForm from '@/presentations/procuments/down-payment-request/page/PurchaseDownPaymentForm';

export default function ProcumentRoute() {
    return (
        <Routes>
            <Route index element={<ProcumentPage />} />
            <Route path='/purchase-agreement' >
                <Route index element={<PurchaseAgreementLists />} />
                <Route path=':id' element={<PurchaseAgreementDetail />} />
                <Route path='create' element={<PurchaseAgreementForm />} />
                <Route path=':id/edit' element={<PurchaseAgreementForm edit={true} />} />
            </Route>
            <Route path='/purchase-request' >
                <Route index element={<PurchaseRequestLists />} />
                <Route path=':id' element={<PurchaseRequestDetail />} />
                <Route path='create' element={<PurchaseRequestForm />} />
                <Route path=':id/edit' element={<PurchaseRequestForm edit={true} />} />

            </Route>
            <Route path='/good-return-request' >
                <Route index element={<GoodReturnLists />} />
                <Route path=':id' element={<GoodReturnDetail />} />
                <Route path='create' element={<GoodReturnForm />} />
            </Route>
            <Route path='/purchase-qoutation' >
                <Route index element={<PurchaseQoutationLists />} />
                <Route path=':id' element={<PurchaseQoutationDetail />} />
                <Route path='create' element={<PurchaseQoutationForm />} />
                <Route path=':id/edit' element={<PurchaseQoutationForm edit={true} />} />
            </Route>
            <Route path='/purchase-order' >
                <Route index element={<PurchaseOrderLists />} />
                <Route path=':id' element={<PurchaseOrderDetail />} />
                <Route path='create' element={<PurchaseorderForm />} />
                <Route path=':id/edit' element={<PurchaseorderForm edit={true} />} />
            </Route>
            <Route path='/purchase-down-payment' >
                <Route index element={<PurchaseDownPaymentList />} />
                <Route path=':id' element={<PurchaseDownPaymentDetail />} />
                <Route path='create' element={<PurchaseDownPaymentForm/>} />
                <Route path=':id/edit' element={<PurchaseDownPaymentForm edit={true} />} />
            </Route>
        </Routes>
    )
}
