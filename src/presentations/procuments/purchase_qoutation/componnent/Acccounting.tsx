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
          <MUITextField label="Journal Remark" value={`Purchase Order - ${data?.journalMemo ?? "N/A"}`}
            name="JournalMemo"
            onChange={(e) => handlerChange('journalMemo', e.target.value)}
          />

        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Payment Term
            </label>
            <PaymentTerm
              onChange={(e) => handlerChange('paymentGroupCode', e.target.value)}
              value={data?.paymentGroupCode ?? "N/A"}
              name="PaymentGroupCode"
            />
          </div>
          <div>
            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
            <div className=''>
              <PaymentMethod type='outgoing' name="PaymentMethod" value={data.paymentMethod ?? "N/A"} onChange={(e) => handlerChange('paymentMethod', e.target.value)} />
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
              value={data.agreementMethod ?? "N/A"}
              onChange={(e) => handlerChange('agreementMethod', e.target.value)}
            />

          </div>
          <div className='grid grid-cols-2 gap-3'>
            <MUITextField label="Month +" onChange={(e) => handlerChange('extraMonth', e.target.value)} value={data.extraMonth ?? "N/A"}  name="ExtraMonth" />
            <MUITextField label="Days" onChange={(e) => handlerChange('extraDays', e.target.value)} value={data.extraDays ?? "N/A"} name="ExtraDays" />

          </div>
        </div>
        <div className='grid grid-cols-1 gap-3'>
          <MUITextField label="Cash Discount Date Offsetys" value={''} name="CashDiscountDateOffset" />

        </div>
      </div>
      <div className='flex flex-col gap-3 mt-2'>
        <div className='grid grid-cols-1'>
          <div>
            <MUITextField label="Project" onChange={(e) => handlerChange('project', e.target.value)} name="Project" value={data.project ?? "N/A"} endAdornment={true} onClick={handlerOpenProject} />
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
                value={data?.createQRCodeFrom ?? "N/A"}
                onChange={(e) => handlerChange('createQRCodeFrom', e.target.value)}
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
              onChange={(e) => handlerChange('indicator', e.target.value)}
            />
          </div>
          <div>
            <MUITextField label="Federal Tax ID" value={data.federalTaxID}
              name="FederalTaxID"
              onChange={(e) => handlerChange('federalTaxID', e.target.value)}
            />
          </div>
          <div>
            <MUITextField label="Order Number:" value={data?.importFileNum} name="ImportFileNum"
              onChange={(e) => handlerChange('importFileNum', e.target.value)}
            />
          </div>
        </div>
      </div>

    </FormCard>
  )
}