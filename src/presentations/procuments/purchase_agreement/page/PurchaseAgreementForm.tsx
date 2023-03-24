import CoreFormDocument from '@/components/core/CoreFormDocument';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import GeneralForm from "../components/GeneralForm";
import HeadingForm from "../components/HeadingForm";
import { withRouter } from '@/routes/withRouter';
import ContentForm from '../components/ContentForm';
import { LoadingButton } from '@mui/lab';
import { FormEventHandler } from 'react';
import AttachmentForm from '../components/AttachmentForm';
import { CoreFormDocumentState } from '../../../../components/core/CoreFormDocument';
import DocumentSerieRepository from '@/services/actions/documentSerie';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import { ToastOptions } from 'react-toastify';
import GLAccount from '@/models/GLAccount';
import { CircularProgress } from '@mui/material';


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
            endDate: null,
            loading: true
        } as any;


        this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
        this.handlerAddItem = this.handlerAddItem.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount(): void {

        if (!this.props?.edit) {

            setTimeout(() => this.setState({ ...this.state, loading: false, }), 500)
        }

        if (this.props.location.state) {
            console.log(this.props.location.state)
            setTimeout(() => this.setState({ ...this.props.location.state, loading: false, }), 500)
        }

        DocumentSerieRepository.getDocumentSeries(PurchaseAgreementRepository.documentSerie).then((res: any) => {
            this.setState({ ...this.state, series: res, isLoadingSerie: false })
        });

        if (!this.props.edit) {
            DocumentSerieRepository.getDefaultDocumentSerie(PurchaseAgreementRepository.documentSerie).then((res: any) => {
                this.setState({ ...this.state, serie: res?.Series, docNum: res?.NextNumber, isLoadingSerie: false })
            });
        }
    }

    handlerRemoveItem(code: string) {
        let items = [...this.state.items ?? []];
        const index = items.findIndex((e: any) => e?.ItemCode === code);
        items.splice(index, 1)
        this.setState({ ...this.state, items: items })
    }

    handlerAddItem({ value, record, field }: any) {
        let items = [...this.state.items ?? []];
        let item = this.state.items?.find((e: any) => e?.ItemCode === record?.ItemCode);

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
            console.log(res)
            this.showMessage('Success', 'Create Successfully');
        }).catch((e: Error) => {
            this.showMessage('Errors', e.message);
        });
    }


    FormRender = () => {
        return <>
            <form onSubmit={this.handlerSubmit} className='h-full w-full flex flex-col gap-4'>
                {this.state.loading ? <div className='h-full w-full flex items-center justify-center'><CircularProgress /></div> : <>
                    <HeadingForm
                        data={this.state}
                        handlerOpenVendor={() => {
                            this.handlerOpenVendor('supplier');
                        }}
                        handlerChange={(key, value) => this.handlerChange(key, value)}
                        handlerOpenProject={() => this.handlerOpenProject()}
                    />
                    <GeneralForm
                        data={this.state}
                        handlerChange={(key, value) => this.handlerChange(key, value)}
                    />
                    <ContentForm
                        data={this.state}
                        handlerAddItem={() => this.handlerOpenItem()}
                        handlerRemoveItem={this.handlerRemoveItem}
                        handlerChangeItem={this.handlerAddItem}
                    />

                    <AttachmentForm />

                    <div className="sticky w-full bottom-4  mt-2">
                        <div className="backdrop-blur-sm bg-slate-700 p-2 rounded-lg shadow z-[1000] flex justify-between gap-3 border">
                            <div className="flex ">
                                <LoadingButton size="small" sx={{ height: '25px' }} variant="contained" disableElevation><span className="px-3 text-[11px] py-1">Copy To</span></LoadingButton>
                            </div>
                            <div className="flex items-center">
                                <LoadingButton type="submit" sx={{ height: '25px' }} className='bg-white' loading={false} size="small" variant="contained" disableElevation>
                                    <span className="px-3 text-[11px] py-1">Save & New</span>
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