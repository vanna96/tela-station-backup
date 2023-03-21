import ItemModal from '@/components/modal/ItemModal';
import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { HiOutlineEye, HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight, HiOutlineDocumentAdd, HiOutlineChevronDown } from "react-icons/hi";
import VendorModal from '../modal/VendorModal';
import GLAccountModal from '../modal/GLAccountModal';
import ProjectModal from '../modal/ProjectModal';
import BusinessPartner from '../../models/BusinessParter';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../button/BackButton';
import Project from '@/models/Project';
import Item from '@/models/Item';

interface CoreFormDocumentState {
    collapse: boolean,
    isOpenItem: boolean,
    isOpenVendor: boolean,
    isOpenAccount: boolean,
    isOpenProject: boolean,
    renewal: boolean,
    cardCode?: string | undefined | null,
    cardName?: string | undefined | null,
    contactPersonCode?: number | undefined | null,
    phone?: string | undefined | null,
    email?: string | undefined | null,
    owner?: string | undefined | null,
    buyer?: string | undefined | null,
    shippingType?: number | undefined | null,
    paymentTermType?: string | undefined | null,
    paymentMethod?: string | undefined | null,
    currency?: string | undefined | null,
    vendorRef?: string | undefined | null,
    documentStatus?: string | undefined | null,
    remark?: string | undefined | null,
    description?: string | undefined | null,
    documentServiceItemType?: string | undefined | null,
    attachmentEntry?: null,
    project?: string | undefined | null,
    contactPersonList?: any[],
    items?: any[],
    services?: any[],
    attachments?: any[]
}

export default abstract class CoreFormDocument extends React.Component<any, CoreFormDocumentState> {

    protected constructor(props: any) {
        super(props);

        this.state = {
            collapse: true,
            cardCode: '',
            cardName: '',
            contactPersonCode: undefined,
            contactPersonList: [],
            phone: '',
            email: '',
            owner: '',
            buyer: '',
            vendorRef: '',
            documentStatus: 'Open',
            remark: '',
            description: '',
            documentServiceItemType: 'I',
            attachmentEntry: null,
            project: '',
            isOpenItem: false,
            isOpenVendor: false,
            isOpenAccount: false,
            isOpenProject: false,
            shippingType: undefined,
            paymentMethod: '',
            paymentTermType: '',
            currency: '',
            renewal: false,
            items: [],
        }

        this.handlerConfirmVendor = this.handlerConfirmVendor.bind(this)
        this.handlerConfirmVendor = this.handlerConfirmVendor.bind(this)
        this.handlerConfirmItem = this.handlerConfirmItem.bind(this)
    }

    abstract FormRender(): JSX.Element;

