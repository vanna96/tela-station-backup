import FormCard from '@/components/card/FormCard';
import MUISelect from '@/components/selectbox/MUISelect';
import Owner from '@/components/selectbox/Owner';
import PaymentMethod from '@/components/selectbox/PaymentMethod';
import PaymentTerm from '@/components/selectbox/PaymentTerm';
import ShippingType from '@/components/selectbox/ShippingType';
import { documentStatusList } from '@/constants';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export interface IGeneralFormProps {
    data: any,
    handlerChange: (key: string, value: any) => void,
    edit?: boolean,
}

export default function GeneralForm({ data, handlerChange, edit }: IGeneralFormProps) {
    return (
        <FormCard title='General'>
            <div className='flex flex-col gap-2'>
                <div className='grid grid-cols-1 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Agreement Type</label>
                        <div className=''>
                            <MUISelect
                                items={[{ value: 'G', label: 'General' }, { value: 'S', label: 'Specific' }]}
                                name="AgreementType"
                                disabled={data?.isApproved}
                                value={data?.agreementType}
                                onChange={(e) => handlerChange('agreementType', e.target.value)}
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
                            <PaymentTerm name="PaymentTerms" disabled={data?.isApproved} value={data.paymentTermType} onChange={(e) => handlerChange('paymentTermType', e.target.value)} />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
                        <div className=''>
                            <PaymentMethod type='outgoing' name="PaymentMethod" value={data.paymentMethod} onChange={(e) => handlerChange('paymentMethod', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Shipping Type</label>
                        <div className=''>
                            <ShippingType name="ShippingType" disabled={data?.isApproved} value={data.shippingType} onChange={(e) => handlerChange('shippingType', e.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='SettlementProbability' className='text-gray-500 text-[14px]'>Settlement Probability %</label>
                        <div className=''>
                            <TextField size='small' fullWidth className='w-full text-field' type='number' name='SettlementProbability' />
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
                                value={data?.status}
                                items={documentStatusList(data?.status, edit)}
                                name="Status"
                                disabled={data?.status === 'T' && edit && data?.isApproved}
                                onChange={(e) => handlerChange('status', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Owner</label>
                        <div className=''>
                            <Owner name="Owner" value={data.owner} onChange={(e) => handlerChange('owner', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex items-center gap-1 text-sm'>
                        <label htmlFor='Renewal' className='text-gray-500 text-[14px]'>Renewall</label>
                        <Checkbox name='Renewal' checked={data.renewal} onChange={(e) => handlerChange('renewal', !data.renewal)} />
                    </div>
                </div>

                <div className='flex flex-col gap-1 text-sm'>
                    <label htmlFor='Code' className='text-gray-500 text-[14px]'>Reminder</label>
                    <div className='grid grid-cols-3 gap-3'>
                        <TextField
                            size='small'
                            type='number'
                            name='RemindTime'
                            fullWidth
                            disabled={!data.renewal}
                            className={`w-full text-field ${data.renewal ? '' : 'bg-gray-100'}`}
                            onBlur={(e) => handlerChange('remindTime', e.target.value)}
                            value={data?.remindTime}

                        />
                        <div className='col-span-2'>
                            <MUISelect
                                className={`${true ? 'bg-gray-100' : ''}`}
                                name="RemindUnit"
                                disabled={!data.renewal}
                                onChange={(e) => handlerChange('remindUnit', e.target.value)}
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
                        <TextField
                            size="small"
                            multiline
                            rows={4}
                            fullWidth
                            name="Remarks"
                            className="w-full "
                        />
                    </div>
                </div>
            </div>
        </FormCard>
    )
}