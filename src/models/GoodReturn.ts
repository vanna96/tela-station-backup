import { dateFormat } from "../utilies";
import Model from "./Model";
import { MasterDocument, DocumentLine } from "./interface/index";

export default class GoodReturn extends Model implements MasterDocument {
  id: any;
  docNum: any;
  cardCode?: string;
  cardName?: string;
  constactPersonCode?: number;
  status?: string;
  owner?: string;
  remark?: string;
  attachmentEntry?: number;
  paymentTerm?: string;
  priceList?: number;
  serie: string;
  paymentMethod?: string;
  shippingType?: string | undefined;
  documentLine: GoodReturnDocumentLine[];
  docDate?: string;
  docDueDate?: string;
  creationDate?: string;
  requiredDate?: string;

  constructor(json: any) {
    super();
    this.id = json["AgreementNo"];
    this.serie = json["Series"];
    // this.docNum = json["DocNum"];
    this.cardName = json["CardName"];
    this.cardCode = json["CardCode"];
    this.constactPersonCode = json["ContactPersonCode"];
    this.documentLine = [];
    this.docDueDate = json["DocDueDate"];
    this.creationDate = json["CreationDate"];
    this.requiredDate = json["RequiredDate"];
  }

  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    console.log(json);

    return {
      CardCode: json["cardCode"],
      CardName: json["cardName"],
      ContactPersonCode: json["contactPersonCode"],
      DocumentStatus: json["status"],
      DocumentsOwner: json["owner"],
      AttachmentEntry: json["attachmentEntry"],
      PaymentTerms: json["paymentTerms"],
      // "Series": json['serie'],
      PaymentMethod: json["paymentMethod"],
      ShippingType: json["shippingType"],
      NumAtCard: json["numAtCard"],
      Project: json["project"],
      BPCurrency: json["currency"],
      DocumentLines: json["items"].map((e: any) =>
        GoodReturnDocumentLine.toCreate(e)
      ),
    };
  }

  public static toUpdate(json: any) {
    return {
      CardCode: json["cardCode"],
      CardName: json["cardName"],
      ContactPersonCode: json["contactPersonCode"],
      DocumentStatus: json["status"],
      DocumentsOwner: json["owner"],
      AttachmentEntry: json["attachmentEntry"],
      PaymentTerms: json["paymentTerms"],
      // "Series": json['serie'],
      PaymentMethod: json["paymentMethod"],
      ShippingType: json["shippingType"],
      NumAtCard: json["numAtCard"],
      Project: json["project"],
      BPCurrency: json["currency"],
      DocumentLines: [],
    };
  }
}

export class GoodReturnDocumentLine extends Model implements DocumentLine {
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
      ItemCode: json["ItemCode"],
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
