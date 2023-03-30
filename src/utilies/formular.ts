export default class Formular {
  constructor() {}

  public static findItemTotal(items: any[]): number {
    const total = items?.reduce((accumulator: number, currentItem: any) => {
      return accumulator + (currentItem.quantity * currentItem.unitPrice);
    }, 0);
    if (isNaN(total)) return 0;

    return total;
  }

  public static findToTal(qty: string, price: string) {
    const total = parseFloat(price) * parseFloat(qty);

    if (isNaN(total)) return 0;

    return total;
  }
  public static findLineTotal(qty: string, price: string, discount: string){
    const total = parseFloat(price) * parseFloat(qty) - (parseFloat(price) * parseFloat(qty) * (parseFloat(discount)/100))
    if (isNaN(total)) {
      return 0;
    }
  
    return total;
  }

  public static findToTalDiscountPercent(
    qty: string,
    price: string,
    discount: string
  ) {
    let total = parseFloat(price) * parseFloat(qty);
    const totalDiscount = (total * parseFloat(discount)) / 100;

    total = total - totalDiscount;

    if (isNaN(total)) return 0;

    return total;
  }
  public static findTotalBeforeDiscount(items: any[]): number {
    const total = items?.reduce(
      (prev: number, currentItem: any) => {
        return (
          parseInt(currentItem?.quantity) * parseFloat(currentItem?.unitPrice) -
          (parseFloat(currentItem.unitPrice) *
            parseInt(currentItem.quantity) *
            parseFloat(currentItem.discountPercent)) /
            100 +
          (prev ?? 0)
        );
      },
      0
    );
    if (isNaN(total)) {
      return 0;
    }
  
    return total;
  }
}

