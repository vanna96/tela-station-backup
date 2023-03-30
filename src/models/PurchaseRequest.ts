import { dateFormat } from "../utilies";
import Model from "./Model";
import { MasterDocument, DocumentLine } from "./interface/index";
import Department from "./Department";

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
  items: PurchaseRequestDocumentLineProps[];
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
  cardCode?: string;
  cardName?: string;
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
  items: PurchaseRequestDocumentLine[];
  DocTotalSys?: number;
  documentowner?: string;
  vatSumSys?: string;
  price?: number;
  userCode?: string;
  userName?: string;
  department?: string;
  branch?: string;
  status?: string;
  email?: string;
  owner?: string;
  documentLine?: PurchaseRequestDocumentLine[];

  constructor(json: any) {
    super();
    this.id = json["DocNum"];
    this.cardCode = json["Requester"];
    this.reqType = json["ReqType"];
    this.cardName = json["RequesterName"];
    this.department = json["RequesterDepartment"];
    this.branch = json["RequesterBranch"];
    this.requester = json["Requester"];
    this.requesterName = json["RequesterName"];
    this.requesterEmail = json["RequesterEmail"];
    this.requesterDepartment = json["RequesterDepartment"];
    this.requesterBranch = json["RequesterBranch"];
    this.serie = json["Seriesss"];
    this.docTotalSys = json["DocTotalSys"];
    this.owner = json["DocumentsOwner"];
    this.status = json["DocumentStatus"];
    this.vatSumSys = json["VatSumSys"];
    this.price = json["Price"];
    this.docNum = json["DocNum"];
    this.requriedDate = json["RequriedDate"];
    this.creationDate = json["CreationDate"];
    this.docDueDate = json["DocDueDate"];
    this.docDate = json["DocDate"];
    this.docType = json["DocType"].replace("dDocument_", "")?.charAt(0);
    this.comments = json["Comments"];
    // this.documentLine = [];
    // this.isEditable = !json['Status']?.replace('as', "")?.charAt(0)?.includes('A');
    this.items = json["DocumentLines"]?.map(
      (e: any) => new PurchaseRequestDocumentLine(e)
    );
    // this.documentLine = json["DocumentLines"]?.map(
    //   (e: any) => new PurchaseRequestDocumentLine(e)
    // );
    this.userCode = json["Requester"];
    this.userName = json["RequesterName"];
    this.department = json["RequesterDepartment"];
    this.branch = json["RequesterBranch"];
    this.documentStatus = json["DocumentStatus"]
      .replace("bost_", "")
      ?.charAt(0);
    this.email = json["RequesterEmail"];
    this.reqType = json["ReqType"];
  }

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    console.log(json);

    return {
      Requester: json["cardCode"],
      RequesterName: json["cardName"],
      RequesterEmail: json["email"],
      RequesterBranch: json["branch"],
      RequesterDepartment: json["department"],
      DocType: json["docType"],
      CreationDate: json["creationDate"],
      DocDate: json["docDate"],
      RequriedDate: json["requriedDate"],
      DocDueDate: json["docDueDate"],
      DocumentOwner: json["owner"],
      AttachmentEntry: ["attachmentEntry"],
      DocCurrency: json["docCurrency"],
      DocRate: json["docRate"],
      Comments: json["comments"],
      PriceList: json["priceList"],
      // Serie: json["serie"],
      // Series: json["Series"],
      DocTotalSys: json["DocTotalSys"],
      DiscountPercent: json["DiscountPercent"],
      Rounding: json["Rounding"],
      Address2: json["Address2"],
      DocumentStatus: json["DocumentStatus"],
      DocumentLine: json["items"]?.map((e: any) =>
        PurchaseRequestDocumentLine.toCreate(e, json["DocType"])
      ),
      
      // documentLine: json["items"]?.map((e: any) =>
      // PurchaseRequestDocumentLine.toCreate(e, json["DocType"])),
    };
  }

  public static toUpdate(json: any) {
    return {
      Requester: json["userCode"],
      RequesterName: json["userName"],
      RequesterEmail: json["requesterEmail"],
      RequesterBranch: json["requesterBranch"],
      RequesterDepartment: json["requesterDepartment"],
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
      items: [],
    };
  }
}
export class PurchaseRequestDocumentLine extends Model implements DocumentLine {
  itemCode?: string | undefined;
  itemDescription?: string | undefined;
  quantity?: number | undefined;
  unitPrice?: number | undefined;
  currency?: string | undefined;
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  TransportationCode?: string | undefined;
  project?: string | undefined;
  taxCode?: string | undefined;
  taxRate?: number | undefined;
  vatGroup?: string | undefined;
  lineTotal?: string | undefined;
  requiredDate?: string | undefined;
  shipDate?: string | undefined;
  accountCode?: number | undefined;
  accountName?: string | undefined;
  blanketAgreementNumber?: string | undefined;
  discountPercent?: number;
  requriedDate?: string;
  itemName?: string;
  saleVatGroup?: string;
  lineVendor?: string;
  
  constructor(json: any) {
    super();
    this.saleVatGroup = json["VatGroup"];
    this.itemCode = json["ItemCode"];
    this.itemDescription = json["ItemDescription"];
    this.quantity = json["Quantity"];
    this.unitPrice = json["UnitPrice"];
    this.currency = json["PriceCurrency"];
    this.lineDiscount = json["LineDiscount"];
    this.uomEntry = json["UoMEntry"];
    this.uomCode = json["UoMCode"];
    this.project = json["Project"];
    this.vatGroup = json["VatGroup"];
    this.requiredDate = json["RequiredDate"];
    this.discountPercent = json["DiscountPercent"];
    this.shipDate = json["ShipDate"];
    this.accountCode = json["AccountCode"];
    this.accountName = json["AccountName"];
    this.lineTotal = json["LineTotal"];
    this.lineVendor = json["LineVendor"];
    this.itemName = json["ItemDescription"];
  }
  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any, type: any) {
    let line = {
      Quantity: json["quantity"],
      ItemCode: json["itemCode"],
      ItemDescription: json["itemName"],
      // ItemName: json["itemName"],
      UnitPrice: json["unitPrice"],
      // LineDiscount: 0.0,
      DocEntry: json["uomGroupEntry"],
      UoMCode: json["uomCode"],
      // TransportationCode: 1,
      // Project: null,
      // TaxCode: null,
      // TAXRate: null,
      VatGroup: json["vatGroup"],
      LineTotal: json["lineTotal"],
      RequiredDate: json["requiredDate"],
      ShipDate: json["shipDate"],
      AccountCode: json["accountCode"],
      AccountName: json["accountName"],
      DiscountPercent: json["discountPercent"],
    };

    if (type === "S") {
      delete line.ItemCode;
      delete line.UnitPrice;
    }

    return line;
  }
}
