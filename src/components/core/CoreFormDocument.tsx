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
import { Backdrop, CircularProgress } from '@mui/material';
import Modal from '../modal/Modal';
import { ToastContainer, ToastOptions, TypeOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DistributionRuleModal from '../modal/DistributionRuleModal';
import { VendorModalType } from '../modal/VendorModal';

const contextClass: any = {
    success: "bg-blue-600",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
};

type ModelDialog = 'success' | 'error'


export interface CoreFormDocumentState {
    collapse: boolean,
    isOpenItem: boolean,
    isOpenVendor: boolean,
    isOpenAccount: boolean,
    isOpenProject: boolean,
    isLoadingSerie: boolean,
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
    attachments?: any[],
    series: any[],
    serie: any,
    docNum: any,
    isSubmitting: boolean,
    title: string,
    message: string,
    showDialogMessage: boolean,
    inWhichDimension: number,
    showDistribution: boolean,
    vendorType: VendorModalType,
    loading: boolean,
    isApproved: boolean,
}

export default abstract class CoreFormDocument extends React.Component<any, CoreFormDocumentState> {

    protected constructor(props: any) {
        super(props);

        this.state = {
            collapse: true,
            cardCode: null,
            cardName: null,
            contactPersonCode: undefined,
            contactPersonList: [],
            phone: null,
            email: null,
            owner: null,
            buyer: null,
            vendorRef: null,
            documentStatus: 'Open',
            remark: null,
            description: null,
            documentServiceItemType: 'I',
            attachmentEntry: null,
            project: null,
            isOpenItem: false,
            isOpenVendor: false,
            isOpenAccount: false,
            isOpenProject: false,
            shippingType: undefined,
            paymentMethod: null,
            paymentTermType: null,
            currency: null,
            renewal: false,
            items: [],
            series: [],
            serie: '',
            docNum: null,
            isLoadingSerie: true,
            isSubmitting: false,
            message: '',
            showDialogMessage: false,
            title: '',
            showDistribution: false,
            inWhichDimension: 0,
            vendorType: 'customer',
            loading: true,
            isApproved: true,
        }

        this.handlerConfirmVendor = this.handlerConfirmVendor.bind(this)
        this.handlerConfirmVendor = this.handlerConfirmVendor.bind(this)
        this.handlerConfirmItem = this.handlerConfirmItem.bind(this)
        this.handlerConfirmDistribution = this.handlerConfirmDistribution.bind(this)
    }

    abstract FormRender(): JSX.Element;

    render() {

        return (
            <>
                <ItemModal open={this.state.isOpenItem} onClose={() => this.handlerCloseItem()} type='purchase' onOk={this.handlerConfirmItem} />
                <VendorModal open={this.state.isOpenVendor} onOk={this.handlerConfirmVendor} onClose={() => this.handlerCloseVendor()} type={this.state.vendorType} />
                <ProjectModal open={this.state.isOpenProject} onClose={() => this.handlerCloseProject()} onOk={(project) => this.handlerConfirmProject(project)} />
                <DistributionRuleModal open={this.state.showDistribution} onClose={() => { }} inWhichNum={this.state.inWhichDimension} onOk={this.handlerConfirmDistribution} />

                <ToastContainer
                    toastClassName={({ type }: any) => contextClass[type || "default"] +
                        " relative flex p-1 min-h-6 rounded-md justify-between overflow-hidden cursor-pointer"
                    }
                    bodyClassName={() => "text-sm font-white font-med block p-3"}
                />
                <Modal title={this.state.title} open={this.state.showDialogMessage} onClose={() => { }} onOk={() => this.handlerCloseDialogMessage()} widthClass='w-[30rem]' >
                    <span className='text-sm'>{this.state.message}</span>
                </Modal>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.isSubmitting}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <div className='bg-gray-100 flex flex-col  w-full h-full p-4 relative'>
                    <div className=" rounded-lg px-6 py-4 flex items-center justify-between sticky top-3 gap-3  border-b bg-white shadow-sm xl:text-sm font-bold z-20">
                        <div className="flex gap-3 items-center">
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
                            className={`hover:border absolute left-[45%] -bottom-4 p-[8px] bg-white hover:bg-gray-200 border shadow rounded-full text-xl text-gray-600 transition-all transform duration-200 delay-100 ${this.state.collapse ? 'rotate-0' : 'rotate-180'}`}> <HiOutlineChevronDown />
                        </div>
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
            contactPersonList: record.contactEmployee ?? [],
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

    protected handlerOpenVendor(type: VendorModalType) {
        this.setState({ ...this.state, isOpenVendor: true, vendorType: type })
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
    }

    protected showDistribution(dimension: number) {

        this.setState({
            ...this.state,
            showDistribution: true,
            inWhichDimension: dimension
        });
    }

    protected handlerConfirmDistribution(distribution: any) {
        this.setState({
            ...this.state,
            showDistribution: false,
        });
    }


    protected handlerChange(key: string, value: any) {
        let temps: any = { ...this.state };
        temps[key] = value;

        if (key === 'agreementMethod') {
            temps['items'] = [{}];
        }

        if (key === 'serie') {
            const document = this.state.series.find((e: any) => e.Series === value);
            console.log(document?.NextNumber)
            temps['docNum'] = document?.NextNumber;
        }

        this.setState(temps)
    }


    protected toast(message: string, type: TypeOptions) {
        toast(message, {
            position: 'top-right',
            type: type,
            theme: 'colored',
            icon: false,
        })
    }


    protected showMessage(title: string, message: string) {
        this.setState({
            ...this.state,
            title: title,
            message: message,
            showDialogMessage: true,
            isSubmitting: false,
        })
    }

    protected handlerCloseDialogMessage() {
        // this.props.history.goBack();
        this.setState({
            ...this.state,
            showDialogMessage: false,
        })
    }

}