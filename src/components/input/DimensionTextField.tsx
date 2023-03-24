import React, { FC } from 'react'
import MUITextField from './MUITextField'
import DistributionRuleModal from '../modal/DistributionRuleModal';
import DistributionRule from '@/models/DistributionRule';


interface DistributionRuleTextField {
    value: any,
    onChange: (dimension: any) => void
}

const DistributionRuleTextField: FC<DistributionRuleTextField> = ({ value, onChange }: DistributionRuleTextField) => {
    const [open, setOpen] = React.useState<boolean>(false)

    const handlerConfirm = (dimension: DistributionRule) => {
        onChange({ target: { value: dimension.code } })
    }

    const onClose = () => setOpen(false);

    return <>
        <DistributionRuleModal open={open} onClose={onClose} onOk={handlerConfirm} />
        <MUITextField endAdornment value={value} onClick={() => setOpen(true)} />
    </>
}


export default DistributionRuleTextField;