    render() {

        return (
            <>
                <ItemModal open={this.state.isOpenItem} onClose={() => this.handlerCloseItem()} type='purchase' onOk={this.handlerConfirmItem} />
                <VendorModal open={this.state.isOpenVendor} onOk={this.handlerConfirmVendor} onClose={() => this.handlerCloseVendor()} type='customer' />
                <GLAccountModal open={this.state.isOpenAccount} onClose={() => this.handlerCloseAccount()} />
                <ProjectModal open={this.state.isOpenProject} onClose={() => this.handlerCloseProject()} onOk={(project) => this.handlerConfirmProject(project)} />

                <div className='bg-gray-100 flex flex-col  w-full h-full p-4 relative'>
                    <div className="rounded-lg px-6 py-4 flex items-center justify-between gap-3 sticky border-b top-2 backdrop-blur-md bg-white shadow-sm xl:text-sm font-bold z-20">
                        <div className="flex gap-3 items-center">
                            {/* <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3"><FaArrowLeft /></div> */}
                            <BackButton />
                            <div>Purchase Agreement</div>
                        </div>

                        <div className="px-3 flex items-center gap-3">
                            <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiOutlineDocumentAdd className="" /></div>
                            <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiOutlineEye className="" /></div>
                            <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronDoubleLeft className="" /></div>
                            <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronLeft className="" /></div>
                            <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronRight className="" /></div>
                            <div role="button" className=" hover:bg-gray-200 rounded-lg p-2 px-3 text-base border hover:text-blue-500"><HiChevronDoubleRight className="" /></div>
                        </div>

                        <div role="button"
                            onClick={() => this.handlerCollapse()}
                            className={`hover:border absolute left-[45%] -bottom-4 p-[8px] bg-white hover:bg-gray-200 border shadow rounded-full text-xl text-gray-600 transition-all transform duration-200 delay-100 ${this.state.collapse ? 'rotate-0' : 'rotate-180'}`}> <HiOutlineChevronDown /></div>
                    </div>

                    <div className={`w-full p-3 flex justify-between gap-3 stick ${this.state.collapse ? '' : 'hidden'} transition-transform  delay-100 duration-200  my-3 rounded-lg xl:text-sm font-bold bg-white shadow-sm border z-10`}>
                        <div></div>
                        <div className="flex items-center">
                            <div role='button' className={`p-2 px-4 flex flex-col ${false ? 'border-b-[3px] border-blue-500' : ''}`}
                            >
                                <span className="">General</span>
                            </div>
                            <div role='button' className={`p-2 px-4 flex flex-col ${false ? 'border-b-[3px] border-blue-500' : ''}`}>Content</div>
                            <div role='button' className={`p-2 px-4 flex flex-col ${false ? 'border-b-[3px] border-blue-500' : ''}`}>Attachment</div>
                        </div>
                    </div>




                    <div className={`grow flex flex-col gap-4 w-full ${this.state.collapse ? '' : 'mt-4'}`}>
                        <this.FormRender />
                        <div className='mt-4'></div>
                    </div>


                </div>
            </>
        );
    }


    protected handlerCollapse() {
        this.setState({ ...this.state, collapse: !this.state.collapse })
    }

    protected handlerOpenItem() {
        this.setState({ ...this.state, isOpenItem: true })
    }

    protected handlerConfirmItem(data: any[]) {
        this.setState({ ...this.state, isOpenItem: false, items: [...data] })
    }

    private handlerCloseItem() {
        // this.setState({ ...this.state, isOpenItem: false })
    }

    // handler vendor 
    protected handlerConfirmVendor(record: BusinessPartner) {
        this.setState({
            ...this.state,
            cardCode: record.cardCode,
            cardName: record.cardName,
            contactPersonCode: record.contactEmployee!.length > 0 ? record.contactEmployee![0].id : undefined,
            contactPersonList: record.contactEmployee,
            email: record.email,
            phone: record.phone,
            shippingType: record.shippingType,
            paymentTermType: record.paymentTermTypeCode,
            paymentMethod: record.paymentMethod,
            isOpenProject: false,
            isOpenVendor: false,
            currency: record.currency,
        });
    }

    protected handlerOpenVendor() {
        this.setState({ ...this.state, isOpenVendor: true })
    }

    private handlerCloseVendor() {
        // this.setState({ ...this.state, isOpenVendor: false })
    }

    // List Account modal
    protected handlerOpenAccount() {
        this.setState({ ...this.state, isOpenAccount: true })
    }

    private handlerCloseAccount() {
        this.setState({ ...this.state, isOpenAccount: false })
    }

    // List Project modal
    protected handlerOpenProject() {
        this.setState({ ...this.state, isOpenProject: true })
    }

    private handlerCloseProject() {
        // this.setState({ ...this.state, isOpenProject: false })
    }

    protected handlerConfirmProject(record: Project) {
        this.setState({
            ...this.state,
            project: record.code,
            isOpenProject: false,
        });

        console.log(this.state.project)
    }


    protected handlerChange(key: string, value: any) {
        let temps: any = { ...this.state };
        temps[key] = value;
        this.setState(temps)
    }
}