import React from 'react';
import CoreFormDocument from '@/components/core/CoreFormDocument';
import LogisticForm from "../components/LogisticForm";
import GeneralForm from "../components/GeneralForm";
import { withRouter } from '@/routes/withRouter';
import ContentForm from '../components/ContentForm';
import { LoadingButton } from '@mui/lab';
import AttachmentForm from '../components/AttachmentForm';
import DocumentSerieRepository from '@/services/actions/documentSerie';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import { CircularProgress } from '@mui/material';
import { UpdateDataSuccess } from '../../../../utilies/ClientError';
import PurchaseAgreement from '../../../../models/PurchaseAgreement';
import MenuButton from '@/components/button/MenuButton';
import shortid from 'shortid';
import { FormValidateException } from '@/utilies/error';

class PurchaseAgreementForm extends CoreFormDocument {
    constructor(props: any) {
        super(props)
        this.state = {
            ...this.state,
            DocType: 'amItem',
            AgreementType: 'G',
            Status: 'D',
            Renewal: false,
            // StartDate: null,
            TerminateDate: null,
            SigningDate: null,
            EndDate: null,
            loading: true,
            // isSubmitting: true,
            error: {},

        } as any;

        this.onInit = this.onInit.bind(this);
        this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerChangeMenu = this.handlerChangeMenu.bind(this);
        this.hanndAddNewItem = this.hanndAddNewItem.bind(this);

    }

    componentDidMount(): void {
        if (!this.props?.edit) {
            setTimeout(() => this.setState({ ...this.state, loading: false, }), 500)
        }

        this.onInit();

        Promise.allSettled([
            DocumentSerieRepository.getDocumentSeries(PurchaseAgreementRepository.documentSerie),
            DocumentSerieRepository.getDefaultDocumentSerie(PurchaseAgreementRepository.documentSerie),
        ]).then((result) => {
            if (result[0].status === 'rejected') {
                this.dialog.current?.error("To generate this document, first define the numbering series in the Administrator module.", "Document Numbering");
                return;
            }

            const state = { ...this.state };
            const Series: any = result[1];
            state['isLoadingSerie'] = false;
            state['SerieLists'] = result[0].value;
            if (!this.props.edit) {
                state['Series'] = Series.value?.Series;
                state['DocNum'] = Series.value?.NextNumber;
            }
            this.setState(state)
        })
    }

