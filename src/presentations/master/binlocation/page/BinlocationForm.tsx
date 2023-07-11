
import { withRouter } from '@/routes/withRouter';
import { LoadingButton } from '@mui/lab';
import { Backdrop, CircularProgress } from '@mui/material';
import { UpdateDataSuccess } from '../../../../utilies/ClientError';
import HeadingForm from '../component/HeadingForm';
import General from '../component/General';
import BinlocationRepository from '@/services/actions/BinlocationRepository';
import Binlocation from '@/models/Binlocation';
import React, { Component } from 'react';
import FormMessageModal from '@/components/modal/FormMessageModal';
import { ToastContainer, TypeOptions, toast } from 'react-toastify';
import ItemsModal from '@/components/modal/itemsModal';
import Item from '@/models/Item';

const contextClass: any = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};
export interface BinlocationType {
  loading: boolean;
  showDialogMessage: boolean;
  message: string;
  isSubmitting: boolean;
  title: string;
  isOpenItems: boolean;
  specificItem:string | undefined

}

class BinlocationForm extends Component<any, BinlocationType>{

  constructor(props: any) {
    super(props)
    this.state = {
      ...this.state,
      loading: true,
      showDialogMessage: false,
      isSubmitting: false,
      isOpenItems: false,
      specificItem:''

    };
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerCloseItems = this.handlerCloseItems.bind(this)
    this.handlerConfirmItems = this.handlerConfirmItems.bind(this)
  }
  dialog = React.createRef<FormMessageModal>();

  componentDidMount(): void {

    if (!this.props?.edit) {
      setTimeout(() => this.setState({ ...this.state, loading: false, }), 500);

    } else {
      if (this.props.location.state) {
        const routeState = this.props.location.state;
        setTimeout(() => this.setState({ ...this.props.location.state, loading: false, }), 500)
      } else {
        new BinlocationRepository().find(this.props.match.params.id).then((res: any) => {
          this.setState({ ...res, loading: false });
        }).catch((e: Error) => {
          this.setState({ message: e.message });
        })
      }
    }

  }




  async handlerSubmit(event: any) {
    event.preventDefault();

    this.setState({ ...this.state, isSubmitting: true });
    const { id } = this.props?.match?.params

    await new BinlocationRepository().post(this.state, this.props?.edit, id).then((res: any) => {
      const warehouses = new Binlocation(res?.data)

      this.props.history.replace(this.props.location.pathname?.replace('create', warehouses.id), warehouses);
      this.dialog.current?.success("Create Successfully.");
    }).catch((e: any) => {
      if (e instanceof UpdateDataSuccess) {
        this.props.history.replace(this.props.location.pathname?.replace('/edit', ''), { ...this.state, isSubmitting: false });
        this.dialog.current?.success(e.message);
        // const query = this.props.query.query as QueryClient;
        return;
      }
      this.dialog.current?.error(e.message);
    }).finally(() => {
      this.setState({ ...this.state, isSubmitting: false })
    });
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
  protected handlerChange(key: string, value: any) {
    let temps: any = { ...this.state };
    temps[key] = value;

    this.setState(temps)
  }
  protected handleOpenItems() {
    this.setState({ ...this.state, isOpenItems: true })
  }

  protected handlerConfirmItems(record: Item) {
    this.setState({
      ...this.state,
      specificItem: record.itemCode,
      isOpenItems: false,
    });
  }
  protected handlerCloseItems() {
    // this.setState({ ...this.state, isOpenItems: false })
  }
  render = () => {
    return <>
      <form onSubmit={this.handlerSubmit} className='h-full w-full flex flex-col gap-4'>
        {this.state.loading ? <div className='h-full w-full flex items-center justify-center'><CircularProgress /></div> : <>
          <ToastContainer
            toastClassName={({ type }: any) => contextClass[type || "default"] +
              " relative flex p-1 min-h-6 rounded-md justify-between overflow-hidden cursor-pointer"
            }
            bodyClassName={() => "text-sm font-white font-med block p-3"}
          />

          <FormMessageModal ref={this.dialog} />
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={this.state.isSubmitting}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <HeadingForm
            data={this.state}
            edit={this.props?.edit}
            handlerChange={(key, value) => this.handlerChange(key, value)}
          />
          <General
            data={this.state}
            edit={this.props?.edit}
            handlerChange={(key, value) => this.handlerChange(key, value)}
            handleOpenItems={() => this.handleOpenItems()}


          />
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
        <ItemsModal  onClose={this.handlerCloseItems} open={this.state.isOpenItems} onOk={(record) => this.handlerConfirmItems(record)} />

      </form>
    </>
  }
}

export default withRouter(BinlocationForm)