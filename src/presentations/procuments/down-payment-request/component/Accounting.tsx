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
import IndicatorSelect from '@/components/selectbox/Indicator';

export interface IAccountingFormProps {
  data: any,
  handlerChange: (key: string, value: any) => void,
  handlerOpenProject?: () => void,
  edit: boolean
}



export default function Accounting({ data, handlerChange, handlerOpenProject,edit }: IAccountingFormProps) {
  return (
    <FormCard title='ACCOUNTING'>
      <div className='flex flex-col gap-3 mt-2'>
        <div>
          <MUITextField label="Journal Remark" value={("Purchase Qoutation" ?? data?.journalMemo) || "N/A"}
            name="JournalMemo"
            onChange={(e) => handlerChange('journalMemo', e.target.value)}
          />
        </div>
        {data?.documentStatus === "bost_Open" ? 
          <>
            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                  Payment Term
                </label>
                <PaymentTerm
                  onChange={(e) => handlerChange('paymentGroupCode', e.target.value)}
                  value={data?.paymentGroupCode }
                  name="PaymentGroupCode"
                />
              </div>
              <div>
                <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
                <div className=''>
                  <PaymentMethod type='outgoing' name="PaymentMethod" value={data.paymentMethod } onChange={(e) => handlerChange('paymentMethod', e.target.value)} />
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
                  value={data.agreementMethod }
                  onChange={(e) => handlerChange('agreementMethod', e.target.value)}
                />

              </div>
              <div className='grid grid-cols-2 gap-3'>
                <MUITextField label="Month +" onChange={(e) => handlerChange('extraMonth', e.target.value)} value={data.extraMonth } name="ExtraMonth" />
                <MUITextField label="Days" onChange={(e) => handlerChange('extraDays', e.target.value)} value={data.extraDays } name="ExtraDays" />

              </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <MUITextField  label="Installments:" onChange={(e) => handlerChange('numberOfInstallments', e.target.value)} value={data?.numberOfInstallments} name="NumberOfInstallments" />

              <MUITextField  label="Cash Discount Date Offsetys" value={''} name="CashDiscountDateOffset" />

            </div>
          </> :
          <>
             <div className='grid grid-cols-2 gap-3'>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">
              Payment Term
            </label>
                <PaymentTerm
                  disabled={edit}
              onChange={(e) => handlerChange('paymentGroupCode', e.target.value)}
              value={data?.paymentGroupCode }
              name="PaymentGroupCode"
            />
          </div>
          <div>
            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
            <div className=''>
                  <PaymentMethod disabled={edit} type='outgoing' name="" value={data.paymentMethod } onChange={(e) => handlerChange('paymentMethod', e.target.value)} />
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
                  disabled={edit}
              value={data.agreementMethod }
              onChange={(e) => handlerChange('agreementMethod', e.target.value)}
            />

          </div>
          <div className='grid grid-cols-2 gap-3'>
                <MUITextField disabled={edit} label="Month +" onChange={(e) => handlerChange('extraMonth', e.target.value)} value={data.extraMonth }  name="ExtraMonth" />
                <MUITextField disabled={edit} label="Days" onChange={(e) => handlerChange('extraDays', e.target.value)} value={data.extraDays } name="ExtraDays" />

          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
        <MUITextField disabled={edit} label="Installments:"  onChange={(e) => handlerChange('numberOfInstallments', e.target.value)} value={data?.numberOfInstallments} name="NumberOfInstallments" />

              <MUITextField disabled={edit} label="Cash Discount Date Offsetys" value={''} name="CashDiscountDateOffset" />

        </div>
          </>
      }
       

      </div>
      <div className='flex flex-col gap-3 mt-2'>
        <div className='grid grid-cols-1'>
          <div>
            <MUITextField  label="Project" onChange={(e) => handlerChange('project', e.target.value)} name="Project" value={data.project } endAdornment={true} onClick={handlerOpenProject} />
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
                onChange={(e) => handlerChange('createQRCodeFrom', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <label htmlFor="Code" className="text-gray-500 text-[14px]">Indicator</label>
            <IndicatorSelect
              onChange={(e) => handlerChange('indicator', e.target.value)}
              value={data?.indicator}
              name="Indicator"
            />
          </div>
          <div>
            <MUITextField label="Federal Tax ID" value={data.federalTaxID}
              name="FederalTaxID"
              onChange={(e) => handlerChange('federalTaxID', e.target.value)}
            />
          </div>
          <div className='w-full'>
            <MUITextField label="Order Number:" value={data?.importFileNum} name="ImportFileNum"
              onChange={(e) => handlerChange('importFileNum', e.target.value)}
            />
          </div>
        </div>
      </div>

    </FormCard>
  )
}