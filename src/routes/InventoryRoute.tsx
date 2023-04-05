import React from "react";
import { Route, Routes } from "react-router-dom";
import SaleMasterPage from "@/presentations/sale";
import InventoryMasterPage from "@/presentations/inventory";
import PurchaseAgreementLists from "../presentations/procuments/purchase_agreement/index";
import PurchaseAgreementDetail from "@/presentations/procuments/purchase_agreement/page/PurchaseAgreementDetail";
import PurchaseAgreementForm from "@/presentations/procuments/purchase_agreement/page/PurchaseAgreementForm";
import Lists from '../presentations/inventory/stock_transfer/page/Listing';
import Form from "@/presentations/inventory/stock_transfer/page/Form";
import Detail from "@/presentations/inventory/stock_transfer/page/Detail";
import StockTransferRequestLists from '../presentations/inventory/stock_transfer_request/page/Listing';
import StockTransferRequestForm from "@/presentations/inventory/stock_transfer_request/page/Form";
import StockTransferRequestDetail from "@/presentations/inventory/stock_transfer_request/page/Detail";
import InternalTransferRequestLists from '../presentations/inventory/internal_transfer_request/page/Listing';
import InternalTransferDetails from '../presentations/inventory/internal_transfer_request/page/Detail'
import InternalTransferForm from '../presentations/inventory/internal_transfer_request/page/Form'

export default function InventoryRoute() {
  return (
    <Routes>
      <Route index element={<InventoryMasterPage />} />
      <Route path="/internal-transfer-request">
        <Route index element={<InternalTransferRequestLists />} />
        <Route path=":id" element={<InternalTransferDetails />} />
        <Route path="create" element={<InternalTransferForm />} />
        <Route
          path=":id/edit"
          element={<InternalTransferForm edit={true} />}
        />
      </Route>
      <Route path="/stock-transfer-request">
        <Route index element={< StockTransferRequestLists />} />
        <Route path=':id' element={<StockTransferRequestDetail />} />
        <Route path='create' element={<StockTransferRequestForm />} />
        <Route path=':id/edit' element={<StockTransferRequestForm edit={true} />} />

      </Route>
      <Route path="/internal-damage-request">
        <Route index element={<PurchaseAgreementLists />} />
        <Route path=':id' element={<PurchaseAgreementDetail />} />
        <Route path='create' element={<PurchaseAgreementForm />} />
        <Route path=':id/edit' element={<PurchaseAgreementForm edit={true} />} />

      </Route>
      <Route path="/stock-transfer">
        <Route index element={<Lists />} />
        <Route path=':id' element={<Detail />} />
        <Route path='create' element={<Form />} />
        <Route path=':id/edit' element={<Form edit={true} />} />

      </Route>
    </Routes>
  );
}
