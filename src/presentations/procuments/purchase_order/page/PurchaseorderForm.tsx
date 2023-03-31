import CoreFormDocument from "@/components/core/CoreFormDocument";
// import GeneralForm from '../../purchase_agreement/components/GeneralForm';
import HeadingForm from "../components/Heading";
import ContentForm from "../components/Content";
import AttachmentForm from "../components/Attachment";
import { withRouter } from "@/routes/withRouter";
import { LoadingButton } from "@mui/lab";
import { FormEventHandler } from "react";
import { CoreFormDocumentState } from "../../../../components/core/CoreFormDocument";
import DocumentSerieRepository from "@/services/actions/documentSerie";
import { ToastOptions } from "react-toastify";
import PurchaseOrderRepository from "@/services/actions/purchaseOrderRepository";
import LogisticForm from "../components/Logistic";
import AccounttingForm from "../components/Accountting";
import GLAccount from "@/models/GLAccount";
import { UpdateDataSuccess } from "@/utilies/ClientError";
import PurchaseOrders from "../../../../models/PurchaseOrder";
class PurchaseOrder extends CoreFormDocument {
  constructor(props: any) {
    super(props);
    this.state = {
      ...this.state,
      docType: "I",
      docDueDate: null,
      taxDate: null,
      cancelDate: null,
    } as any;

    this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
    this.handlerAddItem = this.handlerAddItem.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount(): void {
    if (!this.props?.edit) {
      setTimeout(() => this.setState({ ...this.state, loading: false }), 500);
    }

    if (this.props.edit) {
      if (this.props.location.state) {
        const routeState = this.props.location.state;
        setTimeout(
          () =>
            this.setState({
              ...this.props.location.state,
              isApproved: routeState?.status === "A",
              loading: false,
            }),
          500
        );
      } else {
        new PurchaseOrderRepository()
          .find(this.props.match.params.id)
          .then((res: any) => {
            this.setState({ ...res, loading: false });
          })
          .catch((e: Error) => {
            this.setState({ message: e.message });
          });
      }
    }

    DocumentSerieRepository.getDocumentSeries(
      PurchaseOrderRepository.documentSerie
    ).then((res: any) => {
      this.setState({ ...this.state, series: res, isLoadingSerie: false });
    });

    if (!this.props.edit) {
      DocumentSerieRepository.getDefaultDocumentSerie(
        PurchaseOrderRepository.documentSerie
      ).then((res: any) => {
        this.setState({
          ...this.state,
          serie: res?.Series,
          docNum: res?.NextNumber,
          isLoadingSerie: false,
        });
      });
    }
  }

  handlerRemoveItem(code: string) {
    let items = [...(this.state.items ?? [])];
    const index = items.findIndex((e: any) => e?.ItemCode === code);
    items.splice(index, 1);
    this.setState({ ...this.state, items: items });
  }

  handlerAddItem({ value, record, field }: any) {
    let items = [...(this.state.items ?? [])];
    let item = this.state.items?.find(
      (e: any) => e?.itemCode === record?.itemCode
    );

    if (field === "accountCode") {
      const account = value as GLAccount;
      item["accountCode"] = account.code;
      item["AccountName"] = account.name;
    } else {
      item[field] = value;
    }

    const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
    if (index > 0) items[index] = item;
    this.setState({ ...this.state, items: items });
  }

  async handlerSubmit(event: any) {
    event.preventDefault();

    this.setState({ ...this.state, isSubmitting: true });
    const { id } = this.props?.match?.params

    await new PurchaseOrderRepository().post(this.state, this.props?.edit, id).then((res: any) => {
      const purchaseOrder = new PurchaseOrders(res?.data)

      this.props.history.replace(this.props.location.pathname?.replace('create', purchaseOrder.id), purchaseOrder);
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
    return (
      <>
        <form onSubmit={this.handlerSubmit} className="flex flex-col gap-4">
          <HeadingForm
            data={this.state}
            edit={this.props?.edit}
            handlerOpenVendor={() => {
              this.handlerOpenVendor("supplier");
            }}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          />
          <ContentForm
            edit={this.props?.edit}
            data={this.state}
            handlerAddItem={() => this.handlerOpenItem()}
            handlerRemoveItem={this.handlerRemoveItem}
            handlerChangeItem={this.handlerAddItem}
            handlerChange={(key, value) => this.handlerChange(key, value)}
            // handlerOpenGLAccount={() => this.handlerOpenGLAccount()}
          />
          <LogisticForm
            data={this.state}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          />
          <AccounttingForm
            edit={this.props?.edit}
            data={this.state}
            handlerChange={(key, value) => this.handlerChange(key, value)}
            handlerOpenProject={() => this.handlerOpenProject()}
          />
          {/* <AttachmentForm /> */}

          <div className="sticky w-full bottom-4  mt-2">
            <div className="backdrop-blur-sm bg-slate-700 p-2 rounded-lg shadow z-[1000] flex justify-between gap-3 border">
              <div className="flex ">
                <LoadingButton
                  size="small"
                  sx={{ height: "25px" }}
                  variant="contained"
                  disableElevation
                >
                  <span className="px-3 text-[11px] py-1">Copy To</span>
                </LoadingButton>
              </div>
              <div className="flex items-center">
                <LoadingButton
                  type="submit"
                  sx={{ height: "25px" }}
                  className="bg-white"
                  loading={false}
                  size="small"
                  variant="contained"
                  disableElevation
                >
                  <span className="px-3 text-[11px] py-1">Save & New</span>
                </LoadingButton>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  };
}

export default withRouter(PurchaseOrder);
