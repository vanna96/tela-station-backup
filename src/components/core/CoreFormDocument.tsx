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
import FormMessageModal from '../modal/FormMessageModal';
import RequesterEmployeeModal from '../modal/RequesterEmployeeModal';
import EmployeesInfo from '@/models/EmployeesInfo';
import Users from '../../models/User';
import RequesterModal from '../modal/RequesterModal';
import VatGroupRepository from '@/services/actions/VatGroupRepository';
import GLAccount from '@/models/GLAccount';
import Formular from '@/utilies/formular';

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
    cardCode?: any,
    cardName?: any,
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
    isOpenRequester: boolean,
    isOpenRequesterEmployee: boolean,
    department: any,
    branch: any,
    reqType: number,
    docTotalBeforeDiscount: number,
    docTotal: number,
    docDiscountPercent: number | any,
    docDiscountPrice: number | any,
    docTaxTotal: number | any,
    rounded: boolean,
}

export default abstract class CoreFormDocument extends React.Component<any, CoreFormDocumentState> {

    dialog = React.createRef<FormMessageModal>();

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
            isApproved: false,
            isOpenRequester: false,
            isOpenRequesterEmployee: false,
            department: null,
            branch: null,
            reqType: 12,
            docTaxTotal: 0,
            docTotal: 0,
            docTotalBeforeDiscount: 0,
            docDiscountPercent: 0,
            docDiscountPrice: 0,
            rounded: false
        }

        this.handlerConfirmVendor = this.handlerConfirmVendor.bind(this)
        this.handlerConfirmItem = this.handlerConfirmItem.bind(this)
        this.handlerConfirmDistribution = this.handlerConfirmDistribution.bind(this)
        this.handlerConfirmRequestEmployee = this.handlerConfirmRequestEmployee.bind(this)
        this.handlerConfirmRequester = this.handlerConfirmRequester.bind(this);
        this.handlerChangeItems = this.handlerChangeItems.bind(this);
        this.handlerDeleteItem = this.handlerDeleteItem.bind(this);
    }

    abstract FormRender(): JSX.Element;

    render() {

        return (
            <>
                <ItemModal open={this.state.isOpenItem} onClose={() => this.handlerCloseItem()} type='purchase' onOk={this.handlerConfirmItem} />
                <VendorModal open={this.state.isOpenVendor} onOk={this.handlerConfirmVendor} onClose={() => this.handlerCloseVendor()} type={this.state.vendorType} />
                <ProjectModal open={this.state.isOpenProject} onClose={() => this.handlerCloseProject()} onOk={(project) => this.handlerConfirmProject(project)} />
                <DistributionRuleModal open={this.state.showDistribution} onClose={() => { }} inWhichNum={this.state.inWhichDimension} onOk={this.handlerConfirmDistribution} />
                <RequesterEmployeeModal open={this.state.isOpenRequesterEmployee} onOk={this.handlerConfirmRequestEmployee} onClose={() => { }} />
                <RequesterModal open={this.state.isOpenRequester} onOk={this.handlerConfirmRequester} onClose={() => { }} />

                <ToastContainer
                    toastClassName={({ type }: any) => contextClass[type || "default"] +
                        " relative flex p-1 min-h-6 rounded-md justify-between overflow-hidden cursor-pointer"
                    }
                    bodyClassName={() => "text-sm font-white font-med block p-3"}
                />
                <Modal title={this.state.title} open={this.state.showDialogMessage} onClose={() => { }} onOk={() => { }} widthClass='w-[30rem]' >
                    <span className='text-sm'>{this.state.message}</span>
                </Modal>

                <FormMessageModal ref={this.dialog} />

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
        let oldItems = [...this.state.items ?? []];


        this.setState({ ...this.state, isOpenItem: false, items: [...oldItems, ...data] })
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

        if (key === 'agreementMethod' || key === 'docType') {
            temps['items'] = [{}];
        }

        if (key === 'serie') {
            const document = this.state.series.find((e: any) => e.Series === value);
            console.log(document?.NextNumber)
            temps['docNum'] = document?.NextNumber;
        }

        if (key === 'reqType') {
            temps['department'] = null;
            temps['branch'] = null;
            temps['cardCode'] = null
            temps['cardName'] = null
        }

        // discount
        let docDiscountPercent = this.state.docDiscountPercent;
        let docTotalBeforeDiscount = this.state.docTotalBeforeDiscount;
        if (key === 'docDiscountPercent') {
            let discount = parseFloat(value);
            temps['docDiscountPrice'] = discount >= 100 ? 0 : (docTotalBeforeDiscount * value) / 100;
            temps['docDiscountPercent'] = discount > 100 ? 100 : value;
            //
            temps = this.findTotalVatRate(temps);
        }

        if (key === 'docDiscountPrice') {
            const total = parseFloat(value) > docTotalBeforeDiscount;
            docDiscountPercent = total ? 100 : ((value / docTotalBeforeDiscount) * 100);
            temps['docDiscountPercent'] = (docDiscountPercent >= 10 ? docDiscountPercent : docDiscountPercent / 10);
            temps['docDiscountPrice'] = total ? 0 : value;
            temps = this.findTotalVatRate(temps);
        }

        this.setState(temps)
    }

    findTotalVatRate(temps: any) {
        let totalVatRate = temps.items?.reduce((prev: any, current: any) => prev + (current?.vatRate ?? 0), 0);
        const total = temps['docTotalBeforeDiscount'] - temps['docDiscountPrice'];
        totalVatRate = ((temps['docDiscountPrice'] === 0 ? temps.docTotalBeforeDiscount : temps['docDiscountPrice']) * totalVatRate) / 100;
        temps['docTaxTotal'] = temps['docDiscountPrice'] === 0 || total === 0 ? 0 : totalVatRate;
        temps['docTotal'] = total + temps['docTaxTotal'];
        return temps;
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

    protected handlerCloseDialogMessage(cb?: Function) {
        this.setState({
            ...this.state,
            showDialogMessage: false,
        });

        if (cb) {
            cb();
        }
    }

    protected handlerOpenRequester() {
        this.setState({ ... this.state, isOpenRequester: true })
    }

    protected handlerConfirmRequestEmployee(record: EmployeesInfo) {
        this.setState({
            ...this.state,
            isOpenRequesterEmployee: false,
            cardCode: record.id,
            cardName: record.name,
            branch: record.branch,
            department: record.department,
            email: record.email,
        });
    }


    protected handlerOpenRequesterEmployee() {
        this.setState({ ... this.state, isOpenRequesterEmployee: true })
    }

    protected handlerConfirmRequester(record: Users) {
        this.setState({
            ...this.state,
            isOpenRequester: false,
            cardCode: record.code,
            cardName: record.name,
            branch: record.branch,
            department: record.department,
            email: record.email,
        });
    }


    protected handlerChangeItems({ value, record, field }: any) {
        let items = [...this.state.items ?? []];
        let item = this.state.items?.find((e: any) => e?.itemCode === record?.itemCode);
        item[field] = value;
        const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
        if (index > 0) items[index] = item;

        if (field === 'purchaseVatGroup')
            item['vatRate'] = new VatGroupRepository().find(value)?.vatRate;


        if (field === 'quantity' || field === 'unitPrice' || field === 'discountPercent') {
            item['lineTotal'] = Formular.findLineTotal(item['quantity'], item['unitPrice'], item['discountPercent']);

        }

        // total
        let docTotalBeforeDiscount = this.state.docTotalBeforeDiscount;
        let docTaxTotal = this.state.docTaxTotal;
        let docTotal = this.state.docTotal;

        if (field === 'quantity' || field === 'unitPrice' || field === 'discountPercent' || field?.includes('Vat')) {
            docTotalBeforeDiscount = items.reduce((prev, current) => prev + current.lineTotal, 0);
            let total = docTotalBeforeDiscount - this.state.docDiscountPrice;
            docTaxTotal = items.reduce((prev, cur) => prev + (cur?.vatRate ?? 0), 0);
            docTaxTotal = total <= 0 ? 0 : (total * docTaxTotal / 100);
            docTotal = total <= 0 || total === docTotalBeforeDiscount ? 0 : total + docTaxTotal;
        }

        if (field === 'accountCode') {
            const account = value as GLAccount;
            item['accountCode'] = account.code;
            item['accountName'] = account.name;
        } else {
            item[field] = value;
        }


        this.setState({ ...this.state, items, docTotalBeforeDiscount, docTaxTotal, docTotal })
    }

    protected handlerDeleteItem(code: string) {
        let items = [...this.state.items ?? []];
        const index = items.findIndex((e: any) => e?.ItemCode === code);
        items.splice(index, 1)
        this.setState({ ...this.state, items: items })
    }
}
