import { dateFormat } from "../utilies";
import Model from "./Model";
import { MasterDocument, DocumentLine } from "./interface/index";

export interface PurchaseRequestProps {
  id: any;
  docNum: any;
  cardCode?: string;
  cardName?: string;
  constactPersonCode?: number;
  startDate?: string;
  endDate?: string;
  terminateDate?: string;
  description?: string;
  agreementType?: string;
  status?: string;
  owner?: string;
  renewal?: boolean;
  remindUnit?: string;
  remindTime?: string;
  remark?: string;
  attachmentEntry?: number;
  settlementProbability?: number;
  agreementMethod?: string;
  paymentTerm?: string;
  priceList?: number;
  signeDate?: string;
  serie: string;
  paymentMethod?: string;
  shippingType?: string | undefined;
  documentLine: PurchaseRequestDocumentLineProps[];
}

export interface PurchaseRequestDocumentLineProps {
  itemNo?: string | undefined;
  itemDescription?: string | undefined;
  itemGroup?: string | undefined;
  quantity?: number | undefined;
  unitPrice?: number | undefined;
  currency?: string | undefined;
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  shippingType?: string | undefined;
  project?: string | undefined;
  vatGroup?: string | undefined;
}

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
  requriedDate?: string;
  updateDate?: string;
  userSign?: string;
  vatSum?: string;
  docTotalSys?: string;
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
  DocTotalSys?: number;
  documentowner?: string;
  vatSumSys?: string;
  price?: number;


  constructor(json: any) {
    super();
    this.id = json["DocNum"];
    this.requester = json["Requester"];
    this.requesterName = json["RequesterName"];
    this.requesterEmail = json["RequesterEmail"];
    this.requesterDepartment = json["RequesterDepartment"];
    this.requesterBranch = json["RequesterBranch"];
    this.serie = json["Series"];
    this.docTotalSys = json["DocTotalSys"];
    this.documentowner = json["DocumentsOwner"];
    this.documentStatus = json["DocumentStatus"];
    this.vatSumSys = json["VatSumSys"];
    this.price = json["Price"];
    this.docNum = json["DocNum"];
    this.requriedDate = dateFormat(json["RequriedDate"]);
    this.creationDate = dateFormat(json["CreationDate"]);
    this.docDueDate = dateFormat(json["DocDueDate"]);
    this.docDate = dateFormat(json["DocDate"]);
    this.docType = json["DocType"].replace("dDocument_", "")?.charAt(0);
    this.comments = json["Comments"];
    // this.documentLine = [];
    // this.isEditable = !json['Status']?.replace('as', "")?.charAt(0)?.includes('A');
    this.documentLine = json["DocumentLines"]?.map(
      (e: any) => new PurchaseRequestDocumentLine(e)
    );
  }

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    console.log(json);

    return {
      Requester: json["requester"],
      RequesterName: json["requesterName"],
      RequesterEmail: json["requesterEmail"],
      RequesterBranch: json["requesterBranch"],
      RequesterDepartment: json["requesterDepartment"],
      DocDueDate: json["docDueDate"],
      AttachmentEntry: ["attachmentEntry"],
      DocCurrency: json["docCurrency"],
      DocRate: json["docRate"],
      Reference1: json["reference1"],
      Reference2: json["reference2"],
      Comments: json["comments"],
      journalMemo: json["journalMemo"],
      documentStatus: json["documentStatus"],
      PriceList: json["priceList"],
      Serie: json["serie"],
      JournalMemo: json["JournalMemo"],
      PaymentGroupCode: json["PaymentGroupCode"],
      SalesPersonCode: json["SalesPersonCode"],
      TransportationCode: json["TransportationCode"],
      Confirmed: json["Confirmed"],
      ContactPersonCode: json["ContactPersonCode"],
      Series: json["Series"],
      DocTotalSys: json["DocTotalSys"],
      TaxDate: json["TaxDate"],
      PartialSupply: json["PartialSupply"],
      DocObjectCode: json["DocObjectCode"],
      Indicator: json["Indicator"],
      FederalTaxID: json["FederalTaxID"],
      DiscountPercent: json["DiscountPercent"],
      CreationDate: json["CreationDate"],
      UpdateDate: json["UpdateDate"],
      UserSign: json["UserSign"],
      VatSum: json["VatSum"],
      RequriedDate: json["requriedDate"],
      CancelDate: json["CancelDate"],
      Rounding: json["Rounding"],
      Address2: json["Address2"],
      DocumentStatus: json["DocumentStatus"],
      PeriodIndicator: json["PeriodIndicator"],
      PayToCode: json["PayToCode"],
      ManualNumber: json["ManualNumber"],
      UseShpdGoodsAct: json["UseShpdGoodsAct"],
      TotalDiscount: json["TotalDiscount"],
      VatPercent: json["VatPercent"],
      ExtraMonth: json["ExtraMonth"],
      ExtraDays: json["ExtraDays"],
      StartFrom: json["StartFrom"],
      DownPaymentStatus: json["DownPaymentStatus"],
      BPLName: json["BPLName"],
      VatRegNum: json["VATRegNum"],
      PaymentTerm: json["PaymentTerm"],
      PaymentMethod: json["PaymentMethod"],
      ShippingType: json["ShippingType"],
      DocumentLines: json["DocumentLines"].map((e: any) =>
        PurchaseRequestDocumentLine.toCreate(e, json["DocType"])
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
      DocTotalSys: json["DocTotalSys"],
      docType: json["DocType"],
      DocumentLines: [],
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
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  transportationCode?: string | undefined;
  project?: string | undefined;
  taxRate?: number | undefined;
  lineTotal?: number | undefined;
  accountCode?: string | undefined;
  accountName?: string | undefined;
  discountPercent?: number | undefined;
  vatGroup?: string | undefined;


  constructor(json: any) {
    super();
    this.itemNo = json["ItemCode"];
    this.itemDescription = json["ItemDescription"];
    this.itemGroup = json["ItemGroup"];
    this.quantity = json["Quantity"];
    this.unitPrice = json["Price"];
    this.currency = json["Currency"];
    this.lineDiscount = json["LineDiscount"];
    this.uomEntry = json["UoMEntry"];
    this.uomCode = json["UoMCode"];
    this.taxRate = json["Rate"];
    this.lineTotal = json["LineTotal"];
    this.accountCode = json["AccountCode"];
    this.uomCode = json["UoMCode"];
    this.accountName = json["AccountName"];
    this.discountPercent = json["DiscountPercent"];
    this.vatGroup = json["VatGroup"]
  }

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any, type: string) {
    let body = {
      ItemCode: json["ItemCode"],
      ItemDescription: json["ItemDescription"],
      UnitPrice: json["UnitPrice"],
      ItemGroup: json["ItemGroup"],
      DiscountPercent: json["DiscountPercent"],
      LineDiscount: 0.0,
      DocEntry: json["UoMGroupEntry"],
      UoMCode: json["UoMCode"],
      TransportationCode: 1,
      Project: null,
      TaxCode: null,
      TAXRate: null,
      VatGroup: json["VatGroup"],
      LineTotal: json["LineTotal"],
      AccountCode: json["AccountCode"],
      AccountName: json["AccountName"],
    };

    if (type === "S") {
      delete body.ItemCode;
      // delete body.ItemDescription;
      delete body.ItemGroup;
      delete body.UnitPrice;
      delete body.DiscountPercent;
      delete body.UnitPrice;
    }
    return body;
  }
}
