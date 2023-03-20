import FormCard from '@/components/card/FormCard';
import MUISelect from '@/components/selectbox/MUISelect';
import Owner from '@/components/selectbox/Owner';
import PaymentMethod from '@/components/selectbox/PaymentMethod';
import PaymentTerm from '@/components/selectbox/PaymentTerm';
import ShippingType from '@/components/selectbox/ShippingType';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export interface IGeneralFormProps {
}

export default class GeneralForm extends React.Component<IGeneralFormProps> {
    public render() {
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
                                />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-1 gap-3'>
                        <div className='flex items-center gap-1 text-sm'>
                            <Checkbox />
                            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Ignore Price Specified in blanket Agreement</label>

                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-1 text-sm'>
                            <label htmlFor='PayTermsGrpCode' className='text-gray-500 text-[14px]'>Payment Terms</label>
                            <div className=''>
                                <PaymentTerm name="PaymentTerms" />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 text-sm'>
                            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
                            <div className=''>
                                <PaymentMethod type='incoming' name="PaymentMethod" />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex flex-col gap-1 text-sm'>
                            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Shipping Type</label>
                            <div className=''>
                                <ShippingType name="ShippingType" />
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
                                    items={[{ value: 'D', label: 'Draft' }, { value: 'A', label: 'Approved' }]}
                                    name="Status"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 text-sm'>
                            <label htmlFor='Code' className='text-gray-500 text-[14px]'>Owner</label>
                            <div className=''>
                                <Owner name="Owner" />
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-3'>
                        <div className='flex items-center gap-1 text-sm'>
                            <label htmlFor='Renewal' className='text-gray-500 text-[14px]'>Renewall</label>
                            <Checkbox name='Renewal' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 text-sm'>
                        <label htmlFor='Code' className='text-gray-500 text-[14px]'>Reminder</label>
                        <div className='grid grid-cols-3 gap-3'>
                            <TextField size='small' type='number' name='RemindTime' fullWidth className={`w-full text-field ${true ? '' : 'bg-gray-100'}`} />
                            <div className='col-span-2'>
                                <MUISelect
                                    className={`${true ? 'bg-gray-100' : ''}`}
                                    name="RemindUnit"
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
        );
    }
}
