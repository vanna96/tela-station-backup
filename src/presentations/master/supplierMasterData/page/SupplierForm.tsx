import CoreFormDocument from "@/components/core/CoreFormDocument";
import { withRouter } from "@/routes/withRouter";
import { LoadingButton } from "@mui/lab";
import { FormEventHandler } from "react";
import { CoreFormDocumentState } from "../../../../components/core/CoreFormDocument";
import DocumentSerieRepository from "@/services/actions/documentSerie";
import { ToastOptions } from "react-toastify";
import { UpdateDataSuccess } from "@/utilies/ClientError";
import Employees from "@/models/Employee";
import Formular from "../../../../utilies/formular";
import Heading from "../components/Heading";
import BussinessPartnersRepository from "@/services/actions/bussinessPartnerRepositorys";
import General from "../components/General";
import ContactPerson from "../components/ContactPersons";
import Address from "../components/Address";
import PaymentTerm from "../components/PaymentTerm";
import PaymentRun from "../components/PaymentRun";
import Accounting from "../components/Accounting";
import Remark from "../components/Remarks";


class Supplier extends CoreFormDocument {
  constructor(props: any) {
    super(props);
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
              loading: false,
            }),
          500
        );
      } else {
        new BussinessPartnersRepository()
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
      BussinessPartnersRepository.documentSerie
    ).then((res: any) => {
      this.setState({ ...this.state, series: res, isLoadingSerie: false });
    });

    if (!this.props.edit) {
      DocumentSerieRepository.getDefaultDocumentSerie(
        BussinessPartnersRepository.documentSerie
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
  async handlerSubmit(event: any) {
    event.preventDefault();

    this.setState({ ...this.state, isSubmitting: true });
    const { id } = this.props?.match?.params;

    await new BussinessPartnersRepository()
      .post(this.state, this.props?.edit, id)
      .then((res: any) => {
        const employee = new Employees(res?.data);

        this.props.history.replace(
          this.props.location.pathname?.replace("create", employee.id),
          employee
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
          <Heading
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
            edit={this.props?.edit}
          />
          <General
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
          />
          <ContactPerson
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
          />
          <Address
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
          />
          <PaymentTerm
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
          />
          <PaymentRun
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
          />
          <Accounting
            handlerChange={(key, value) => this.handlerChange(key, value)}
            data={this.state}
            handlerOpenAccount={() => this.handlerOpenAccount()}
            handlerOpenVendor={() => {
              this.handlerOpenVendor("customer");
            }}
            handlerOpenVendor2={() => {
              this.handlerOpenVendor("supplier");
            }}
          />
           <Remark
            data={this.state}
          />
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

export default withRouter(Supplier);
