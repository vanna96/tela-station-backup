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

export default function Login() {
  const [cookies, setCookie, removeCookie] = useCookies(["sessionId", 'uomGroup', 'vatRate']);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const navigate = useNavigate();

  const username = React.useRef("manager");
  const password = React.useRef("manager");

  const onSubmit = async () => {
    try {
      setLoading(true)
      const auth = new AuthLogin('SBODemoAU', 'manager', 'manager');
      const response: any = await request('POST', '/Login', auth.toJson());
      setCookie("sessionId", response?.data?.SessionId, { maxAge: 2000 });
      await fetchAllDate()
      navigate("/");
    } catch (e: any) {
      setMessage(e?.message)
    } finally {
      setLoading(false)
    }
  }


  async function fetchAllDate(): Promise<void> {
    Promise.all([
      await new ItemGroupRepository().get(),
      await new UnitOfMeasurementRepository().get(),
      await new DepartmentRepository().get(),
      await new PaymentMethodRepository().get(),
      await new PaymentTermTypeRepository().get(),
      await new OwnerRepository().get(),
    ]);
  }

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-[28rem] flex flex-col gap-5 p-10 rounded-xl shadow-lg bg-white'>
        <h2 className='font-bold text-2xl text-center'>LOGIN</h2>
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
