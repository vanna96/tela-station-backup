import { Route, Routes } from "react-router-dom";
import SaleMasterPage from "@/presentations/sale";
import SaleQuotationLists from "@/presentations/sale/sale_quotation";
import SaleQuotationForm from "@/presentations/sale/sale_quotation/quotation_form";
import SaleQuotationDetail from "@/presentations/sale/sale_quotation/quotation_detail";
import SaleOrderLists from "@/presentations/sale/sale_order";
import SaleOrderForm from "@/presentations/sale/sale_order/order_form";
import SaleOrderDetail from "@/presentations/sale/sale_order/order_detail";
import { QueryCacheProvider } from "@/utilies/provider";

export default function SaleRoute() {
  return (
    <Routes>
      <Route index element={<SaleMasterPage />} />
      <Route path="/sales-quotation">
        <Route index element={<SaleQuotationLists />} />
        <Route path="create" element={<SaleQuotationForm />} />
        <Route path=":id" element={<SaleQuotationDetail />} />
        <Route path=":id/edit" element={<SaleQuotationForm />} />
      </Route>
      <Route path="/sales-order">
        <Route index element={<SaleOrderLists />} />
        <Route path="create" element={<SaleOrderForm />} />
        <Route
          path=":id"
          element={
            <QueryCacheProvider>
              <SaleOrderDetail />
            </QueryCacheProvider>
          }
        />
        <Route path=":id/edit" element={<SaleOrderForm />} />
      </Route>
    </Routes>
  );
}
