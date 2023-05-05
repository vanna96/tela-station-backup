import React, { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";
import MUITextField from "@/components/input/MUITextField";
import BussinessPartnersRepository from "@/services/actions/bussinessPartnerRepositorys";
import { Button } from "@mui/material";
import MUISelect from "@/components/selectbox/MUISelect";
import Modal from "@/components/modal/Modal";
type AdddressType = 'shipTO' | 'payTo' ;


interface addressModalProps {
  open: boolean;
  onClose: () => void;
  onOk: (address: any[]) => void;
  type: AdddressType;
}

const AddressModal: FC<addressModalProps> = ({ open, onClose, onOk, type }: any) => {
  const [address, setAddress] = useState<any>({});

  const { data, isLoading }: any = useQuery({
    queryKey: ["address"],
    queryFn: () => new BussinessPartnersRepository().get(),
    staleTime: Infinity,
  });

  const handlerConfirm = () => {
    onOk(address);
    console.log(address);
  };

  const handlerChange = (key: any, value: any) => {
    let contact = address;
    contact[key] = value;
    setAddress(contact);
  };

  return (
    <Modal
      open={open}
      onOk={handlerConfirm}
      onClose={onClose}
      widthClass="w-[50%]"
      title="BPAddresses"
      disableTitle={true}
      disableFooter={true}
    >
      <div className="grid grid-cols-2 gap-3">
        <MUITextField
          label="Address ID"
          value={data?.addressName}
          name="AddressName"
          onChange={(e: any) => handlerChange("addressName", e.target.value)}
        />
        <MUITextField
          label="Address Name2"
          value={data?.addressName2}
          name="AddressName2"
          onChange={(e: any) => handlerChange("addressName2", e.target.value)}
        />
        <MUITextField
          label="Address Name3"
          value={data?.addressName3}
          name="AddressName3"
          onChange={(e: any) => handlerChange("addressName3", e.target.value)}
        />
        <MUITextField
          label="Street / PO Box"
          value={data?.street}
          name="Street"
          onChange={(e: any) => handlerChange("street", e.target.value)}
        />
        <MUITextField
          label="Block"
          value={data?.block}
          name="Block"
          onChange={(e: any) => handlerChange("block", e.target.value)}
        />
        <MUITextField
          label="City"
          value={data?.city}
          name="City"
          onChange={(e: any) => handlerChange("city", e.target.value)}
        />
        <MUITextField
          label="Zip Code"
          value={data?.zipCode}
          name="Zip Code"
          onChange={(e: any) => handlerChange("zipCode", e.target.value)}
        />
        <MUITextField
          label="County"
          value={data?.county}
          name="County"
          onChange={(e: any) => handlerChange("county", e.target.value)}
        />
        <MUITextField
          label="State"
          value={data?.state}
          name="State"
          onChange={(e: any) => handlerChange("state", e.target.value)}
        />
        <MUITextField
          label="Country / Region"
          value={data?.country}
          name="Country"
          onChange={(e: any) => handlerChange("country", e.target.value)}
        />
        <MUITextField
          label="Street No."
          value={data?.streetNo}
          name="Street No."
          onChange={(e: any) => handlerChange("streetNo", e.target.value)}
        />
        <MUITextField
          label="Building/Floor/Room"
          value={data?.buildingFloorRoom}
          name="Building/Floor/Room"
          onChange={(e: any) =>
            handlerChange("buildingFloorRoom", e.target.value)
          }
        />
      </div>
      <div className=" text-end mt-5">
        <Button variant="contained" type="button" onClick={handlerConfirm}>
          Ok
        </Button>
      </div>
    </Modal>
  );
};

export default AddressModal;
