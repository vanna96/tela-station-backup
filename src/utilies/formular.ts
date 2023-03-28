


export default class Formular {
    constructor() {

    }

    public static findToTal(qty:  string, price:  string) {
        const total = parseFloat(price) * parseFloat(qty);

        if (isNaN(total)) return 0;
        return total;
    }

    public static findToTalDiscountPercent(qty:  string, price:  string, discount: string) {
        let total = parseFloat(price) * parseFloat(qty);
        const totalDiscount = (total * parseFloat(discount)) / 100;
        
        total = total - totalDiscount;
        
        if (isNaN(total)) return 0;

        return total;
    }
}
