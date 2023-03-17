import { useMemo } from "react";
import MUISelect from "./MUISelect";

function PaymentTerm(props: any) {

    return <MUISelect
        {...props}
        aliaslabel="PaymentTermsGroupName"
        aliasvalue="GroupNumber"
        loading={true}
        items={[]}
    />
}

export default PaymentTerm;