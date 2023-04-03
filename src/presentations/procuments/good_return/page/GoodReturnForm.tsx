import CoreFormDocument from '@/components/core/CoreFormDocument';
import HeadingForm from '../component/HeadingForm';
import { withRouter } from '@/routes/withRouter';
import ContentForm from '../component/ContentForm';
import { LoadingButton } from '@mui/lab';
import AttachmentForm from '@/components/attachment';
import { CoreFormDocumentState } from '../../../../components/core/CoreFormDocument';
import DocumentSerieRepository from '@/services/actions/documentSerie';
import PurchaseAgreementRepository from '../../../../services/actions/purchaseAgreementRepository';
import { ToastOptions } from 'react-toastify';
import purchaseQoutationRepository from '@/services/actions/purchaseQoutationRepository';
import LogisticsForm from '../component/LogisticsForm';
import AccounttingForm from '../component/AccountingForm';
import GLAccount from '@/models/GLAccount';
import GoodReturnRepository from '@/services/actions/goodReturnRepository';
import VatGroupRepository from '@/services/actions/VatGroupRepository';
import { UpdateDataSuccess } from '@/utilies/ClientError';
import PurchaseQouatation from '@/models/PurchaseQoutation';
import Formular from '@/utilies/formular';
import GoodReturn from '@/models/GoodReturn';

class GoodReturnForm extends CoreFormDocument {

  constructor(props: any) {
    super(props)
    this.state = {
      ...this.state,
      docType: 'I',
      loading: true,
      docDate: new Date().toISOString(),
      docDueDate: new Date().toISOString(),
      taxDate: new Date().toISOString(),
      cancelDate: null
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
        const routeState = this.props.location.state;
        setTimeout(() => this.setState({ ...this.props.location.state, isApproved: routeState?.status === 'O', loading: false, }), 500)
      } else {
        new GoodReturnRepository().find(this.props.match.params.id).then((res: any) => {
          this.setState({ ...res, loading: false });
        }).catch((e: Error) => {
          this.setState({ message: e.message });
        })
      }
    }

    DocumentSerieRepository.getDocumentSeries(GoodReturnRepository?.documentSerie).then((res: any) => {
      this.setState({ ...this.state, series: res, })
    });

    DocumentSerieRepository.getDefaultDocumentSerie(GoodReturnRepository.documentSerie).then((res: any) => {
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
    let items = [...(this.state.items ?? [])];
    let item = this.state.items?.find(
      (e: any) => e?.itemCode === record?.itemCode
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

    this.setState({ ...this.state, items: items, docTotal: Formular.findTotalBeforeDiscount(items) });
  }
  async handlerSubmit(event: any) {
    event.preventDefault();

    this.setState({ ...this.state, isSubmitting: true });
    const { id } = this.props?.match?.params

    await new GoodReturnRepository().post(this.state, this.props?.edit, id).then((res: any) => {
      const goodReturn = new GoodReturn(res?.data)

      this.props.history.replace(this.props.location.pathname?.replace('create', goodReturn.id), goodReturn);
      this.dialog.current?.success("Create Successfully.");
    }).catch((e: any) => {
      if (e instanceof UpdateDataSuccess) {
        this.props.history.replace(this.props.location.pathname?.replace('/edit', ''), { ...this.state, isSubmitting: false, isApproved: this.state.documentStatus === 'O' });
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
      <form onSubmit={this.handlerSubmit} className='flex flex-col gap-4'>
        <HeadingForm
          data={this.state}
          edit={this.props?.edit}
          handlerOpenVendor={() => {
            this.handlerOpenVendor('supplier');
          }}
          handlerChange={(key, value) => this.handlerChange(key, value)}
          handlerOpenProject={() => this.handlerOpenProject()}
        />

        <ContentForm
          edit={this.props?.edit}
          data={this.state}
          handlerAddItem={() => this.handlerOpenItem()}
          handlerRemoveItem={this.handlerRemoveItem}
          handlerChangeItem={this.handlerChangeItems}
          handlerChange={(key, value) => this.handlerChange(key, value)}
        />
        <LogisticsForm
          data={this.state}
          handlerChange={(key, value) => this.handlerChange(key, value)}
          edit={this.props.edit}
        />
        <AccounttingForm
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
      </form>
    </>
  }
}

export default withRouter(GoodReturnForm)