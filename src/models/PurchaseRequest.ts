import { dateFormat } from "../utilies";
import Model from "./Model";
import { MasterDocument, DocumentLine } from "./interface/index";

export default class PurchaseRequest extends Model implements MasterDocument {
  id: any;
  docNum: any;
  requester?: string;
  requesterName?: string;
  requesterEmail?: string;
  requesterBranch?: string;
  requesterDepartment?: string;
  reqType?: string;
  reqCode?: string;
  inventoryStatus?: string;
  docType?: string;
  docDate?: string;
  docDueDate?: string;
  attachmentEntry?: number;
  docCurrency?: string;
  docRate?: string;
  reference1?: string;
  reference2?: string;
  comments?: string;
  journalMemo?: string;
  paymentGroupCode?: string;
  salesPersonCode?: string;
  transportationCode?: string;
  confirmed?: string;
  contactPersonCode?: string;
  series?: string;
  taxDate?: string;
  partialSupply?: string;
  docObjectCode?: string;
  indicator?: string;
  federalTaxID?: string;
  discountPercent?: string;
  creationDate?: string;
  updateDate?: string;
  userSign?: string;
  vatSum?: string;
  docTotalSys?: string;
  requriedDate?: string;
  cancelDate?: string;
  rounding?: string;
  address2?: string;
  documentStatus?: string;
  periodIndicator?: string;
  payToCode?: string;
  manualNumber?: string;
  useShpdGoodsAct?: string;
  totalDiscount?: string;
  vatPercent?: string;
  extraMonth?: string;
  extraDays?: string;
  startFrom?: string;
  downPaymentStatus?: string;
  bPLName?: string;
  vATRegNum?: string;
  paymentTerm?: string;
  priceList?: number;
  serie: string;
  paymentMethod?: string;
  shippingType?: string | undefined;
  documentLine: PurchaseRequestDocumentLine[];

  constructor(json: any) {
    super();
    this.id = json["DocNum"];
    this.requester = json["Requester"];
    this.requesterName = json["RequesterName"];
    this.requesterEmail = json["RequesterEmail"];
    this.serie = json["Series"];
    this.docNum = json["DocNum"];
    this.documentLine = [];
  }

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    console.log(json);

