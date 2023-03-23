import CoreFormDocument from '@/components/core/CoreFormDocument';
import PurchaseRequest from '@/models/PurchaseRequest';
import HeadingForm from "../components/HeadingForm";
import { withRouter } from '@/routes/withRouter';
import ContentForm from '../components/ContentForm';
import { LoadingButton } from '@mui/lab';
import { FormEventHandler } from 'react';
import AttachmentForm from '../components/AttachmentForm';
import DocumentSerieRepository from '@/services/actions/documentSerie';
import PurchaseRequestRepository from '@/services/purchaseRequestRepository';
import { ToastOptions } from 'react-toastify';

class PurchaseRequestForm extends CoreFormDocument {

    constructor(props: any) {
        super(props)
        this.state = {
            ...this.state,
            agreementMethod: 'I',
            agreementType: 'G',
            status: 'D',
            renewal: false,
            startDate: null,
            endDate: null
        } as any;


        this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
        this.handlerAddItem = this.handlerAddItem.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentDidMount(): void {

        DocumentSerieRepository.getDocumentSeries(PurchaseRequestRepository.documentSerie).then((res: any) => {
            this.setState({ ...this.state, series: res, })
        });

        DocumentSerieRepository.getDefaultDocumentSerie(PurchaseRequestRepository.documentSerie).then((res: any) => {
            this.setState({ ...this.state, serie: res?.Series, docNum: res?.NextNumber, isLoadingSerie: false })
        });
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
        item[field] = value;
        const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
        if (index > 0) items[index] = item;
        this.setState({ ...this.state, items: items })
    }


    async handlerSubmit(event: any) {
        event.preventDefault();
        this.setState({ ...this.state, isSubmitting: true });

        await new PurchaseRequestRepository().post(this.state).then((res: any) => {
            console.log(res)
            this.showMessage('Success', 'Create Successfully');
        }).catch((e: Error) => {
            this.showMessage('Errors', e.message);
        });


        setTimeout(() => {

        }, 2000)
    }


    FormRender = () => {

        return <>
            <form onSubmit={this.handlerSubmit} className='flex flex-col gap-4'>
                <HeadingForm
                    data={this.state}
                    handlerOpenRequester={() => {
                        this.handlerOpenRequester();
                    }}
                    handlerChange={(key, value) => this.handlerChange(key, value)}
                />
                {/* <GeneralForm
                    data={this.state}
                    handlerChange={(key, value) => this.handlerChange(key, value)}
                /> */}
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
            </form>
        </>
    }
}

export default withRouter(PurchaseRequestForm)