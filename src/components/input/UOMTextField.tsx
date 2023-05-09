import React, { FC } from 'react'
import MUITextField from './MUITextField'
import Project from '@/models/Project';
import ProjectModal from '../modal/ProjectModal';
import UoMListModal from '../modal/UomListModal';


interface UOMTextField {
    value: any,
    data: any[],
    onChange: (project: any) => void
}

const UOMTextField: FC<UOMTextField> = ({ value, onChange, data }: UOMTextField) => {
    const [open, setOpen] = React.useState<boolean>(false)

    const handlerConfirm = (project: Project) => {
        onChange({ target: { value: project.code } })
    }

    const onClose = () => setOpen(false);

    return <>
        <UoMListModal open={open} onClose={onClose} onOk={handlerConfirm} data={data} />
        <MUITextField endAdornment value={value} onClick={() => setOpen(true)} />
    </>
}


export default UOMTextField;