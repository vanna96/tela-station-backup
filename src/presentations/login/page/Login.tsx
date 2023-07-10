import React from 'react'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import Alert from '@mui/material/Alert';
import request from '../../../utilies/request';
import AuthLogin from '../../../models/AuthLogin';
import ItemGroupRepository from '../../../services/actions/itemGroupRepository';
import UnitOfMeasurementRepository from '../../../services/actions/unitOfMeasurementRepository';
import DepartmentRepository from '@/services/actions/departmentRepository';
import PaymentMethodRepository from '../../../services/actions/paymentMethodRepository';
import PaymentTermTypeRepository from '../../../services/actions/paymentTermTypeRepository';
import OwnerRepository from '@/services/actions/ownerRepository';
import ShippingTypeRepository from '../../../services/actions/shippingTypeRepository';
import SalePersonRepository from '@/services/actions/salePersonRepository';
import GLAccountRepository from '@/services/actions/GLAccountRepository';
import VatGroupRepository from '@/services/actions/VatGroupRepository';
import BranchRepository from '../../../services/actions/branchRepository';
import WarehouseRepository from '@/services/warehouseRepository';
import DistributionRuleRepository from '@/services/actions/distributionRulesRepository';
import PriceListRepository from '@/services/actions/pricelistRepository';
import UsersRepository from '@/services/actions/usersRepository';
import CustomsGroupRepository from '@/services/actions/customsGroupRepository';
import ManufacturerRepository from '@/services/actions/manufacturerRepository';
import UnitOfMeasurementGroupRepository from '@/services/actions/unitOfMeasurementGroupRepository';
import GetCurrentUserRepository from '../repository/getCurrencyUserRepository';

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["sessionId", 'user']);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const username = React.useRef("manager");
  const password = React.useRef("Admin@123");

  const onSubmit = async () => {
    try {
      setLoading(true)
      const auth = new AuthLogin('TMCT', 'manager', 'Admin@123');
      const response: any = await request('POST', '/Login', auth.toJson());
      setCookie("sessionId", response?.data?.SessionId, { maxAge: 2000 });
      const user = await GetCurrentUserRepository.post();
      setCookie("user", user, { maxAge: 2000 });
      // await fetchAllDate()
      navigate("/");
    } catch (e: any) {
      setMessage(e?.message)
    } finally {
      setLoading(false)
    }
  }


  // async function fetchAllDate(): Promise<void> {
  //   Promise.all([
  //     await new ItemGroupRepository().get(),
  //     await new UnitOfMeasurementRepository().get(),
  //     await new UnitOfMeasurementGroupRepository().get(),
  //     await new DepartmentRepository().get(),
  //     await new PaymentMethodRepository().get(),
  //     await new PaymentTermTypeRepository().get(),
  //     await new OwnerRepository().get(),
  //     await new ShippingTypeRepository().get(),
  //     await new SalePersonRepository().get(),
  //     await new GLAccountRepository().get(),
  //     await new VatGroupRepository().get(),
  //     await new BranchRepository().get(),
  //     await new WarehouseRepository().get(),
  //     await new DistributionRuleRepository().get(),
  //     await new PriceListRepository().get(),
  //     await new UsersRepository().get(),
  //     await new DistributionRuleRepository().get,
  //     await new CustomsGroupRepository().get(),
  //     await new ManufacturerRepository().get()
  //   ]);
  // }

  return (
    <div className='w-full h-full flex justify-center items-center dark-theme'>
      <div className='w-[28rem] flex flex-col gap-5 p-10 rounded-xl shadow-lg '>
        <h2 className=
          'font-bold text-2xl text-center'>LOGIN</h2>
        <div className='my-2'>
          {message && <Alert severity='error' onClose={() => setMessage("")}>{message}</Alert>}
        </div>
        <TextField label="Username" id="outlined-size-small" size="small" defaultValue={username.current} />
        <TextField label="Password" id="outlined-size-small" size="small" defaultValue={password.current} />
        <div className='my-1'></div>
        <LoadingButton variant="contained" disableElevation loading={loading} onClick={onSubmit}>
          Submit
        </LoadingButton>
      </div>
    </div>
  )
}
