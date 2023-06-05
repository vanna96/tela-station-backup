import React from "react";
import { Button } from "@mui/material";

const MenuButton = (props: any) => {
    return <Button
        onClick={props?.onClick}
        sx={{
            borderBottom: props?.active ? 'solid 3px #0ea5e9' : 'solid 0px #0ea5e9',
            borderRadius: '0',
        }}>
        <span className={`capitalize ${props.active ? 'text-sky-600' : ''}`}>{props?.children}</span>
    </Button>
}

export default MenuButton;