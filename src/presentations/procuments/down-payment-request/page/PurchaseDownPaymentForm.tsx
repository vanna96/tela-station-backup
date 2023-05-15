import CoreFormDocument from '@/components/core/CoreFormDocument';
import { withRouter } from '@/routes/withRouter';
import { LoadingButton } from '@mui/lab';
import AttachmentForm from '@/components/attachment';
import DocumentSerieRepository from '@/services/actions/documentSerie';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import purchaseQoutationRepository from '@/services/actions/purchaseQoutationRepository';
import GLAccount from '@/models/GLAccount';
import VatGroupRepository from '@/services/actions/VatGroupRepository';
import { UpdateDataSuccess } from '@/utilies/ClientError';
import Formular from '@/utilies/formular';
import HeadingForm from '../component/HeadingForm';
import Logistic from '../component/Logistic';
import Accounting from '../component/Accounting';
import Content from '../component/Content';
import PurchaseDownPaymentRepository from '@/services/actions/DownPaymentRequestRepository';
import PurchaseDownPayment from '@/models/DownPaymentRequest';
import { CircularProgress } from '@mui/material';

class PurchaseDownPaymentForm extends CoreFormDocument {

  constructor(props: any) {
    super(props)
    this.state = {
      ...this.state,
      loading: true,
      DocDate: new Date().toISOString(),
      DocDueDate: new Date().toISOString(),
      TaxDate: new Date().toISOString(),
    } as any;


    this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
    // this.handlerAddItem = this.handlerAddItem.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount(): void {

    if (!this.props?.edit) {
      setTimeout(() => this.setState({ ...this.state, loading: false, }), 500)
    }

    if (this.props.edit) {
      if (this.props.location.state) {
        setTimeout(() => this.setState({ ...this.props.location.state, loading: false, }), 500)
      } else {
        new PurchaseDownPaymentRepository().find(this.props.match.params.id).then((res: any) => {
          this.setState({ ...res, loading: false});
        }).catch((e: Error) => {
          this.setState({ message: e.message });
        })
      }
    }

    DocumentSerieRepository.getDocumentSeries(PurchaseDownPaymentRepository?.documentSerie).then((res: any) => {
      this.setState({ ...this.state, SerieLists: res, })
    });

    DocumentSerieRepository.getDefaultDocumentSerie(PurchaseDownPaymentRepository.documentSerie).then((res: any) => {
      this.setState({ ...this.state, Series: res?.Series, DocNum: res?.NextNumber, isLoadingSerie: false })
    });
  }

  handlerRemoveItem(code: string) {
    let items = [...this.state.Items ?? []];
    const index = items.findIndex((e: any) => e?.ItemCode === code);
    items.splice(index, 1)
    this.setState({ ...this.state, Items: items })
  }

  handlerAddItem({ value, record, field }: any) {
    let items = [...(this.state.Items ?? [])];
    let item = this.state.Items?.find(
      (e: any) => e?.ItemCode === record?.ItemCode
    );

    if (field === "accountCode") {
      const account = value as GLAccount;
      item[field] = account.code;
      item["accountName"] = account.name;
    } else {
      item[field] = value;
    }

    if (field === 'quantity' || field === 'unitPrice' || field === 'discountPercent') {
      const total = Formular.findLineTotal(item['quantity'], item['unitPrice'], item['discountPercent']);
      item['lineTotal'] = total;
    }

    if (field === 'purchaseVatGroup')
      item['vatRate'] = new VatGroupRepository().find(value)?.vatRate;

    const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
    if (index > 0) items[index] = item;

    this.setState({ ...this.state, Items: items, DocTotal: Formular.findTotalBeforeDiscount(items) });
  }
  async handlerSubmit(event: any) {
    event.preventDefault();

    this.setState({ ...this.state, isSubmitting: true });
    const { id } = this.props?.match?.params

    await new PurchaseDownPaymentRepository().post(this.state, this.props?.edit, id).then((res: any) => {
      const purchaseDownPayment = new PurchaseDownPayment(res?.data)

      this.props.history.replace(this.props.location.pathname?.replace('create', purchaseDownPayment.Id), purchaseDownPayment);
      this.dialog.current?.success("Create Successfully.");
    }).catch((e: any) => {
      if (e instanceof UpdateDataSuccess) {
        this.props.history.replace(this.props.location.pathname?.replace('/edit', ''), { ...this.state, isSubmitting: false, isApproved: this.state.DocumentStatus === 'A' });
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
          <Content
            edit={this.props?.edit}
            data={this.state}
            handlerAddItem={() => this.handlerOpenItem()}
            handlerRemoveItem={this.handlerRemoveItem}
            handlerChangeItem={this.handlerChangeItems}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          />
          <Logistic
            data={this.state}
            handlerChange={(key, value) => this.handlerChange(key, value)}
            edit={this.props.edit}
          />
          <Accounting
            edit={this.props.edit}
            data={this.state}
            handlerChange={(key, value) => this.handlerChange(key, value)}
            handlerOpenProject={() => this.handlerOpenProject()}

          />
          <AttachmentForm />

          <div className="sticky w-full bottom-4  mt-2/">
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

export default withRouter(PurchaseDownPaymentForm)