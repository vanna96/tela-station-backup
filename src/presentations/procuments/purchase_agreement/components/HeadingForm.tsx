import FormCard from '@/components/card/FormCard';
import MUIDatePicker from '@/components/input/MUIDatePicker';
import MUITextField from '@/components/input/MUITextField';
import MUISelect from '@/components/selectbox/MUISelect';
import { ContactEmployee } from '@/models/BusinessParter';
import TextField from '@mui/material/TextField';

export interface IHeadingFormProps {
    handlerOpenVendor: () => void,
    handlerChange: (key: string, value: any) => void;
    data: any,
    handlerOpenProject?: () => void,
    edit?: boolean
}

export default function HeadingForm({ handlerOpenVendor, data, handlerChange, handlerOpenProject, edit }: IHeadingFormProps) {

    return (
        <>
            <FormCard title='Information'>
                <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-3">
                        <MUITextField required label="Vendor Code" value={data?.cardCode} disabled={edit} name="BPCode" onClick={handlerOpenVendor} endAdornment={!edit} />
                        <MUITextField required label="Vendor Name" value={data?.cardName} disabled={edit} name="BPName" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">Contact Person</label>
                            <div className="">
                                <MUISelect
                                    items={data?.contactPersonList?.map((e: ContactEmployee) => ({ id: e.id, name: e.name }))}
                                    onChange={(e) => handlerChange('contactPersonCode', e.target.value)}
                                    value={data?.contactPersonCode}
                                    aliasvalue="id"
                                    aliaslabel="name"
                                    name="ContactPersonCode"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                            <MUITextField label="Vender Ref.No" name="" />
                        </div>
                    </div>

                    <div className="grid grid-cols- gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Currency
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <MUITextField
                                    size="small"
                                    name="BPCurrency"
                                    value={data.currency}
                                    disabled
                                // disabled
                                />
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="Code" className="text-gray-500 text-[14px]">
                            No
                        </label>
                        <div className="grid grid-cols-2 gap-3 ">
                            <MUISelect
                                items={data.series ?? []}
                                aliasvalue="Series"
                                aliaslabel="Name"
                                name="Series"
                                loading={data?.isLoadingSerie}
                                value={data?.serie}
                                disabled={edit}
                                onChange={(e: any) => handlerChange('serie', e.target.value)}
                            />
                            <div className='-mt-1'>
                                <MUITextField size="small" name="DocNum" value={data?.docNum} disabled={edit} placeholder='Document No' />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
                                Agreement Method
                            </label>
                            <div className="">
                                <MUISelect
                                    items={[{ name: 'Item Method', value: 'I' }, { name: 'Monetary Method', value: 'M' }]}
                                    aliaslabel='name'
                                    aliasvalue='value'
                                    name="AgreementMethod"
                                    disabled={edit}
                                    value={data.agreementMethod}
                                    onChange={(e) => handlerChange('agreementMethod', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                Start Date
                            </label>
                            <div className="">
                                <MUIDatePicker disabled={data?.isApproved} error={data?.message?.includes('StartDate')} value={data.startDate} onChange={(e: any) => handlerChange('startDate', e)} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                End Date
                            </label>
                            <div className="">
                                <MUIDatePicker disabled={data?.isApproved} value={data.endDate} onChange={(e: any) => handlerChange('endDate', e)} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='col-span-2'></div> */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 text-sm">
                        <MUITextField label="Tel. No" value={data.phone} disabled={edit} />
                    </div>

                    <div className="flex flex-col gap-1 text-sm">
                        <MUITextField label="Email" value={data.email} disabled={edit} />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <MUITextField label="Project" name="Project" disabled={data?.isApproved} value={data.project} endAdornment={true} onClick={handlerOpenProject} />
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="TerminateDate" className="text-gray-500 text-[14px]">
                                Terminate Date
                            </label>
                            <div className="">
                                <MUIDatePicker value={data?.terminateDate} disabled={edit && !data?.isApproved} onChange={(e: any) => handlerChange('terminateDate', e)} name="TerminateDate" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="SigningDate" className="text-gray-500 text-[14px]">
                            Signing Date
                        </label>
                        <div className="">
                            <MUIDatePicker value={data?.signingDate} disabled={edit} onChange={(e: any) => handlerChange('signingDate', e)} name="SigningDate" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                        <label htmlFor="Code" className="text-gray-500 text-[14px]">
                            Description
                        </label>
                        <div className="">
                            <TextField
                                size="small"
                                multiline
                                rows={4}
                                fullWidth
                                name="Description"
                                className="w-full "
                            />
                        </div>
                    </div>
                </div>
            </FormCard>
        </>
    )
} 