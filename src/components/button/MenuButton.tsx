import React from "react";
import { Button } from "@mui/material";

const MenuButton = (props: any) => {
    return <Button onClick={props?.onClick} sx={{ borderBottom: props?.active ? 'solid' : '', borderRadius: '0' }}><span className="capitalize ">{props?.children}</span></Button>
}

export default MenuButton;