import { useMemo } from "react";
import MUISelect from "./MUISelect";

function ShippingType(props: any) {

    return <MUISelect
        {...props}
        aliaslabel="Name"
        aliasvalue="Code"
        loading={true}
        items={[]}
    />
}

export default ShippingType;