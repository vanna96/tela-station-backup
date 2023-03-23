import { withRouter } from '@/routes/withRouter';
import React, { Component } from 'react'
import { useParams } from 'react-router-dom';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import { PurchaseAgreementProps, PurchaseAgreementDocumentLineProps } from '../../../../models/PurchaseAgreement';
import EditIcon from "@mui/icons-material/Edit";
import { HiOutlineEye, HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineDocumentAdd, HiOutlineChevronDown } from "react-icons/hi";
import Taps from '@/components/button/Taps';


class PurchaseAgreementDetail extends Component<any, PurchaseAgreementProps> {

    constructor(props: any) {
        super(props);

        this.state = {
        } as PurchaseAgreement
    }


    componentDidMount(): void {
        const { id } = this.props.match.params;
        const data = this.props.location.state as PurchaseAgreement;



        this.setState({
            ...data
        })
    }

    render() {
        return (
            <div className='w-full h-full flex flex-col p-4 gap-4'>
                <div className='flex justify-between items-center bg-white p-2 rounded-lg px-6 shadow-sm'>
                    <div className='flex gap-2 items-center'>
                        <h1 className='font-bold'>Purchase Agreement</h1>
                        <span className='text-[12px] border border-blue-400 font-medium  px-2 rounded '>{this.state.status?.replace('as', '')}</span>
                    </div>
                    <div className='text-[12px] flex gap-3'>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 border hover:text-blue-500 text-[12px]">Edit</div>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 border hover:text-blue-500 text-[12px]">Copy To</div>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiOutlineDocumentAdd className="" /></div>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronDoubleLeft className="" /></div>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronLeft className="" /></div>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronRight className="" /></div>
                        <div role="button" className=" hover:bg-gray-200 hover:shadow-sm rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronDoubleRight className="" /></div>
                        <div className='mx-2'></div>
                    </div>
                </div>
                <div className='min-h-[10rem] grid grid-cols-2 gap-2 w-full shadow-sm rounded-lg bg-white text-[12px] p-6'>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>BP Code</span>
                            <span className='w-8/12 font-medium'>: {this.state.cardCode}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>BP Name</span>
                            <span className='w-8/12 font-medium'>: {this.state.cardName}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>Contact Person Code</span>
                            <span className='w-8/12 font-medium'>: {this.state.constactPersonCode}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>Email</span>
                            <span className='w-8/12 font-medium'>: example@email</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>Phone</span>
                            <span className='w-8/12 font-medium'>: +855 21 000 123</span>
                        </div>


                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500 '>Document Numbering</span>
                            <span className='w-8/12 font-medium'>: {this.state.docNum}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>Agreement Type</span>
                            <span className='w-8/12 font-medium'>: {this.state.agreementMethod?.replace('am', '')}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>Contact Person Code</span>
                            <span className='w-8/12 font-medium'>: {this.state.constactPersonCode}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>Start Date</span>
                            <span className='w-8/12 font-medium'>: {this.state.startDate}</span>
                        </div>
                        <div className='flex gap-2'>
                            <span className='w-4/12 text-gray-500'>End Date</span>
                            <span className='w-8/12 font-medium'>: {this.state.endDate}</span>
                        </div>


                    </div>
                </div>
                <div className='grow flex flex-col gap-3 p-6 shadow-sm rounded-lg bg-white'>
                    <Taps
                        items={['General', 'Content', 'Attachment']}
                    >
                        <General data={this.state} />
                        <Content data={this.state} />
                        <Attachment data={this.state} />
                    </Taps>



                </div>
            </div>
        )
    }
}

export default withRouter(PurchaseAgreementDetail);



function General(props: any) {
    const { data }: any = props;

    return <div className='grow w-full grid grid-cols-2 gap-2 text-[12px] py-2'>
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Agreement Type</span> <span className='col-span-2 font-medium'>: {data.agreementType?.replace('at', '')}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Terms</span> <span className='col-span-2 font-medium'>: {data.paymentTerm}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Payment Method</span> <span className='col-span-2 font-medium'>: {data.paymentMethod}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Shipping Type</span> <span className='col-span-2 font-medium'>: {data.shippingType}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Settlement Probability %</span> <span className='col-span-2 font-medium'>: {data.settlementProbability}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Remark</span> <span className='col-span-2 font-medium'>: {data.remark}</span></div>
        </div>
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Status</span> <span className='col-span-2 font-medium'>: {data.status?.replace('as', '')}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Owner</span> <span className='col-span-2 font-medium'>: {data.owner}</span></div>
            <div className='grid grid-cols-3 gap-2'><span className='text-gray-500'>Reminder</span> <span className='col-span-2 font-medium'>: {data.remindTime} {data.remindUnit?.replace('reu_', '')}</span></div>
        </div>
    </div>
}

function Content(props: any) {

    const { data } = props;

    return <div className='w-full h-full my-4'>
        <table className='table w-full'>
            <thead>
                <tr>
                    <th className='text-left text-[12px] font-normal px-2 py-1 border'>Item No</th>
                    <th className='text-left text-[12px] font-normal px-2 py-1 border'>Item Description</th>
                    <th className='text-left text-[12px] font-normal px-2 py-1 border'>Item Group</th>
                    <th className='text-left text-[12px] font-normal px-2 py-1 border'>UoM Group</th>
                    <th className='text-left text-[12px] font-normal px-2 py-1 border'>Quantity</th>
                    <th className='text-left text-[12px] font-normal px-2 py-1 border'>Unit Price</th>
                </tr>
            </thead>
            <tbody>
                {data?.documentLine?.map((e: PurchaseAgreementDocumentLineProps) => <tr>
                    <td className='text-[12px] font-normal px-2 py-1 border-b'>{e.itemNo}</td>
                    <td className='text-[12px] font-normal px-2 py-1 border-b'>{e.itemDescription}</td>
                    <td className='text-[12px] font-normal px-2 py-1 border-b'>{e.itemGroup}</td>
                    <td className='text-[12px] font-normal px-2 py-1 border-b'>{e.uomCode}</td>
                    <td className='text-[12px] font-normal px-2 py-1 border-b'>{e.quantity}</td>
                    <td className='text-[12px] font-normal px-2 py-1 border-b'>{e.unitPrice}</td>
                </tr>)}
            </tbody>
        </table>
    </div>
}

function Attachment(props: any) {
    return <div>Attachment</div>
}