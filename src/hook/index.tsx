import React from "react";

export const useDocumentTotalHook = (items: any[]) => {
    const docTotal: number = React.useMemo(() => {
        let total = items.reduce((prev: number, cur: any) => {
            return prev + parseFloat(cur?.LineTotal ?? 0);
        }, 0);

        return total;
    }, [items]);

    const docTaxTotal: number = React.useMemo(() => {
        let total = items.reduce((prev: number, cur: any) => {
            return prev + ((parseFloat(cur?.VatRate ?? 1) * parseFloat(cur?.LineTotal ?? 1)) / 100);
        }, 0);

        return total;
    }, [items]);


    return [docTotal, docTaxTotal];
}