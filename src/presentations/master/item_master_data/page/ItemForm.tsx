import CoreFormDocument from "@/components/core/CoreFormDocument";
import HeadingForm from "../components/HeadingForm";
import { withRouter } from "@/routes/withRouter";
import { LoadingButton } from "@mui/lab";
import { FormEventHandler } from "react";
import AttachmentForm from "../components/AttachmentForm";
import DocumentSerieRepository from "@/services/actions/documentSerie";
import { ToastOptions } from "react-toastify";
import GLAccount from "../../../../models/GLAccount";
import { UpdateDataSuccess } from "@/utilies/ClientError";
import Formular from "@/utilies/formular";
import VatGroupRepository from "@/services/actions/VatGroupRepository";
import ItemMasterDataRepository from "@/services/actions/itemMasterDataRepository";
import ItemMaster from "@/models/ItemMasterData";
import GeneralForm from "../components/GeneralForm";
import PurchasingForm from "../components/PurchasingForm";
import SalesForm from "../components/SalesForm";
import InventoryFom from "../components/InventoryForm";

class ItemMasterDataForm extends CoreFormDocument {
  constructor(props: any) {
    super(props);
    this.state = {
      ...this.state,
      loading: true,
      priceList: 1,
      itemsGroupCode: 100,
      itemType: "itItems",
      salesItem: true,
      inventoryItem: true,
      purchaseItem: true,
      docDate: new Date().toISOString(),
      taxDate: new Date().toISOString(),
      docDueDate: new Date().toISOString(),
    } as any;

    this.handlerRemoveItem = this.handlerRemoveItem.bind(this);
    this.handlerAddItem = this.handlerAddItem.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount(): void {
    if (!this.props?.edit) {
      setTimeout(
        () =>
          this.setState({
            ...this.state,
            loading: false,
          }),
        500
      );
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
        new ItemMasterDataRepository()
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
      ItemMasterDataRepository.documentSerie
    ).then((res: any) => {
      this.setState({ ...this.state, series: res, isLoadingSerie: false });
    });

    if (!this.props.edit) {
      DocumentSerieRepository.getDefaultDocumentSerie(
        ItemMasterDataRepository.documentSerie
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
    const index = items.findIndex((e: any) => e?.itemCode === code);
    items.splice(index, 1);
    this.setState({ ...this.state, items: items });
  }

  handlerAddItem({ value, record, field }: any) {
    let items = [...(this.state.items ?? [])];
    let item = this.state.items?.find(
      (e: any) => e?.itemCode === record?.itemCode
    );

    if (field === "AccountNo") {
      const account = value as GLAccount;
      item[field] = account.code;
      item["AccountName"] = account.name;
    } else {
      item[field] = value;
    }

    if (
      field === "quantity" ||
      field === "unitPrice" ||
      field === "discountPercent"
    ) {
      const total = Formular.findLineTotal(
        item["quantity"],
        item["unitPrice"],
        item["discountPercent"]
      );
      item["lineTotal"] = total;
    }

    if (field === "purchaseVatGroup")
      item["vatRate"] = new VatGroupRepository().find(value)?.vatRate;

    const index = items.findIndex((e: any) => e?.ItemCode === record.itemCode);
    if (index > 0) items[index] = item;

    this.setState({
      ...this.state,
      items: items,
      docTotal: Formular.findTotalBeforeDiscount(items),
    });
  }

  // async handlerSubmit(event: any) {
  //   event.preventDefault();
  //   this.setState({ ...this.state, isSubmitting: true });

  //   const { id } = this.props?.match?.params;

  //   await new ItemMasterDataRepository()
  //     .post(this.state, this.props?.edit, id)
  //     .then((res: any) => {
  //       this.showMessage("Success", "Create Successfully");
  //     })
  //     .catch((e: Error) => {
  //       this.showMessage("Errors", e.message);
  //     });
  // }

  async handlerSubmit(event: any) {
    event.preventDefault();

    this.setState({ ...this.state, isSubmitting: true });
    const { id } = this.props?.match?.params;


    // console.log(this.state)
    // return 
    await new ItemMasterDataRepository()
      .post(this.state, this.props?.edit, id)
      .then((res: any) => {
        const purchaseRequest = new ItemMaster(res?.data);

        this.props.history.replace(
          this.props.location.pathname?.replace("create", purchaseRequest.id),
          purchaseRequest
        );
        this.dialog.current?.success("Create Successfully.");
      })
      .catch((e: any) => {
        if (e instanceof UpdateDataSuccess) {
          this.props.history.replace(
            this.props.location.pathname?.replace("/edit", ""),
            {
              ...this.state,
              isSubmitting: false,
              isApproved: this.state.documentStatus === "A",
            }
          );
          this.dialog.current?.success(e.message);
          // const query = this.props.query.query as QueryClient;
          return;
        }
        this.dialog.current?.error(e.message);
      })
      .finally(() => {
        this.setState({ ...this.state, isSubmitting: false });
      });
  }

  FormRender = () => {
    return (
      <>
        <form onSubmit={this.handlerSubmit} className="flex flex-col gap-4">
          <HeadingForm
            name={this.props?.name}
            edit={this.props?.edit}
            data={this.state}
            handlerChange={(key, value) => {
              this.handlerChange(key, value);
            }}
          />

          <GeneralForm
            data={this?.state}
            edit={this.props?.edit}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          // handlerOpenGLAccount={() => this.handlerOpenGLAccount()}
          />
          <PurchasingForm
            edit={this.props?.edit}
            handlerOpenVendor={() => {
              this.handlerOpenVendor("customer");
            }}
            data={this?.state}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          // handlerOpenGLAccount={() => this.handlerOpenGLAccount()}
          />
          <SalesForm
            edit={this.props?.edit}
            handlerOpenVendor={() => {
              this.handlerOpenVendor("supplier");
            }}
            data={this?.state}

            handlerChange={(key, value) => this.handlerChange(key, value)}
          // handlerOpenGLAccount={() => this.handlerOpenGLAccount()}
          />

          <InventoryFom data={this?.state}
            edit={this.props?.edit}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          />

          <AttachmentForm />

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

export default withRouter(ItemMasterDataForm);
