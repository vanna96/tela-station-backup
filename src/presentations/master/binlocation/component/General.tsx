import FormCard from '@/components/card/FormCard';
import MUITextField from '@/components/input/MUITextField';
import MUISelect from '@/components/selectbox/MUISelect';
import Owner from '@/components/selectbox/Owner';
import PaymentMethod from '@/components/selectbox/PaymentMethod';
import PaymentTerm from '@/components/selectbox/PaymentTerm';
import ShippingType from '@/components/selectbox/ShippingType';
import { documentStatusList } from '@/constants';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { log } from 'console';
import * as React from 'react';

export interface IGeneralFormProps {
  data: any,
  handlerChange: (key: string, value: any) => void,
  edit?: boolean,
}

export default function General({ data, handlerChange, edit }: IGeneralFormProps) {
  return (
    <FormCard title='General'>
      <h1>
        <div className="flex items-center text-sm pt-3">
          <Checkbox />
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Active BinLocation
          </label>
        </div>
        <div className="flex items-center text-sm">
          <Checkbox />
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            ExcludeAutoAllocOnIssue
          </label>
        </div>
      </h1>
      <h1>
        <div className="flex items-center text-sm pt-3">
          <Checkbox />
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Receiving BinLocation

          </label>
        </div> </h1>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Item Weight:" value={data?.cardCode} name="" />
          <MUITextField label="No. of Items:" value={data?.cardName} name="" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Alternative Sort Code:" onChange={(e) => handlerChange('alternativeSortCode', e.target.value)}
            value={data?.alternativeSortCode} name="AlternativeSortCode" />
          <MUITextField label="Minimun Quantity:" onChange={(e) => handlerChange('minimumQty', e.target.value)} value={data?.minimumQty} name="MinimumQty" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Maximun Weight:" onChange={(e) => handlerChange('maximunWeight', e.target.value)} value={data?.maximunWeight} name="MaximunWeight" />
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Restricted Item Type
            </label>
            <MUISelect
              items={[
                { value: 0, name: "None" },
                { value: 1, name: "Specific Item" },
                { value: 2, name: "Single Item Only" },
                { value: 3, name: "Specific Item Group" },
                { value: 4, name: "Single Item Group only" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={(e) => handlerChange('restrictedItemType', e.target.value)} value={data?.restrictedItemType ?? 0} name="RestrictedItemType"
            />

          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Batch Restriction
            </label>
            <MUISelect
              items={[
                { value: "N", name: "None" },
                { value: "Y", name: "Single batch" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={(e) => handlerChange('batchRestrictions', e.target.value)} value={data?.batchRestrictions ?? "N"} name="BatchRestrictions" />
          </div>
          <MUITextField label="Item Group:" onChange={(e) => handlerChange('specificItemGroup', e.target.value)} value={data?.specificItemGroup} name="SpecificItemGroup" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Item Quantity:" onChange={(e) => handlerChange('maximunWeigt', e.target.value)} value={data?.cardCode} name="" />
          <MUITextField label="No. of Batches/Serials:" value={data?.cardName} name="" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <MUITextField label="Bar Code:" onChange={(e) => handlerChange('barCode', e.target.value)} value={data?.barCode} name="BarCode" />
          <MUITextField label="Maximun Quantity:" onChange={(e) => handlerChange('maximumQty', e.target.value)} value={data?.maximumQty} name="MaximumQty" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Restricted UoM Type
            </label>
            <MUISelect
              items={[
                { value: 0, name: "None" },
                { value: 1, name: "Specific UoM" },
                { value: 2, name: "Single UoM Only" },
                { value: 3, name: "Specific UoM Group" },
                { value: 4, name: "Single UoM Group only" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={(e) => handlerChange('restrictedUoMType', e.target.value)} value={data?.restrictedUoMType ?? 0} name="RestrictedUoMType" />

          </div>
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Transaction Restriction
            </label>
            <MUISelect
              items={[
                { value: 0, name: "None" },
                { value: 1, name: "All transaction" },
                { value: 2, name: "Inbount Transactions" },
                { value: 3, name: "Outbound Transactions" },
                { value: 4, name: "All Except Inventory Transfer and Counting Transactions" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              onChange={(e) => handlerChange('restrictedTransType', e.target.value)} value={data?.restrictedTransType ?? 0} name="RestrictedTransType" />

          </div>
        </div>
      </div>
    </FormCard>
  )
}