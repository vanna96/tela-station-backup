import ItemModal from '@/components/modal/ItemModal';
import React from 'react'
import VendorModal from '../modal/VendorModal';
import ProjectModal from '../modal/ProjectModal';
import BusinessPartner from '../../models/BusinessParter';
import Project from '@/models/Project';
import { Backdrop, CircularProgress } from '@mui/material';
import Modal from '../modal/Modal';
import { ToastContainer, TypeOptions, toast } from 'react-toastify';
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
import DocumentHeaderComponent from '../DocumenHeaderComponent';
import shortid from 'shortid';
import { documentType } from '@/constants';

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
    Renewal: boolean,
    CardCode?: any,
    CardName?: any,
    ContactPersonCode?: number | undefined | null,
    Phone?: string | undefined | null,
    Email?: string | undefined | null,
    Owner?: any,
    Buyer?: any,
    // shippingType?: number | any | null,
    PaymentTermType?: string | undefined | null,
    PaymentMethod?: string | undefined | null,
    Currency?: string | undefined | null,
    PriceLists?: string | undefined | null,
    SalesPersonCode?: string | undefined | null,
    ShipToDefault?: string | undefined | null,
    VendorRef?: string | undefined | null,
    DocumentStatus?: string | undefined | null,
    Remark?: string | undefined | null,
    Description?: string | undefined | null,
    DocumentServiceItemType?: string | undefined | null,
    AttachmentEntry?: number | null,
    Project?: string | undefined | null,
    ContactPersonList?: any[],
    ShippingType?: number | null,
    Items?: any[],
    Services?: any[],
    Attachments?: any[],
    SerieLists: any[],
    Series: any,
    DocNum: any,
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
    Department: any,
    Branch: any,
    ReqType: number,
    DocTotalBeforeDiscount: number,
    DocTotal: number,
    DocDiscountPercent: number | any,
    DocDiscountPrice: number | any,
    DocTaxTotal: number | any,
    Rounded: boolean,
    DocType: string,
    AgreementMethod: string;
    Address: string | null;
    Address2: string | null;
    disable: {},
    tapIndex: number;
}

export default abstract class CoreFormDocument extends React.Component<any, CoreFormDocumentState> {

    dialog = React.createRef<FormMessageModal>();

    protected constructor(props: any) {
        super(props);
        this.state = {
            collapse: true,
            CardCode: '',
            CardName: '',
            ContactPersonCode: undefined,
            ContactPersonList: [],
            ShippingType: null,
            Phone: '',
            Email: '',
            Owner: '',
            Buyer: '',
            VendorRef: '',
            DocumentStatus: 'Open',
            Remark: '',
            Description: '',
            DocumentServiceItemType: 'I',
            AttachmentEntry: 0,
            Project: '',
            isOpenItem: false,
            isOpenVendor: false,
            isOpenAccount: false,
            isOpenProject: false,
            PaymentMethod: '',
            PaymentTermType: '',
            Currency: '',
            PriceLists: '',
            SalesPersonCode: '',
            ShipToDefault: '',
            Renewal: false,
            Items: [],
            SerieLists: [],
            Series: '',
            DocNum: '',
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
            Department: '',
            Branch: '',
            ReqType: 12,
            DocTaxTotal: 0,
            DocTotal: 0,
            DocTotalBeforeDiscount: 0,
            DocDiscountPercent: 0,
            DocDiscountPrice: 0,
            Rounded: false,
            DocType: 'dDocument_Items',
            AgreementMethod: 'I',
            Address: null,
            Address2: null,
            disable: {},
            tapIndex: 0,
        }

        this.handlerConfirmVendor = this.handlerConfirmVendor.bind(this)
        this.handlerConfirmItem = this.handlerConfirmItem.bind(this)
        this.handlerConfirmDistribution = this.handlerConfirmDistribution.bind(this)
        this.handlerConfirmRequestEmployee = this.handlerConfirmRequestEmployee.bind(this)
        this.handlerConfirmRequester = this.handlerConfirmRequester.bind(this);
        this.handlerChangeItems = this.handlerChangeItems.bind(this);
        this.handlerDeleteItem = this.handlerDeleteItem.bind(this);
        this.handlerChange = this.handlerChange.bind(this);

    }

