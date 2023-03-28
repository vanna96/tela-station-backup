import FormCard from '@/components/card/FormCard';
import MUISelect from '@/components/selectbox/MUISelect';
import Owner from '@/components/selectbox/Owner';
import PaymentMethod from '@/components/selectbox/PaymentMethod';
import PaymentTerm from '@/components/selectbox/PaymentTerm';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import ShippingType from '@/components/selectbox/ShippingType';
export interface ILogisticFormProps {
  data: any,
  handlerChange: (key: string, value: any) => void
}



export default function Logistic({ data, handlerChange }: ILogisticFormProps) {
  return (
    <FormCard title='Logistic'>
      <div className='flex flex-col gap-3 mt-2'>
        <div className='grid grid-col-1 '>
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Ship To
          </label>
          <div className="">
            <TextField
              size="small"
              defaultValue={data?.address2 ?? "Level 1 - 168 Walker Street''"}
              multiline
              rows={4}
              fullWidth
              name="Description"
              className="w-full "
            />
          </div>
        </div>
        <div className='grid grid-col-1'>
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Pay To
          </label>
          <div className="">
            <TextField
              size="small"
              multiline
              rows={4}
              fullWidth
              name="Description"
              className="w-full "
              defaultValue={data?.address}
            />
          </div>
        </div>
        <div className='grid grid-col-1'>
          <label htmlFor="Code" className="text-gray-500 text-[14px]">
            Shipping Type
          </label>
          <ShippingType
            onChange={(e) => handlerChange('shippingType', e.target.value)}
            value={data?.shippingType}
            name="TransportationCode"
          />
        </div>
      </div>
    </FormCard>
  )
}