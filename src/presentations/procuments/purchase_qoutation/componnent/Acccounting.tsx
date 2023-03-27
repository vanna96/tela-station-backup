import FormCard from '@/components/card/FormCard';
import MUISelect from '@/components/selectbox/MUISelect';
import Owner from '@/components/selectbox/Owner';
import PaymentMethod from '@/components/selectbox/PaymentMethod';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import ShippingType from '@/components/selectbox/ShippingType';
import MUITextField from '@/components/input/MUITextField';
import PaymentTerm from '@/components/selectbox/PaymentTerm';
import MUIDatePicker from '@/components/input/MUIDatePicker';

export interface IAccountingFormProps {
  data: any,
  handlerChange: (key: string, value: any) => void
  handlerOpenProject?: () => void
}



export default function Accounting({ data, handlerChange, handlerOpenProject }: IAccountingFormProps) {
  return (
    <FormCard title='ACCOUNTING'>
      <div className='flex flex-col gap-3 mt-2'>
        <div>
          <MUITextField label="Journal Remark" value={`Purchase Order - ${data?.BPCode ?? ""}`} name="JournalMemo" />

        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Payment Term
            </label>
            <PaymentTerm
              onChange={(e) => handlerChange('paymentTerm', e.target.value)}
              value={data?.paymentTerm}
              name="PaymentGroupCode"
            />
          </div>
          <div>
            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
            <div className=''>
              <PaymentMethod type='incoming' name="PaymentMethod" value={data.paymentMethod} onChange={(e) => handlerChange('paymentMethod', e.target.value)} />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
              Manually Rcalculate Due Date
            </label>

            <MUISelect
              items={[
                { value: "E", name: "Month End" },
                { value: "H", name: "Half Month" },
                { value: "Y", name: "Month Start" },
              ]}
              aliaslabel='name'
              aliasvalue='value'
              name="AgreementMethod"
              value={data.agreementMethod}
              onChange={(e) => handlerChange('agreementMethod', e.target.value)}
            />

          </div>
          <div className='grid grid-cols-2 gap-3'>
            <MUITextField label="Month +" value={data.extraMonth} name="ExtraMonth"/>
            <MUITextField label="Days" value={data.extraDays} name="ExtraDays"/>

          </div>
        </div>
        <div className='grid grid-cols-1 gap-3'>
          <MUITextField label="Cash Discount Date Offsetys" value={''} name="CashDiscountDateOffset"/>

        </div>
      </div>
      <div className='flex flex-col gap-3 mt-2'>
        <div className='grid grid-cols-1'>
          <div>
            <MUITextField label="Project" name="Project" value={data.project} endAdornment={true} onClick={handlerOpenProject} />
          </div>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Create QR Code From:
            </label>
            <div className="">
              <TextField
                size="small"
                multiline
                rows={4}
                fullWidth
                name="CreateQRCodeFrom"
                className="w-full "
                value={data?.createQRCodeFrom }
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Cancellation Date
            </label>
            <div className="">
              <MUIDatePicker value={data.cancelDate} name="CancelDate" onChange={(e: any) => handlerChange('cancelDate', e)} />
            </div>
          </div>
          <div>
            <MUITextField
              label="Indicator"
              value={data.indicator}
              name="Indicator"
            />
          </div>
          <div>
            <MUITextField label="Federal Tax ID" value={data.federalTaxID}
              name="FederalTaxID"
            />
          </div>
          <div>
            <MUITextField label="Order Number:" value={data?.ImportFileNum} name="importFileNum"/>
          </div>
        </div>
      </div>

    </FormCard>
  )
}