    abstract FormRender(): JSX.Element;

    abstract HeaderTaps(): JSX.Element;

    render() {
        return (
            <div className='grow flex flex-col'>
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

                <div className='flex flex-col w-full  grow '>
                    <DocumentHeaderComponent data={this.state} menuTabs={<this.HeaderTaps />} />
                    <div className={`grow  flex flex-col px-4 py-3 gap-2 w-full `}>
                        <this.FormRender />
                        <div className='mt-4'></div>
                    </div>
                </div>
            </div>
        );
    }


    protected handlerCollapse() {
        this.setState({ ...this.state, collapse: !this.state.collapse })
    }

    protected handlerOpenItem() {
        this.setState({ ...this.state, isOpenItem: true })
    }

    protected handlerConfirmItem(data: any[]) {
        let oldItems = [...this.state.Items ?? []];

        // Filter out items that already exist in the state
        const newItems = data.filter((newItem) => !oldItems.find((e) => e?.ItemCode === newItem.ItemCode));
        this.setState({ ...this.state, isOpenItem: false, Items: [...oldItems, ...newItems] });
    }

    private handlerCloseItem() {
        // this.setState({ ...this.state, isOpenItem: false })
    }

    // handler vendor 
    protected handlerConfirmVendor(record: BusinessPartner) {
        this.setState({
            ...this.state,
            CardCode: record.cardCode,
            CardName: record.cardName,
            ContactPersonCode: record.contactEmployee!.length > 0 ? record.contactEmployee![0].id : undefined,
            ContactPersonList: record.contactEmployee ?? [],
            ShippingType: record?.shippingType,
            Email: record.email,
            Phone: record.phone,
            PaymentTermType: record.paymentTermTypeCode,
            PaymentMethod: record.paymentMethod,
            isOpenVendor: false,
            Currency: record.currency,
            PriceLists: record.priceLists,
            SalesPersonCode: record.salePersonCode,
            Address2: record.getShipTo(),
            Address: record.getBillToAddress(),
            Owner: record?.owner ?? null,
        });
    }

    protected handlerOpenVendor(type: VendorModalType) {
        this.setState({ ...this.state, isOpenVendor: true, vendorType: type })
    }

    private handlerCloseVendor() {
        this.setState({ ...this.state, isOpenVendor: false })
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
            Project: record.code,
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

        // discount
        let DocDiscountPercent = this.state.DocDiscountPercent;
        let DocTotalBeforeDiscount = this.state.DocTotalBeforeDiscount;

        switch (key) {
            case 'Status':
                temps['disable'] = { ...temps['disable'], TerminateDate: !(value === 'T') };
                break;
            case 'AgreementMethod':
            case 'DocType':
                temps['Items'] = [];
                break;
            case 'Series':
                const document = this.state.SerieLists.find((e: any) => e.Series === value);
                temps['DocNum'] = document?.NextNumber;
                break;
            case 'ReqType':
                temps['Department'] = null;
                temps['Branch'] = null;
                temps['CardCode'] = null;
                temps['CardName'] = null;
                break;
            case 'DocDiscountPercent':
                let discount = parseFloat(value);
                temps['DocDiscountPrice'] = discount >= 100 ? 0 : (DocTotalBeforeDiscount * value) / 100;
                temps['DocDiscountPercent'] = discount > 100 ? 100 : value;
                temps = this.findTotalVatRate(temps);
                break;
            case 'DocDiscountPrice':
                const total = parseFloat(value) > DocTotalBeforeDiscount;
                DocDiscountPercent = total ? 100 : ((value / DocTotalBeforeDiscount) * 100);
                temps['DocDiscountPercent'] = (DocDiscountPercent >= 10 ? DocDiscountPercent : DocDiscountPercent / 10);
                temps['DocDiscountPrice'] = total ? 0 : value;
                temps = this.findTotalVatRate(temps);
                break;
            default:
                break;
        }
        this.setState(temps)
    }

