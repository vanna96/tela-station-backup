import React, { FC } from 'react'
import MUITextField from './MUITextField'
import GLAccountModal from '../modal/GLAccountModal';
import GLAccount from '@/models/GLAccount';


interface AccountTextField {
    value: any,
    onChange: (account: any) => void
    name: any
}

const AccountTextField: FC<AccountTextField> = ({ value, onChange,name }: AccountTextField) => {
    const [open, setOpen] = React.useState<boolean>(false)

    const handlerConfirm = (account: GLAccount) => {
        onChange({ target: { value: account } })
    }

    const onClose = () => setOpen(false);

    return <>
        <GLAccountModal open={open} onClose={onClose} onOk={handlerConfirm} />
        <MUITextField endAdornment value={value} name={name} onClick={() => setOpen(true)} />
    </>
}


export default AccountTextField;