    async onInit() {
        if (this.props.edit) {
            const { id } = this.props.match.params;
            let state: any = this.props.query.find('pa-id-' + id);
            let disables: any = {};

            if (!state) {
                await new PurchaseAgreementRepository().find(id).then(async (res: any) => {
                    state = res;
                    this.props.query.set('pa-id-' + id, res);
                });
            }
            state['Status'] = state['Status'] === 'O' ? 'F' : state['Status'];
            disables['StartDate'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['EndDate'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['PaymentMethod'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['PaymentMethod'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['ShippingType'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['PaymentTermType'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['Status'] = state?.Status?.includes('T');
            disables['AgreementType'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['Projects'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            disables['TerminateDate'] = true;
            disables['DocumentLine'] = state?.Status?.includes('A') || state?.Status?.includes('T');
            this.setState({ ...state, disable: disables, loading: false });
        }

    }

    handlerRemoveItem(code: string) {
        let items = [...this.state.Items ?? []];
        const index = items.findIndex((e: any) => e?.ItemCode === code);
        items.splice(index, 1)
        this.setState({ ...this.state, Items: items })
    }


    async handlerSubmit(event: any) {
        event.preventDefault();
        const data: any = { ...this.state };

        try {
            this.setState({ ...this.state, isSubmitting: true });
            await new Promise((resolve) => setTimeout(() => resolve(''), 800));

            const { id } = this.props?.match?.params;

            if (!this.state.CardCode) {
                data['error'] = { "CardCode": "Vendor is Required!" }
                throw new FormValidateException('Vendor is Required!', 0);
            }


            if (!data?.EndDate) {
                data['error'] = { "EndDate": "End date is Required!" }
                throw new FormValidateException('End date is Required!', 0);
            }

            if (!data?.Items || data?.Items?.length === 0) {
                data['error'] = { "Items": "Items is missing and must at least one record!" }
                throw new FormValidateException('Items is missing', 2);
            }

            const payloads = new PurchaseAgreement(this.state).toJson(this.props?.edit);


            await new PurchaseAgreementRepository().post(this.state, this.props?.edit, id).then((res: any) => {
                const purchaseAgreement = new PurchaseAgreement(res?.data)
                this.props.history.replace(this.props.location.pathname?.replace('create', purchaseAgreement.DocEntry), purchaseAgreement);
                this.dialog.current?.success("Create Successfully.");
            }).catch((e: any) => {
                if (e instanceof UpdateDataSuccess) {
                    const agreement = new PurchaseAgreement(this.state);
                    this.props.query.set('pa-id-' + id, agreement);
                    this.props.history.replace(this.props.location.pathname?.replace('/edit', ''), { ...this.state });
                    this.dialog.current?.success(e.message);
                    return;
                }
                this.dialog.current?.error(e.message);
            }).finally(() => {
                this.setState({ ...this.state, isSubmitting: false })
            });
        } catch (error: any) {
            if (error instanceof FormValidateException) {
                this.setState({ ...data, isSubmitting: false, tapIndex: error.tap });
                return;
            }

            this.setState({ ...data, isSubmitting: false });
            this.dialog.current?.error(error.message, 'Invalid');
        }
    }

    async handlerChangeMenu(index: number) {
        this.setState({ ...this.state, loading: true });
        await new Promise((resolve) => setTimeout(() => resolve(''), 500));
        this.setState({ ...this.state, loading: false, tapIndex: index });

    }

    HeaderTaps = () => {
        return <>
            <MenuButton active={this.state.tapIndex === 0} onClick={() => this.handlerChangeMenu(0)}>General</MenuButton>
            <MenuButton active={this.state.tapIndex === 1} onClick={() => this.handlerChangeMenu(1)}>Logistic</MenuButton>
            <MenuButton active={this.state.tapIndex === 2} onClick={() => this.handlerChangeMenu(2)}>Content</MenuButton>
            <MenuButton active={this.state.tapIndex === 3} onClick={() => this.handlerChangeMenu(3)}>Attachment</MenuButton>
        </>
    }

    hanndAddNewItem() {
        if (this.state?.DocType === 'amItem') {
            this.handlerOpenItem()
            return;
        }

        const items = [...this.state.Items ?? [], { ItemCode: shortid.generate(), UnitPrice: 0, Quantity: 1 }];
        this.setState({ ...this.state, Items: items });
    }

    FormRender = () => {
        return <>
            <form id='formData' onSubmit={this.handlerSubmit} className='h-full w-full flex flex-col gap-4 relative'>
                {this.state.loading ? <div className='h-full w-full flex items-center justify-center'><CircularProgress /></div> : <>
                    <div className='grow'>
                        {this.state.tapIndex === 0 && <GeneralForm
                            data={this.state}
                            edit={this.props?.edit}
                            handlerOpenVendor={() => {
                                this.handlerOpenVendor('supplier');
                            }}
                            handlerChange={(key, value) => this.handlerChange(key, value)}
                            handlerOpenProject={() => this.handlerOpenProject()}
                        />}

                        {
                            this.state.tapIndex === 1 && <LogisticForm
                                data={this.state}
                                edit={this.props?.edit}
                                handlerChange={(key, value) => {
                                    this.handlerChange(key, value);
                                }}
                            />
                        }

                        {
                            this.state.tapIndex === 2 &&
                            <ContentForm
                                data={this.state}
                                handlerAddItem={() => {
                                    this.hanndAddNewItem();
                                }}
                                handlerRemoveItem={(items: any[]) => this.setState({ ...this.state, Items: items })}
                                handlerChangeItem={this.handlerChangeItems}
                                // onChange={this.handlerChangeItemByCode}
                                onChangeItemByCode={this.handlerChangeItemByCode}
                                onChange={this.handlerChange}
                            />
                        }

                        {
                            this.state.tapIndex === 3 && <AttachmentForm />
                        }
                    </div>

                    <div className="sticky w-full bottom-4  mt-2 ">
                        <div className="backdrop-blur-sm bg-white p-2 rounded-lg shadow-lg z-[1000] flex justify-between gap-3 border drop-shadow-sm">
                            <div className="flex ">
                                <LoadingButton size="small" sx={{ height: '25px' }} variant="contained" disableElevation><span className="px-3 text-[11px] py-1 text-white">Copy To</span></LoadingButton>
                            </div>
                            <div className="flex items-center">
                                <LoadingButton type="submit" sx={{ height: '25px' }} className='bg-white' loading={false} size="small" variant="contained" disableElevation>
                                    <span className="px-6 text-[11px] py-4 text-white">Save </span>
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