    return {
      requester: json["Requester"],
      requesterName: json["RequesterName"],
      requesterEmail: json["requesterEmail"],
      requesterBranch: json["requesterBranch"],
      requesterDepartment: json["requesterDepartment"],
      docDueDate: json["DocDueDate"],
      attachmentEntry: ["AttachmentEntry"],
      docCurrency: json["DocCurrency"],
      docRate: json["DocRate"],
      reference1: json["Reference1"],
      reference2: json["Reference2"],
      comments: json["Comments"],
      journalMemo: json["JournalMemo"],
      paymentGroupCode: json["PaymentGroupCode"],
      salesPersonCode: json["SalesPersonCode"],
      transportationCode: json["TransportationCode"],
      confirmed: json["Confirmed"],
      contactPersonCode: json["ContactPersonCode"],
      series: json["Series"],
      taxDate: json["TaxDate"],
      partialSupply: json["PartialSupply"],
      docObjectCode: json["DocObjectCode"],
      indicator: json["Indicator"],
      federalTaxID: json["FederalTaxID"],
      discountPercent: json["DiscountPercent"],
      creationDate: json["CreationDate"],
      updateDate: json["UpdateDate"],
      userSign: json["UserSign"],
      vatSum: json["VatSum"],
      docTotalSys: json["DocTotalSys"],
      requiredDate: json["RequriedDate"],
      cancelDate: json["CancelDate"],
      rounding: json["Rounding"],
      address2: json["Address2"],
      documentStatus: json["DocumentStatus"],
      periodIndicator: json["PeriodIndicator"],
      payToCode: json["PayToCode"],
      manualNumber: json["ManualNumber"],
      useShpdGoodsAct: json["UseShpdGoodsAct"],
      totalDiscount: json["TotalDiscount"],
      vatPercent: json["VatPercent"],
      extraMonth: json["ExtraMonth"],
      extraDays: json["ExtraDays"],
      startFrom: json["StartFrom"],
      downPaymentStatus: json["DownPaymentStatus"],
      bPLName: json["BPLName"],
      vatRegNum: json["VATRegNum"],
      paymentTerm: json["PaymentTerm"],
      priceList: json["PriceList"],
      serie: json["Serie"],
      paymentMethod: json["PaymentMethod"],
      shippingType: json["ShippingType"],
      DocumentLines: json["items"].map((e: any) =>
        PurchaseRequestDocumentLine.toCreate(e)
      ),
    };
  }

  public static toUpdate(json: any) {
    return {
     requester: json["Requester"],
      requesterName: json["RequesterName"],
      requesterEmail: json["requesterEmail"],
      requesterBranch: json["requesterBranch"],
      requesterDepartment: json["requesterDepartment"],
      docDueDate: json["DocDueDate"],
      attachmentEntry: ["AttachmentEntry"],
      docCurrency: json["DocCurrency"],
      docRate: json["DocRate"],
      reference1: json["Reference1"],
      reference2: json["Reference2"],
      comments: json["Comments"],
      journalMemo: json["JournalMemo"],
      paymentGroupCode: json["PaymentGroupCode"],
      salesPersonCode: json["SalesPersonCode"],
      transportationCode: json["TransportationCode"],
      confirmed: json["Confirmed"],
      contactPersonCode: json["ContactPersonCode"],
      series: json["Series"],
      taxDate: json["TaxDate"],
      partialSupply: json["PartialSupply"],
      docObjectCode: json["DocObjectCode"],
      indicator: json["Indicator"],
      federalTaxID: json["FederalTaxID"],
      discountPercent: json["DiscountPercent"],
      creationDate: json["CreationDate"],
      updateDate: json["UpdateDate"],
      userSign: json["UserSign"],
      vatSum: json["VatSum"],
      docTotalSys: json["DocTotalSys"],
      requiredDate: json["RequriedDate"],
      cancelDate: json["CancelDate"],
      rounding: json["Rounding"],
      address2: json["Address2"],
      documentStatus: json["DocumentStatus"],
      periodIndicator: json["PeriodIndicator"],
      payToCode: json["PayToCode"],
      manualNumber: json["ManualNumber"],
      useShpdGoodsAct: json["UseShpdGoodsAct"],
      totalDiscount: json["TotalDiscount"],
      vatPercent: json["VatPercent"],
      extraMonth: json["ExtraMonth"],
      extraDays: json["ExtraDays"],
      startFrom: json["StartFrom"],
      downPaymentStatus: json["DownPaymentStatus"],
      bPLName: json["BPLName"],
      vatRegNum: json["VATRegNum"],
      paymentTerm: json["PaymentTerm"],
      priceList: json["PriceList"],
      serie: json["Serie"],
      paymentMethod: json["PaymentMethod"],
      shippingType: json["ShippingType"],
      DocumentLines: []
    };
  }
}

export class PurchaseRequestDocumentLine extends Model implements DocumentLine {
  itemNo?: string | undefined;
  itemDescription?: string | undefined;
  itemGroup?: string | undefined;
  quantity?: number | undefined;
  unitPrice?: number | undefined;
  currency?: string | undefined;
  cumilativeQuantity?: number | undefined;
  cumilativeAmount?: number | undefined;
  plannedAmount?: number;
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  shippingType?: string | undefined;
  project?: string | undefined;
  taxCode?: string | undefined;
  taxRate?: number | undefined;

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    return {
      ItemNo: json["ItemCode"],
      ItemDescription: json["ItemName"],
      ItemGroup: json["ItemsGroupCode"],
      PlannedQuantity: json["Quantity"],
      UnitPrice: json["UnitPrice"],
      CumulativeQuantity: null,
      CumulativeAmountLC: null,
      CumulativeAmountFC: 0.0,
      FreeText: json["freeText"] ?? null,
      InventoryUoM: json["InventoryUOM"],
      PortionOfReturns: null,
      EndOfWarranty: null,
      PlannedAmountLC: 0.0,
      PlannedAmountFC: 0.0,
      LineDiscount: 0.0,
      UoMEntry: json["UoMGroupEntry"],
      UoMCode: null,
      UnitsOfMeasurement: 1.0,
      UndeliveredCumulativeQuantity: null,
      UndeliveredCumulativeAmountLC: null,
      UndeliveredCumulativeAmountFC: 0.0,
      ShippingType: 1,
      Project: null,
      TaxCode: null,
      TAXRate: null,
      PlannedVATAmountLC: null,
      PlannedVATAmountFC: null,
      CumulativeVATAmountLC: null,
      CumulativeVATAmountFC: null,
    };
  }
}
