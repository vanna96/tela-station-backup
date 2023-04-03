import { dateFormat } from "../utilies";
import Model from "./Model";
import { MasterDocument, DocumentLine } from "./interface/index";
import GLAccountRepository from '@/services/actions/GLAccountRepository';

export interface StockTransferProps {
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
  items: StockTransferDocumentLineProps[];
  documentLine: StockTransferDocumentLineProps[];
}

export interface StockTransferDocumentLineProps {
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

export default class StockTransfer extends Model implements MasterDocument {
  id: any;
  docNum: any;
  cardCode?: string;
  cardName?: string;
  docDate?: string;
  docDueDate?: string;
  attachmentEntry?: number;
  docCurrency?: string;
  reference1?: string;
  reference2?: string;
  comments?: string;
  journalMemo?: string;
  salesPersonCode?: string;
  contactPersonCode?: string;
  series?: string;
  taxDate?: string;
  address2?: string;
  documentStatus?: string;
  serie: string;
  shippingType?: string | undefined;
  items: StockTransferDocumentLine[];
  documentowner?: string;
  documentLine?: StockTransferDocumentLine[];
  fromWarehouse?: number;
  toWarehouse?: number;
  shipToDefault?: string;
  owner?: number;
  status?: string;

  constructor(json: any) {
    super();
    this.id = json["DocNum"];
    this.cardCode = json["Requester"];
    this.cardName = json["CardName"];
    this.serie = json["Seriesss"];
    this.owner = json["DocumentsOwner"];
    this.status = json["DocumentStatus"];
    this.docNum = json["DocNum"];
    this.taxDate = json["TaxDate"];
    this.docDueDate = json["DocDueDate"];
    this.docDate = json["DocDate"];
    // this.docType = json["DocType"].replace("dDocument_", "")?.charAt(0);
    this.comments = json["Comments"];
    this.items = json["DocumentLines"]?.map(
      (e: any) => new StockTransferDocumentLine(e)
    );
    this.documentStatus = json["DocumentStatus"]
      .replace("bost_", "")
      ?.charAt(0);
    this.fromWarehouse = json['FromWarehouse'];
    this.toWarehouse = json['ToWarehouse'];
    this.shipToDefault = json['ShipToDefault'];
  }

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    console.log(json);

    return {
      TaxDate: json["taxDate"],
      DocDate: json["docDate"],
      AttachmentEntry: json["attachmentEntry"],
      DocCurrency: json["docCurrency"],
      DocRate: json["docRate"],
      Comments: json["comments"],
      // Serie: json["serie"],
      // Series: json["Series"],

      Address2: json["Address2"],
      DocumentStatus: json["DocumentStatus"],
      StockTransferLines: json["items"]?.map((e: any) =>
        StockTransferDocumentLine.toCreate(e, json["docType"])
      ),
      FromWarehouse: json['fromWarehouse'],
      ToWarehouse: json['toWarehouse'],
      ShipToDefault: json['shipToDefault']


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
export class StockTransferDocumentLine extends Model implements DocumentLine {
  itemCode?: string | undefined;
  itemDescription?: string | undefined;
  itemGroup?: string | undefined;
  quantity?: number | undefined;
  unitPrice?: number | undefined;
  currency?: string | undefined;
  lineDiscount?: number;
  uomEntry?: number | undefined;
  uomCode?: string | undefined;
  TransportationCode?: string | undefined;
  project?: string | undefined;
  vatGroup?: string | undefined;
  requiredDate?: string | undefined;
  shipDate?: string | undefined;
  accountCode?: number | undefined;
  accountNo?: number | undefined;
  accountName?: string | undefined;
  discountPercent?: number;
  requriedDate?: string;
  itemName?: string;
  saleVatGroup?: string;
  lineVendor?: string;
  purchaseVatGroup?: string;
  accountNameD?: string;


  constructor(json: any) {
    super();
    this.saleVatGroup = json["VatGroup"];
    this.itemCode = json["ItemCode"];
    this.itemDescription = json["ItemDescription"];
    this.itemGroup = json["ItemGroup"];
    this.quantity = json["Quantity"];
    this.unitPrice = json["UnitPrice"];
    this.currency = json["PriceCurrency"];
    this.lineDiscount = json["LineDiscount"];
    this.uomEntry = json["UoMEntry"];
    this.uomCode = json["UoMCode"];
    this.requiredDate = json["RequiredDate"];
    this.discountPercent = json["DiscountPercent"];
    this.shipDate = json["ShipDate"];
    this.accountCode = json["AccountCode"];
    this.accountNo = json["AccountNo"];
    this.accountName = json["AccountName"];
    this.lineVendor = json["LineVendor"];
    this.itemName = json["ItemDescription"];
    this.accountNameD = new GLAccountRepository().find(json["AccountCode"])?.Name
    // {(new OwnerRepository().find(data.owner)?.name) || "N/A"}
  }
  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any, type: any) {
    let line = {
      Quantity: json["quantity"],
      ItemCode: json["itemCode"],
      ItemDescription: json["itemName"],
      UnitPrice: json["unitPrice"],
      DocEntry: json["uomGroupEntry"],
      UoMCode: json["uomCode"],
      UoMEntry: json["uomEntry"],
      LineVendor: json["lineVendor"],
      RequiredDate: json["requiredDate"],
      AccountCode: json["AccountNo"],
      DiscountPercent: json["discountPercent"],
    };

    if (type === "S") {
      delete line.ItemCode;
      delete line.UnitPrice;
    }

    return line;
  }
}
