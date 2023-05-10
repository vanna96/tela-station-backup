import request from "@/utilies/request";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { GeneralContact } from "./GeneralFormContext";

type GeneralProps = { children: any; Contact?: any };

export const ContactContext = createContext({});
export const ContactProvider = ({ children, Contact }: GeneralProps) => {
  const { formGeneral }: any = useContext(GeneralContact);
  const [formContent, setFormContent]: any = useState();

  const { data } = useQuery({
    queryKey: ["content_item"],
    queryFn: async () => {
      const select = `$select=ItemCode,ItemName,QuantityOnStock,UoMGroupEntry,ItemPrices,ItemsGroupCode,SalesVATGroup`;
      const filter = `$filter=SalesItem eq 'tYES'`;
      const res = request("GET", `/Items?${select}&${filter}`)
        .then((res: any) => res?.data?.value)
        .catch((error) => console.log(error));
      return res;
    },
    enabled: formGeneral?.CardCode ? true : false,
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
    enabled: formGeneral?.CardCode ? true : false,
  });

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
    enabled: formGeneral?.CardCode ? true : false,
  });

  const { data: UnitOfMeasurementGroups } = useQuery({
    queryKey: ["unit_measurement_groups"],
    queryFn: async () => {
      const res = request(
        "GET",
        `/UnitOfMeasurementGroups?$select=Name,AbsEntry,Code`
      )
        .then((res: any) => res?.data?.value)
        .catch((error) => console.log(error));
      return res;
    },
  });

  useEffect(() => {
    // edit
    let data;
    if (Contact) {
      data = {
        itemServiceType:
          Contact?.DocType === "dDocument_Items" ? "Item" : "Service",
        remark: Contact?.Comments || null,
        roundingValue:
          Contact?.RoundingDiffAmount || Contact?.RoundingDiffAmountSC,
        SalesEmployee: Contact?.SalesPersonCode,
        isRounding: Contact?.Rounding === "tYES" ? true : false,
        OwnerId: Contact?.DocumentsOwner,
        totalDiscount: Contact?.DiscountPercent,
        items: Contact.DocumentLines?.map((e: any) => {
          return {
            ItemCode: e.ItemCode,
            ItemName: e.ItemDescription,
            unitPrice: e.UnitPrice,
            qty: e.Quantity,
            total: e.LineTotal,
            discount: e.DiscountPercent,
            taxCode: e.VatGroup,
            uomCode: e.UoMCode,
            rate: e.PriceAfterVAT,
            Code: e.AccountCode,
            description: e.ItemDescription,
            Name: e.ItemDescription,
          };
        }),
      };
    } else {
      data = {
        itemServiceType: "Item",
        totalDiscount: 0,
        totalDiscountValue: 0,
        roundingValue: 0,
      };
    }
    setFormContent(data);
  }, []);

  return (
    <ContactContext.Provider
      value={{
        data,
        TaxCode,
        ContentService,
        UnitOfMeasurementGroups,
        formContent,
        setFormContent,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};
