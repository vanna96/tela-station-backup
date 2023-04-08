import { createContext, useContext, useEffect, useState } from "react";
import { GeneralContact } from "./GeneralFormContext";
type GeneralProps = { children: any; Edit?: any };

export const LogisticContext = createContext({});
export const LogisticProvider = ({ children, Edit }: GeneralProps) => {
  const { bussinessPartner }: any = useContext(GeneralContact);
  const [formLogistic, setFormLogistic]: any = useState();

  useEffect(() => {
    setFormLogistic({
      ...setFormLogistic,
      shipTo: Edit?.ShipToCode || bussinessPartner?.ShipToDefault,
      shipToValue: Edit?.Address2 || bussinessPartner?.MailAddress,
      // bussinessPartner?.BPAddresses?.filter(
      //   (ship: any) => ship.AddressType === "bo_ShipTo"
      // ).find((e: any) => e.AddressName === bussinessPartner?.ShipToDefault)
      //   ?.Street,
      payTo: Edit?.PayToCode || bussinessPartner?.BilltoDefault,
      payToValue: Edit?.Address || bussinessPartner?.Address,
      // " " ||
      // bussinessPartner?.BPAddresses?.filter(
      //   (ship: any) => ship.AddressType === "bo_BillTo"
      // ).find((e: any) => e.AddressName === bussinessPartner?.BilltoDefault)
      //   ?.Street,
      pickAndPackRemark: Edit?.PickRemark,
    });
  }, [bussinessPartner]);

  return (
    <LogisticContext.Provider value={{ formLogistic, setFormLogistic }}>
      {children}
    </LogisticContext.Provider>
  );
};
