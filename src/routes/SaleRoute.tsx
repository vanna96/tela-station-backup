import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SaleMasterPage from '@/presentations/sale';
import SaleQuotationLists from '@/presentations/sale/sale_quotation';
import SaleQuotationForm from '@/presentations/sale/sale_quotation/quotation_form';
import SaleQuotationDetail from '@/presentations/sale/sale_quotation/quotation_detail';

export default function SaleRoute() {
    return (
        <Routes>
            <Route index element={<SaleMasterPage />} />
            <Route path='/sales-quotation' >
                <Route index element={<SaleQuotationLists />}/>
                <Route path='create' element={<SaleQuotationForm/>} />
                <Route path=':id' element={<SaleQuotationDetail/>}/>
                <Route path=':id/edit' element={<SaleQuotationForm/>}/>
                {/* <Route path=':id' element={SaleQuotationDetail />} />
                <Route path='create' element={SaleQuotationForm />} /> */}
            </Route>
        </Routes>
    )
}