    findTotalVatRate(temps: any) {
        let totalVatRate = temps.items?.reduce((prev: any, current: any) => prev + (current?.vatRate ?? 0), 0);
        const total = temps['DocTotalBeforeDiscount'] - temps['DocDiscountPrice'];
        totalVatRate = ((temps['DocDiscountPrice'] === 0 ? temps.docTotalBeforeDiscount : temps['DocDiscountPrice']) * totalVatRate) / 100;
        temps['DocTaxTotal'] = totalVatRate;
        temps['DocTotal'] = total + temps['DocTaxTotal'];
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
            CardCode: record.id,
            CardName: record.name,
            Branch: record.branch,
            Department: record.department,
            Email: record.email,
        });
    }


    protected handlerOpenRequesterEmployee() {
        this.setState({ ... this.state, isOpenRequesterEmployee: true })
    }

    protected handlerConfirmRequester(record: Users) {
        this.setState({
            ...this.state,
            isOpenRequester: false,
            CardCode: record.code,
            CardName: record.name,
            Branch: record.branch,
            Department: record.department,
            Email: record.email,
        });
    }


    protected handlerChangeItems({ value, record, field }: any) {
        let items: any[] = [...this.state.Items ?? []];
        let item: any = {};

        if (this.state.AgreementMethod === 'M' && !record?.ItemCode) {
            item['ItemCode'] = shortid.generate();
            item[field] = value;
            items.push(item);
            this.setState({ ...this.state, Items: items });
            return;
        }

        if (this.state.DocType === documentType[1].value && !record?.ItemCode) {
            item['ItemCode'] = shortid.generate();
            item[field] = value;
            items.push(item);
            this.setState({ ...this.state, Items: items });
            return;
        }

        let existingItem = items?.find((e: any) => e?.ItemCode === record?.ItemCode);
        if (!existingItem) return;


        const index = items.findIndex((e: any) => e?.ItemCode === record.ItemCode);
        switch (field) {
            case 'AccountNo':
            case 'AccountCode':
                items[index][field] = value.code;
                items[index]['AccountName'] = value.name;
                break;
            case 'VatGroup':
                items[index][field] = value.code;
                items[index]['VatRate'] = value.vatRate;
                break;
            case 'UomCode':
                items[index][field] = value?.Code;
                items[index]['UoMAbsEntry'] = value?.AlternateUoM;
                items[index]['UnitsOfMeasurement'] = value?.BaseQuantity;
                break;
            case 'LineTotal':
                items[index][field] = value;
                items[index]['Quantity'] = items[index]['Quantity'] ?? 1;
                items[index]['UnitPrice'] = items[index][field] / items[index]['Quantity'];
                items[index]['DiscountPercent'] = items[index]['DiscountPercent'] ?? 0;
                break;
            default:
                items[index][field] = value;
        }

        let DocTotalBeforeDiscount = this.state.DocTotalBeforeDiscount;
        let DocTaxTotal = this.state.DocTaxTotal;
        let DocTotal = this.state.DocTotal;

        if (field === 'Quantity' || field === 'UnitPrice' || field === 'DiscountPercent' || field?.includes('Vat') || field === 'LineTotal') {
            items[index]['LineTotal'] = Formular.findLineTotal(items[index]['Quantity'], items[index]['UnitPrice'], items[index]['DiscountPercent']);
            // 
            // DocTotalBeforeDiscount = items.reduce((prev, current) => prev + parseFloat(current.LineTotal), 0);
            // let total = DocTotalBeforeDiscount - this.state.DocDiscountPrice;
            // DocTaxTotal = items.reduce((prev, cur) => prev + (cur?.VatRate ?? 0), 0);
            // DocTaxTotal = (total * DocTaxTotal / 100);
            // DocTotal = total + DocTaxTotal;
        }



        this.setState({ ...this.state, Items: items, DocTotalBeforeDiscount, DocTaxTotal, DocTotal })
    }
    protected handlerDeleteItem(code: string) {
        let items = [...this.state.Items ?? []];
        const index = items.findIndex((e: any) => e?.ItemCode === code);
        items.splice(index, 1)
        this.setState({ ...this.state, Items: items })
    }
}
