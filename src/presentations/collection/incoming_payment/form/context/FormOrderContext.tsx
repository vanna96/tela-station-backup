import { diffDays, formatDate } from "@/helper/helper";
import request from "@/utilies/request";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

type GeneralProps = { children: any; Edit?: any };

export const FormOrderContext = createContext({});
export const FormOrderProvider = ({ children, Edit }: GeneralProps) => {
  const { data: ContentService } = useQuery({
    queryKey: ["content_service"],
    queryFn: async () => {
      const res = request(
        "GET",
        `/ChartOfAccounts?$select=Code,Name,Balance,AccountType&$filter=ActiveAccount eq 'tYES'`
      )
        .then((res: any) => res?.data?.value)
        .catch((error) => console.log(error));
      return res;
    },
  });

  const useType = Edit?.DocType?.replace("r", "") || "Customer";
  const [form, setForm]: any = useState({
    useType: Edit ? useType : "Customer",
    posDate: Edit ? Edit?.DocDate?.split("T")[0] : formatDate(new Date()),
    validUntil: Edit ? Edit?.DocDate?.split("T")[0] : null,
    documentDate: Edit ? Edit?.TaxDate?.split("T")[0] : formatDate(new Date()),
    cardCode: Edit ? (useType !== "Account" ? Edit?.CardCode : "") : "",
    cardName: Edit ? (useType !== "Account" ? Edit?.CardName : "") : "",
    series_value: Edit?.DocNum,
    currency: Edit?.DocCurrency || null,
    internalCode: Edit?.ContactPersonCode,
    cashDiscount: Edit?.CashDiscountDateOffset || null,
    useShippedGoodAccount: Edit?.UseShpdGoodsAct === "tYES",
    createQRCodeFrom: Edit?.CreateQRCodeFrom,
    bussinessPartnerProject: Edit?.Project,
    orderNumber: Edit?.ImportFileNum,
    shippingType: Edit?.TransportationCode || 1,
    SalesEmployee: Edit?.SalesPersonCode,
    OwnerId: Edit?.DocumentsOwner,
    remark: Edit?.Remarks,
    paymentMeansTotalAUD: 0,
    totalExchange: 0,
    documentLines: [],
    series_type: Edit?.Series || 12,
    reference: Edit?.CounterReference || null,
    journalRemark: Edit?.JournalRemarks || null,
    paymenyMeansExchangeRate: Edit?.DocRate || 0,
    items: Edit
      ? useType === "Account"
        ? Edit?.PaymentAccounts?.map((i: any) => {
            const exchangeRate =
              Edit?.DocCurrency === "AUD" ? 1 : Edit?.DocRate;
            return {
              rate: i.VatAmount * exchangeRate,
              Code: i.AccountCode,
              taxCode: i.VatGroup || null,
              Name: i.AccountName || null,
              total: i?.SumPaidFC || i.SumPaid || 0,
            };
          })
        : []
      : null,
    paymentMeans: Edit
      ? [
          {
            type: "Check",
            account: `${Edit?.CheckAccount || ""} ${Edit ? "-" : ""} ${
              ContentService?.find(
                ({ Code }: any) => Code === Edit?.CheckAccount
              )?.Name || ""
            }`,
            amount:
              Edit?.PaymentChecks?.reduce(
                (accumulator: any, object: any) =>
                  accumulator + parseFloat(object.CheckSum || 0),
                0
              ) || 0,
          },
          {
            type: "Bank Transfer",
            account: `${Edit?.TransferAccount || ""} ${
              Edit?.CashAccount ? "-" : ""
            } ${
              ContentService?.find(
                ({ Code }: any) => Code === Edit?.TransferAccount
              )?.Name || ""
            }`,
            amount:
              Edit?.TransferSum *
              (Edit?.DocCurrency === "AUD" ? 1 : Edit?.DocRate),
          },
          {
            type: "Credit Card",
            account: "",
            amount: "0",
          },
          {
            type: "Cash",
            account: `${Edit?.CashAccount || ""} ${
              Edit?.CashAccount ? "-" : ""
            } ${
              ContentService?.find(
                ({ Code }: any) => Code === Edit?.CashAccount
              )?.Name || ""
            }`,
            amount: Edit?.CashSumFC || Edit?.CashSum || 0,
          },
        ]
      : null,
  });

  const { data: documentNumber }: any = useQuery(
    ["document_number", 24],
    async () => {
      const res = await request("POST", `/SeriesService_GetDocumentSeries`, {
        DocumentTypeParams: {
          Document: 24,
        },
      })
        .then((res: any) =>
          res?.data?.value?.filter((e: any) => e.PeriodIndicator === "Default")
        )
        .catch((e) => {
          throw new Error(e);
        });

      return res;
    }
  );

  const { data: customers } = useQuery({
    queryKey: "quotation_customer",
    queryFn: async () => {
      const filter = `$filter=CardType ne 'cSupplier'`;
      const res = await request("GET", `BusinessPartners/?${filter}`)
        .then((res: any) => res?.data)
        .catch((err: any) => console.log(err));
      return res;
    },
    enabled: documentNumber ? true : false,
  });

  const { data: Vendor } = useQuery({
    queryKey: "quotation_vendor",
    queryFn: async () => {
      const filter = `$filter=CardType eq 'cSupplier'`;
      const res = await request("GET", `BusinessPartners/?${filter}`)
        .then((res: any) => res?.data)
        .catch((err: any) => console.log(err));
      return res;
    },
    enabled: documentNumber ? true : false,
  });

  const { data: bussinessPartner }: any = useQuery(
    ["business_partner", form?.cardCode],
    async () => {
      const res = await request("GET", `/BusinessPartners('${form?.cardCode}')`)
        .then((res: any) => res?.data)
        .catch((e) => {
          throw new Error(e);
        });

      return res;
    },
    { enabled: form?.cardCode ? true : false }
  );

  const { data: customerInvoice, isLoading: loading } = useQuery({
    queryKey: ["customer_invoice", form?.cardCode],
    queryFn: async () => {
      const invoices = await request(
        "GET",
        `Invoices?$filter=CardCode eq '${form?.cardCode}'&$select=DocNum,DocumentStatus,DocCurrency,DocRate,DocTotal,DiscountPercent,DocDueDate,DocDate,DocEntry,PaidToDate`
      )
        .then((res: any) =>
          res?.data?.value.map((invoice: any) => {
            return {
              ...invoice,
              documentType: "IN",
              invoiceType: "it_Invoice",
            };
          })
        )
        .catch((err: any) => console.log(err));

      const creditMemos = await request(
        "GET",
        `CreditNotes?$filter=CardCode eq '${form?.cardCode}'&$select=DocNum,DocumentStatus,DocCurrency,DocRate,DocTotal,DiscountPercent,DocDueDate,DocDate,DocEntry,PaidToDate`
      )
        .then((res: any) =>
          res?.data?.value?.map((memo: any) => {
            return {
              ...memo,
              documentType: "CN",
              invoiceType: "it_CredItnote",
            };
          })
        )
        .catch((err: any) => console.log(err));

      const downPayments = await request(
        "GET",
        `DownPayments?$filter=CardCode eq '${form?.cardCode}'&$select=DocNum,DocumentStatus,DocCurrency,DocRate,DocTotal,DiscountPercent,DocDueDate,DocDate,DocEntry,PaidToDate`
      )
        .then((res: any) =>
          res?.data?.value?.map((payment: any) => {
            return {
              ...payment,
              documentType: "DT",
              invoiceType: "it_DownPayment",
            };
          })
        )
        .catch((err: any) => console.log(err));

      return [...invoices, ...creditMemos, ...downPayments];
    },
    enabled: bussinessPartner ? true : false,
    cacheTime: 0,
    staleTime: 0,
  });

  const { data: Projects } = useQuery({
    queryKey: "projects",
    queryFn: async () => {
      const res = request("GET", "/Projects")
        .then((res: any) => res?.data?.value)
        .catch((error) => console.log(error));
      return res;
    },
  });

  const { data: PaymentTermsTypes } = useQuery({
    queryKey: "payment_terms_types",
    queryFn: async () => {
      const res = request("GET", "/PaymentTermsTypes")
        .then((res: any) => res?.data?.value)
        .catch((error) => console.log(error));
      return res;
    },
  });

  const { data: TaxCode } = useQuery({
    queryKey: ["tax_code"],
    queryFn: async () => {
      const res = request(
        "GET",
        `/VatGroups?$select=Category,Inactive , Name, Code, EU, VatGroups_Lines &$filter=Category eq 'bovcOutputTax' and Inactive eq 'tNO' &$orderby=Name asc`
      )
        .then((res: any) => res?.data?.value)
        .catch((error) => console.log(error));
      return res;
    },
  });

  useEffect(() => {
    if (customerInvoice) {
      const Hardware = documentNumber?.find((e: any) => e.Name === "Primary");
      const groupNumber = PaymentTermsTypes?.find(
        (num: any) => num.GroupNumber === bussinessPartner?.PayTermsGrpCode
      );

      setForm({
        ...form,
        shipTo: Edit?.ShipToCode || bussinessPartner?.ShipToDefault,
        shipToValue: Edit?.Address2 || bussinessPartner?.MailAddress,
        payTo: Edit?.PayToCode || bussinessPartner?.BilltoDefault,
        payToValue: Edit?.Address || bussinessPartner?.Address,
        remark: Edit?.Remarks,
        journalRemark:
          Edit?.JournalRemarks ||
          `Incoming Payments - ${bussinessPartner?.CardCode || ""}`,
        paymentMethods:
          Edit?.PaymentMethod || bussinessPartner?.PeymentMethodCode,
        federalTaxID: Edit?.FederalTaxID || bussinessPartner?.FederalTaxID,
        indicator: Edit?.Indicator || bussinessPartner?.Indicator,
        paymentTerms:
          Edit?.PaymentGroupCode || bussinessPartner?.PayTermsGrpCode,
        months: Edit?.ExtraMonth || groupNumber?.NumberOfAdditionalMonths,
        days: Edit?.ExtraDays || groupNumber?.NumberOfAdditionalDays,
        dueDate: Edit?.StartFrom || groupNumber?.StartFrom,
        series_value: Edit?.DocNum || Hardware?.NextNumber,
        totalDiscount:
          Edit?.GeneralDiscount || groupNumber?.GeneralDiscount || 0,
        items: Edit
          ? useType === "Account"
            ? null
            : Edit?.PaymentInvoices?.map((i: any) => {
                const existInvoice = customerInvoice?.find(
                  ({ DocEntry, DocumentStatus }: any) =>
                    DocEntry === i.DocEntry && DocumentStatus === "bost_Open"
                );

                const ClosedInvoice = customerInvoice?.find(
                  ({ DocEntry, DocumentStatus }: any) =>
                    DocEntry === i.DocEntry && DocumentStatus === "bost_Close"
                );

                const rate = i?.DocRate || 1;
                let addOn = 0;
                const balanceDue =
                  (existInvoice?.DocTotal || ClosedInvoice?.DocTotal || 0) -
                  (existInvoice?.PaidToDate || ClosedInvoice?.PaidToDate || 0);

                return {
                  checked: true,
                  ...i,
                  DocDate:
                    existInvoice?.DocDate ||
                    ClosedInvoice?.DocDate ||
                    i?.DocDate,
                  DocCurrency:
                    existInvoice?.DocCurrency ||
                    ClosedInvoice?.DocCurrency ||
                    i?.DocCurrency,
                  DocTotal:
                    existInvoice?.DocTotal || ClosedInvoice?.DocTotal || 0,
                  PaidToDate:
                    existInvoice?.PaidToDate || ClosedInvoice?.PaidToDate || 0,
                  TotalPayment: i?.AppliedFC || i?.AppliedSys,
                  BalanceDue: balanceDue * rate + addOn,
                  DocNum:
                    existInvoice?.DocNum || ClosedInvoice?.DocNum || i?.DocNum,
                  OverDueDays: diffDays(
                    existInvoice?.DocDueDate || ClosedInvoice?.DocDueDate,
                    Edit?.DocDate
                  ),
                };
              })
          : customerInvoice
              ?.filter(
                ({ DocumentStatus }: any) => DocumentStatus === "bost_Open"
              )
              ?.map((i: any) => {
                return {
                  ...i,
                  DiscountPercent: i?.DiscountPercent || 0,
                  OverDueDays: diffDays(i.DocDueDate),
                  DocTotal:
                    i?.documentType === "CN" ? -i?.DocTotal : i?.DocTotal,
                  BalanceDue:
                    i?.documentType === "CN"
                      ? -(i?.DocTotal - i?.PaidToDate) * (i?.DocRate || 1)
                      : (i?.DocTotal - i?.PaidToDate) * (i?.DocRate || 1),
                };
              })
              ?.sort(
                (a, b) => parseInt(b.OverDueDays) - parseInt(a.OverDueDays)
              ),
      });
    }
  }, [customerInvoice]);

  return (
    <>
      <FormOrderContext.Provider
        value={{
          form,
          setForm,
          documentNumber,
          customers,
          bussinessPartner,
          Projects,
          TaxCode,
          ContentService,
          Edit,
          customerInvoice,
          Vendor,
          loading,
        }}
      >
        {children}
      </FormOrderContext.Provider>
    </>
  );
};
