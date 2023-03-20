import FormCard from '@/components/card/FormCard';
import MUIDatePicker from '@/components/input/MUIDatePicker';
import MUITextField from '@/components/input/MUITextField';
import MUISelect from '@/components/selectbox/MUISelect';
import TextField from '@mui/material/TextField';
import * as React from 'react';

export interface IHeadingFormProps {
    handlerOpenVendor: () => void,
}

export default class HeadingForm extends React.Component<IHeadingFormProps> {
    constructor(props: any) {
        super(props);


    }


    public render() {
        return (
            <>
                <FormCard title='Information'>
                    <div className="flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-3">
                            <MUITextField label="Vendor Code" name="BPCode" onClick={this.props.handlerOpenVendor} />
                            <MUITextField label="Vendor Name" name="BPName" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <label htmlFor="Code" className="text-gray-500 text-[14px]">Contact Person</label>
                                <div className="">
                                    <MUISelect
                                        items={[]}
                                        aliasvalue="InternalCode"
                                        aliaslabel="Name"
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
                                    <TextField
                                        size="small"
                                        fullWidth
                                        className="w-full text-field bg-gray-100"
                                        name="BPCurrency"
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
                            <div className="grid grid-cols-2 gap-3">
                                <MUISelect
                                    items={[]}
                                    aliasvalue="Series"
                                    aliaslabel="Name"
                                    name="Series"
                                />
                                <TextField size="small" name="DocNum" placeholder='Document No' fullWidth className="w-full text-field" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <label htmlFor="AgreementMethod" className="text-gray-500 text-[14px]">
                                    Agreement Method
                                </label>
                                <div className="">
                                    <MUISelect
                                        items={[]}
                                        name="AgreementMethod"
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
                                    <MUIDatePicker />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1 text-sm">
                                <label htmlFor="Code" className="text-gray-500 text-[14px]">
                                    End Date
                                </label>
                                <div className="">
                                    <MUIDatePicker />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className='col-span-2'></div> */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1 text-sm">
                            <MUITextField label="Tel. No" />
                        </div>

                        <div className="flex flex-col gap-1 text-sm">
                            <MUITextField label="Email" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1 text-sm">
                                <MUITextField label="Project" name="Project" />
                            </div>

                            <div className="flex flex-col gap-1 text-sm">
                                <label htmlFor="TerminateDate" className="text-gray-500 text-[14px]">
                                    Terminate Date
                                </label>
                                <div className="">
                                    <MUIDatePicker name="TerminateDate" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 text-sm">
                            <label htmlFor="SigningDate" className="text-gray-500 text-[14px]">
                                Signing Date
                            </label>
                            <div className="">
                                <MUIDatePicker name="SigningDate" />
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
        );
    }
}
