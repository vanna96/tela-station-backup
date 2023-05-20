import FormCard from '@/components/card/FormCard';
import MUISelect from '@/components/selectbox/MUISelect';
import Owner from '@/components/selectbox/Owner';
import PaymentMethod from '@/components/selectbox/PaymentMethod';
import PaymentTerm from '@/components/selectbox/PaymentTerm';
import ShippingType from '@/components/selectbox/ShippingType';
import { agreementMethodLists, documentStatusList } from '@/constants';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

export interface IGeneralFormProps {
    data: any,
    handlerChange: (key: string, value: any) => void,
    edit?: boolean,
    ref?: React.RefObject<FormCard>,
}

export default function GeneralForm({ data, handlerChange, edit, ref }: IGeneralFormProps) {

    return (
        <FormCard title='General' ref={ref}>
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-1 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Agreement Type</label>
                        <div className=''>
                            <MUISelect
                                items={agreementMethodLists}
                                name="AgreementType"
                                disabled={data?.isApproved}
                                value={data?.AgreementType}
                                onChange={(e) => handlerChange('AgreementType', e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 gap-3'>
                    <div className='flex items-center gap-1 text-sm'>
                        <Checkbox disabled={data?.isApproved} />
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Ignore Price Specified in blanket Agreement</label>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='PayTermsGrpCode' className='text-gray-500 text-[14px]'>Payment Terms</label>
                        <div className=''>
                            <PaymentTerm name="PaymentTerms" disabled={data?.disable['PaymentTermType']} value={data.PaymentTermType} onChange={(e) => handlerChange('PaymentTermType', e.target.value)} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
                        <div className=''>
                            <PaymentMethod type='outgoing' disabled={data?.disable['PaymentMethod']} name="PaymentMethod" value={data.PaymentMethod} onChange={(e) => handlerChange('PaymentMethod', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Shipping Type</label>
                        <div className=''>
                            <ShippingType name="ShippingType" disabled={data?.disable['ShippingType']} value={data.ShippingType} onChange={(e) => handlerChange('ShippingType', e.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='SettlementProbability' className='text-gray-500 text-[14px]'>Settlement Probability %</label>
                        <div className=''>
                            <TextField size='small' defaultValue={data?.SettlementProbability ?? ''} fullWidth className='w-full text-field' type='number' name='SettlementProbability' onBlur={(e) => handlerChange('SettlementProbability', e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Price Mode</label>
                        <div className=''>
                            <MUISelect items={[]} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Status</label>
                        <div className=''>
                            <MUISelect
                                value={data?.Status}
                                items={documentStatusList(data?.Status, edit)}
                                name="Status"
                                disabled={data?.disable['Status']}
                                onChange={(e) => handlerChange('Status', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Owner</label>
                        <div className=''>
                            <Owner name="Owner" value={data.Owner} onChange={(e) => handlerChange('Owner', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex items-center gap-1 text-sm'>
                        <label htmlFor='Renewal' className='text-gray-500 text-[14px]'>Renewall</label>
                        <Checkbox name='Renewal' checked={data.Renewal} onChange={(e) => handlerChange('Renewal', !data.Renewal)} />
                    </div>
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label htmlFor='Code' className='text-gray-500 text-[14px]'>Reminder</label>
                    <div className='grid grid-cols-4 gap-3'>
                        <TextField
                            size='small'
                            type='number'
                            name='RemindTime'
                            fullWidth
                            disabled={!data.Renewal}
                            className={`w-full text-field ${data.Renewal ? '' : 'bg-gray-100'}`}
                            onBlur={(e) => handlerChange('RemindTime', e.target.value)}
                            defaultValue={data?.remindTime ?? ''}

                        />
                        <div className='col-span-2'>
                            <MUISelect
                                className={`${true ? 'bg-gray-100' : ''}`}
                                name="RemindUnit"
                                disabled={!data.Renewal}
                                onChange={(e) => handlerChange('RemindUnit', e.target.value)}
                                value={data?.remindUnit}

                                items={[
                                    { label: 'Day(s)', value: 'D' },
                                    { label: 'Month(s)', value: 'M' },
                                    { label: 'Year(s)', value: 'Y' },
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-1 text-sm">
                    <label htmlFor="Code" className="text-gray-500 text-[14px]">
                        Remark
                    </label>
                    <div className="">
                        {/* <TextField
                            size="small"
                            multiline
                            rows={4}
                            fullWidth
                            name="Remarks"
                            className="w-full "
                            onBlur={(e) => handlerChange('Remarks', e.target.value)}
                        /> */}
                    </div>
                </div>
            </div>
        </FormCard>
    )
}