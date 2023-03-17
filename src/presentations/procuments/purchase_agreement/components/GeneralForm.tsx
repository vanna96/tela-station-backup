// import React from 'react'
// import TextField from '@mui/material/TextField'
// import { IoChevronForwardSharp } from "react-icons/io5";
// import { Checkbox } from '@mui/material';
// import Owner from '../../../../components/selectbox/Owner';

// export default function GeneralForm({ formData, setFormData })
// {
//     const [collapse, setCollapse] = React.useState(true);

//     const handlerChange = (event, field) =>
//     {
//         let temps = { ...formData };
//         let val = event.target.value;

//         if (event.target?.checked)
//             val = !event.target?.value;

//         temps[field] = val;
//         console.log(event.target?.checked);
//         setFormData(temps)
//     };

//     return (
//         <div className='flex flex-col gap-4 bg-white rounded-lg p-4 pb-8 shadow'>
//             <div role='button' className='font-bold text-xl flex justify-between items-center p-2 px-4 rounded hover:bg-gray-100'
//                 onClick={() => setCollapse(!collapse)}
//             >
//                 <h2>General</h2>
//                 <div role='button' className={`${ collapse ? 'rotate-90' : 'rotate-0' }  rounded-full  duration-150 `}>
//                     <IoChevronForwardSharp />
//                 </div>
//             </div>
//             <hr />
//             <div className={`grid grid-cols-2 md:grid-cols-1 gap-10 rounded-lg px-4 ${ collapse ? '' : 'h-[0rem]' } overflow-hidden transition-height duration-300 `}>
//                 <div className='flex flex-col gap-2'>
//                     <div className='grid grid-cols-1 gap-3'>
//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='Code' className='text-gray-500 text-[14px]'>Agreement Type</label>
//                             <div className=''>
//                                 <MUISelect
//                                     items={[{ value: 'G', label: 'General' }, { value: 'S', label: 'Specific' }]}
//                                     value={formData?.AgreementType ?? 'S'}
//                                     onChange={(event) => handlerChange(event, 'AgreementType')}
//                                     name="AgreementType"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='grid grid-cols-1 gap-3'>
//                         <div className='flex items-center gap-1 text-sm'>
//                             <Checkbox checked={formData?.AgreementType === 'G'} />
//                             <label htmlFor='Code' className='text-gray-500 text-[14px]'>Ignore Price Specified in blanket Agreement</label>

//                         </div>
//                     </div>

//                     <div className='grid grid-cols-2 gap-3'>
//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='PayTermsGrpCode' className='text-gray-500 text-[14px]'>Payment Terms</label>
//                             <div className=''>
//                                 <PaymentTerm value={formData?.PaymentTerms} key={formData?.PaymentTerms} name="PaymentTerms" />
//                             </div>
//                         </div>

//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='Code' className='text-gray-500 text-[14px]'>Payment Method </label>
//                             <div className=''>
//                                 <PaymentMethod type={PAYMENT_TYPE.OUTGOING} value={formData?.PaymentMethod} key={formData?.PaymentMethod} name="PaymentMethod" />
//                             </div>
//                         </div>
//                     </div>


//                     <div className='grid grid-cols-2 gap-3'>
//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='Code' className='text-gray-500 text-[14px]'>Shipping Type</label>
//                             <div className=''>
//                                 <ShippingType value={formData?.ShippingType} key={formData?.ShippingType} name="ShippingType" />
//                             </div>
//                         </div>
//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='SettlementProbability' className='text-gray-500 text-[14px]'>Settlement Probability %</label>
//                             <div className=''>
//                                 <TextField size='small' fullWidth className='w-full text-field' type='number' name='SettlementProbability' />
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//                 <div className='flex flex-col gap-2'>
//                     <div className='grid grid-cols-2 gap-3'>
//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='Code' className='text-gray-500 text-[14px]'>Status</label>
//                             <div className=''>
//                                 <MUISelect
//                                     items={[{ value: 'D', label: 'Draft' }, { value: 'A', label: 'Approved' }]}
//                                     value={formData?.Status ?? 'D'}
//                                     onChange={(event) => handlerChange(event, 'AgreementType')}
//                                     name="Status"
//                                 />
//                             </div>
//                         </div>

//                         <div className='flex flex-col gap-1 text-sm'>
//                             <label htmlFor='Code' className='text-gray-500 text-[14px]'>Owner</label>
//                             <div className=''>
//                                 <Owner key={formData?.OwnerCode} value={formData?.OwnerCode} onChange={(event) => handlerChange(event, 'OwnerCode')} name="Owner" />
//                             </div>
//                         </div>
//                     </div>

//                     <div className='grid grid-cols-2 gap-3'>
//                         <div className='flex items-center gap-1 text-sm'>
//                             <label htmlFor='Renewal' className='text-gray-500 text-[14px]'>Renewall</label>
//                             <Checkbox value={formData?.Renewal ? 'Y' : 'N'} name='Renewal' onChange={(event) => handlerChange(event, 'Renewal')} />
//                         </div>
//                     </div>

//                     <div className='flex flex-col gap-1 text-sm'>
//                         <label htmlFor='Code' className='text-gray-500 text-[14px]'>Reminder</label>
//                         <div className='grid grid-cols-3 gap-3'>
//                             <TextField size='small' type='number' defaultValue={formData?.RemindTime} name='RemindTime' fullWidth className={`w-full text-field ${ !formData?.Renewal ? '' : 'bg-gray-100' }`} disabled={formData?.Renewal} />
//                             <div className='col-span-2'>
//                                 <MUISelect
//                                     className={`${ formData?.Renewal ? 'bg-gray-100' : '' }`}
//                                     name="RemindUnit"
//                                     defaultValue={formData?.RemindUnit}
//                                     items={[
//                                         { label: 'Day(s)', value: 'D' },
//                                         { label: 'Month(s)', value: 'M' },
//                                         { label: 'Year(s)', value: 'Y' },
//                                     ]}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-1 text-sm">
//                         <label htmlFor="Code" className="text-gray-500 text-[14px]">
//                             Remark
//                         </label>
//                         <div className="">
//                             <TextField
//                                 size="small"
//                                 multiline
//                                 rows={4}
//                                 fullWidth
//                                 name="Remarks"
//                                 className="w-full "
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
