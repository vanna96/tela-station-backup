import CoreFormDocument from '@/components/core/CoreFormDocument';
import GeneralForm from "../components/GeneralForm";
import HeadingForm from "../components/HeadingForm";
import { withRouter } from '@/routes/withRouter';
import ContentForm from '../components/ContentForm';
import { LoadingButton } from '@mui/lab';
import AttachmentForm from '../components/AttachmentForm';
import DocumentSerieRepository from '@/services/actions/documentSerie';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import GLAccount from '@/models/GLAccount';
import { CircularProgress } from '@mui/material';
import { UpdateDataSuccess } from '../../../../utilies/ClientError';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import { QueryClient, useMutation } from 'react-query';


class PurchaseAgreementForm extends CoreFormDocument {

    constructor(props: any) {
        super(props)
        this.state = {
            ...this.state,
            agreementMethod: 'I',
            agreementType: 'G',
            status: 'D',
            renewal: false,
            startDate: null,
            terminateDate: null,
            signingDate: null,
            endDate: null,
            loading: true,
            
            
        } as any;

        console.log(this.state);
        this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
        this.handlerItemChange = this.handlerItemChange.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount(): void {

        if (!this.props?.edit) {
            setTimeout(() => this.setState({ ...this.state, loading: false, }), 500)
        }

        if (this.props.edit) {
            if (this.props.location.state) {
                const routeState = this.props.location.state;

                setTimeout(() => this.setState({ ...this.props.location.state, isApproved: routeState?.status === 'A' || routeState?.status === 'T', loading: false, }), 500)
            } else {
                new PurchaseAgreementRepository().find(this.props.match.params.id).then((res: any) => {
                    this.setState({ ...res, loading: false, isApproved: res?.status === 'A' || res?.status === 'T', });
                }).catch((e: Error) => {
                    this.setState({ message: e.message });
                })
            }
        }

        DocumentSerieRepository.getDocumentSeries(PurchaseAgreementRepository.documentSerie).then((res: any) => {
            this.setState({ ...this.state, series: res, isLoadingSerie: false })
        });

        if (!this.props.edit) {
            DocumentSerieRepository.getDefaultDocumentSerie(PurchaseAgreementRepository.documentSerie).then((res: any) => {
                this.setState({ ...this.state, serie: res?.Series, docNum: res?.NextNumber })
            });
        }
    }

    handlerRemoveItem(code: string) {
        let items = [...this.state.items ?? []];
        const index = items.findIndex((e: any) => e?.ItemCode === code);
        items.splice(index, 1)
        this.setState({ ...this.state, items: items })
    }

    handlerItemChange({ value, record, field }: any) {
        let items = [...this.state.items ?? []];
        let item = this.state.items?.find((e: any) => e?.itemCode === record?.itemCode);

        if (field === 'AccountNo') {
            const account = value as GLAccount;
            item[field] = account.code;
            item['AccountName'] = account.name;
        } else {
            item[field] = value;
        }


        const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
        if (index > 0) items[index] = item;
        this.setState({ ...this.state, items: items })
    }


    async handlerSubmit(event: any) {
        event.preventDefault();

        this.setState({ ...this.state, isSubmitting: true });
        const { id } = this.props?.match?.params

        await new PurchaseAgreementRepository().post(this.state, this.props?.edit, id).then((res: any) => {
            const purchaseAgreement = new PurchaseAgreement(res?.data)

            this.props.history.replace(this.props.location.pathname?.replace('create', purchaseAgreement.id), purchaseAgreement);
            this.dialog.current?.success("Create Successfully.");
        }).catch((e: any) => {
            if (e instanceof UpdateDataSuccess) {
                this.props.history.replace(this.props.location.pathname?.replace('/edit', ''), { ...this.state, isSubmitting: false, isApproved: this.state.documentStatus === 'A' });
                this.dialog.current?.success(e.message);
                // const query = this.props.query.query as QueryClient;
                return;
            }
            this.dialog.current?.error(e.message);
        }).finally(() => {
            this.setState({ ...this.state, isSubmitting: false })
        });
    }


    FormRender = () => {
        return <>
            <form onSubmit={this.handlerSubmit} className='h-full w-full flex flex-col gap-4'>
                {this.state.loading ? <div className='h-full w-full flex items-center justify-center'><CircularProgress /></div> : <>
                    <HeadingForm
                        data={this.state}
                        edit={this.props?.edit}
                        handlerOpenVendor={() => {
                            this.handlerOpenVendor('supplier');
                        }}
                        handlerChange={(key, value) => this.handlerChange(key, value)}
                        handlerOpenProject={() => this.handlerOpenProject()}
                    />
                    <GeneralForm
                        data={this.state}
                        edit={this.props?.edit}
                        handlerChange={(key, value) => this.handlerChange(key, value)}
                    />
                    <ContentForm
                        data={this.state}
                        handlerAddItem={() => this.handlerOpenItem()}
                        handlerRemoveItem={this.handlerRemoveItem}
                        handlerChangeItem={this.handlerItemChange}
                    />

                    <AttachmentForm />

                    <div className="sticky w-full bottom-4  mt-2">
                        <div className="backdrop-blur-sm bg-slate-700 p-2 rounded-lg shadow z-[1000] flex justify-between gap-3 border">
                            <div className="flex ">
                                <LoadingButton size="small" sx={{ height: '25px' }} variant="contained" disableElevation><span className="px-3 text-[11px] py-1">Copy To</span></LoadingButton>
                            </div>
                            <div className="flex items-center">
                                <LoadingButton type="submit" sx={{ height: '25px' }} className='bg-white' loading={false} size="small" variant="contained" disableElevation>
                                    <span className="px-3 text-[11px] py-1">Save </span>
                                </LoadingButton>
                            </div>
                        </div>
                    </div>
                </>}
            </form>
        </>
    }
}

export default withRouter(PurchaseAgreementForm)