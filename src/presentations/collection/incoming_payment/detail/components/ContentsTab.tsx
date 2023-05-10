import shortid from "shortid";
import { LabelText } from "./Label";
import { numberWithCommas } from "@/helper/helper";

type ContentsTabProps = {
  data?: any;
  SalesPerson?: any;
  EmployeesInfo?: any;
  customerInvoice?: any;
};

export const ContentsTab = ({ data, customerInvoice }: ContentsTabProps) => {
  const userType = data?.DocType.replace("r", "");
  const isAccount = userType === "Account";
  let tax = 0;
  let total = 0;

  if (isAccount)
    return (
      <>
        <div>
          <table className="w-full table ">
            <thead>
              <tr>
                {[
                  "G/L Account",
                  "G/L ACCOUNT NAME",
                  "TAX CODE",
                  "NET AMOUNT",
                ].map((e) => (
                  <th
                    key={e}
                    className="bg-gray-100 p-2 font-semibold text-sm text-left"
                  >
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.PaymentAccounts?.map((e: any) => {
                tax += parseFloat(e?.VatAmount);
                total += parseFloat(e?.SumPaid);

                return (
                  <tr key={shortid.generate()} className="text-sm border">
                    <td className="p-2">{e?.AccountCode}</td>
                    <td className="p-2">{e?.AccountName}</td>
                    <td className="p-2">{e?.VatGroup}</td>
                    <td className="p-2">
                      {(e?.SumPaidFC || e?.SumPaid).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <LabelText
            label="Net Total"
            text={(
              (total || 0) * (data?.DocCurrency === "AUD" ? 1 : data?.DocRate)
            ).toFixed(2)}
          />
          <LabelText
            label="Tax"
            text={(
              (tax || 0) * (data?.DocCurrency === "AUD" ? 1 : data?.DocRate)
            ).toFixed(2)}
          />

          {/* <LabelText label="Total Amount Due" text="" /> */}
        </div>
      </>
    );

  return (
    <>
      <div>
        <table className="w-full table ">
          <thead>
            <tr>
              {[
                "Selected",
                "Document No",
                "Date",
                "Total",
                "Balance Due",
                "Blocked",
                "Cash Discount %",
                "Total Payment",
              ].map((e) => (
                <th
                  key={e}
                  className="bg-gray-100 p-2 font-semibold text-sm text-left"
                >
                  {e}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data?.PaymentInvoices?.map((e: any, index: number) => {
              const existInvoice = customerInvoice?.find(
                ({ DocEntry, DocumentStatus }: any) =>
                  DocEntry === e.DocEntry && DocumentStatus === "bost_Open"
              );

              const ClosedInvoice = customerInvoice?.find(
                ({ DocEntry, DocumentStatus }: any) =>
                  DocEntry === e.DocEntry && DocumentStatus === "bost_Close"
              );

              const exchangeRate = e?.DocRate === 0 ? 1 : e?.DocRate;

              const currency =
                existInvoice?.DocCurrency ||
                ClosedInvoice?.DocCurrency ||
                e?.DocCurrency;

              return (
                <tr key={shortid.generate()} className="text-sm border">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    {existInvoice?.DocNum || ClosedInvoice?.DocNum || e?.DocNum}
                  </td>
                  <td className="p-2">{data?.DocDate?.split("T")[0]}</td>
                  <td className="p-2">
                    {currency}{" "}
                    {numberWithCommas(
                      (
                        (existInvoice?.DocTotal ||
                          ClosedInvoice?.DocTotal ||
                          0) * exchangeRate
                      ).toFixed(2)
                    )}
                  </td>
                  <td className="p-2">
                    {currency}{" "}
                    {numberWithCommas(
                      (
                        (parseFloat(
                          existInvoice?.DocTotal || ClosedInvoice?.DocTotal || 0
                        ) - existInvoice?.PaidToDate || 0) * exchangeRate
                      ).toFixed(2)
                    )}
                  </td>
                  <td className="p-2">{e?.DiscountPercent || 0}</td>
                  <td className="p-2"></td>
                  <td className="p-2">
                    {numberWithCommas(
                      (e?.AppliedFC || e?.AppliedSys).toFixed(2)
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="my-3">
        <LabelText
          label="Remarks"
          text={data?.Remarks ? data?.Remarks : "N/A"}
        />
        <LabelText
          label="Journal"
          text={data?.JournalRemarks ? data?.JournalRemarks : "N/A"}
        />
        <LabelText
          label="Total Amount Due"
          text={`${
            (parseFloat(data?.CashSum) +
              parseFloat(data?.TransferSum) +
              parseFloat(
                data?.PaymentChecks?.reduce(
                  (accumulator: any, object: any) =>
                    accumulator + parseFloat(object.CheckSum || 0),
                  0
                )
              )) *
            (data?.DocRate || 1)
          }`}
        />
      </div>
    </>
  );
};
