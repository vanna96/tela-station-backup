import { dateFormat } from "../utilies";
import Model from "./Model";
import { MasterDocument, DocumentLine } from "./interface/index";
import Department from "./Department";
import ItemGroup from './ItemGroup';
import GLAccountRepository from '@/services/actions/GLAccountRepository';

let index = 1;
export interface ItemMasterProps {
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
  items: ItemMasterDocumentLineProps[];
  documentLine: ItemMasterDocumentLineProps[];
}

export interface ItemMasterDocumentLineProps {
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

export default class ItemMaster extends Model implements MasterDocument {
  id: any;
  index: number;
  docNum: any;
  itemCode?: string;
  itemName?: string;
  foreignName?: string | undefined;
  itemsGroupCode?: string | undefined;
  customsGroupCode?: string | undefined;
  salesVATGroup?: string | undefined;
  barCode?: string | undefined;
  vatLiable?: string | undefined;
  purchaseItem?: string | undefined;
  salesItem?: string | undefined;
  inventoryItem?: string | undefined;
  //?: string | undefined; picture
  user_Text?: string | undefined;
  serialNum?: string | undefined;
  manufacturer?: string | undefined;
  valid?: string | undefined;
  validFrom?: string | undefined;
  validTo?: string | undefined;
  validRemarks?: string | undefined;
  frozen?: string | undefined;
  frozenFrom?: string | undefined;
  frozenTo?: string | undefined;
  frozenRemarks?: string | undefined;
  salesItemsPerUnit?: string | undefined;
  //?: string | undefined; salesPackingUnit
  //?: string | undefined; salesQtyPerUnit
  salesUnitLength?: string | undefined;
  salesLengthUnit?: string | undefined;
  salesUnitWidth?: string | undefined;
  salesWidthUnit?: string | undefined;
  salesUnitHeight?: string | undefined;
  salesHeightUnit?: string | undefined;
  salesUnitVolume?: string | undefined;
  salesVolumeUnit?: string | undefined;
  salesUnitWeight?: string | undefined;
  salesWeightUnit?: string | undefined;
  purchaseUnit?: string | undefined;
  purchaseItemsPerUnit?: string | undefined;
  //?: string | undefined; purchasePackingUnit
  purchaseQtyPerPackUnit?: string | undefined;
  purchaseUnitLength?: string | undefined;
  purchaseLengthUnit?: string | undefined;
  purchaseUnitWidth?: string | undefined;
  purchaseWidthUnit?: string | undefined;
  purchaseUnitHeight?: string | undefined;
  purchaseHeightUnit?: string | undefined;
  purchaseUnitVolume?: string | undefined;
  purchaseVolumeUnit?: string | undefined;
  purchaseUnitWeight?: string | undefined;
  purchaseWeightUnit?: string | undefined;
  purchaseVATGroup?: string | undefined;
  salesFactor1?: string | undefined;
  salesFactor2?: string | undefined;
  salesFactor3?: string | undefined;
  salesFactor4?: string | undefined;
  purchaseFactor1?: string | undefined;
  purchaseFactor2?: string | undefined;
  purchaseFactor3?: string | undefined;
  purchaseFactor4?: string | undefined;
  movingAveragePrice?: string | undefined;
  avgStdPrice?: string | undefined;
  defaultWarehouse?: string | undefined;
  shipType?: string | undefined;
  glMethod?: string | undefined;
  taxType?: string | undefined;
  maxInventory?: string | undefined;
  manageStockByWarehouse?: string | undefined;
  purchaseHeightUnit1?: string | undefined;
  purchaseUnitHeight1?: string | undefined;
  purchaseLengthUnit1?: string | undefined;
  purchaseUnitLength1?: string | undefined;
  purchaseWeightUnit1?: string | undefined;
  purchaseUnitWeight1?: string | undefined;
  purchaseWidthUnit1?: string | undefined;
  purchaseUnitWidth1?: string | undefined;
  salesHeightUnit1?: string | undefined;
  salesUnitHeight1?: string | undefined;
  salesLengthUnit1?: string | undefined;
  salesUnitLength1?: string | undefined;
  salesWeightUnit1?: string | undefined;
  salesUnitWeight1?: string | undefined;
  salesWidthUnit1?: string | undefined;
  salesUnitWidth1?: string | undefined;
  forceSelectionOfSerialNumber?: string | undefined;
  manageSerialNumbersOnReleaseOnly?: string | undefined;
  wtLiable?: string | undefined;
  costAccountingMethod?: string | undefined;
  itemCountryOrg?: string | undefined;
  issueMethod?: string | undefined;
  sriAndBatchManageMethod?: string | undefined;
  inventoryUOM?: string | undefined;
  itemType?: string | undefined;
  itemClass?: string | undefined;
  outgoingServiceCode?: string | undefined;
  incomingServiceCode?: string | undefined;
  serviceGroup?: string | undefined;
  ncmCode?: string | undefined;
  materialType?: string | undefined;
  materialGroup?: string | undefined;
  autoCreateSerialNumbersOnRelease?: string | undefined;
  series?: string | undefined;
  issuePrimarilyBy?: string | undefined;
  noDiscounts?: string | undefined;
  assetClass?: string | undefined;
  assetGroup?: string | undefined;
  inventoryNumber?: string | undefined;
  technician?: string | undefined;
  employee?: string | undefined;
  location?: string | undefined;
  assetStatus?: string | undefined;
  manageByQuantity?: string | undefined;
  uomGroupEntry?: string | undefined;
  inventoryUoMEntry?: string | undefined;
  defaultSalesUoMEntry?: string | undefined;
  defaultPurchasingUoMEntry?: string | undefined;
  inventoryWeight?: string | undefined;
  inventoryWeightUnit?: string | undefined;
  inventoryWeight1?: string | undefined;
  inventoryWeightUnit1?: string | undefined;
  defaultCountingUnit?: string | undefined;
  countingItemsPerUnit?: string | undefined;
  defaultCountingUoMEntry?: string | undefined;
  manageSerialNumbers?: string | undefined;
  manageBatchNumbers?: string | undefined;
  attachmentEntry?: string | undefined;
  createQRCodeFrom?: string | undefined;
  itemPrices?: any[] | undefined;
  itemWarehouseInfoCollection?: any[] | undefined;
  itemBarCodeCollection?: any[] | undefined;
  documentLine?: ItemMasterDocumentLine[];

  constructor(json: any) {
    super();
    this.index = index++
    this.id = json["ItemCode"];
    this.itemCode = json["ItemCode"];
    this.itemName = json["ItemName"];
    this.foreignName = json["ForeignName"]
    this.itemsGroupCode = json['ItemsGroupCode']
    this.customsGroupCode = json['CustomsGroupCode']
    this.salesVATGroup = json['SalesVATGroup']
    this.barCode = json['BarCode']
    this.vatLiable = json['VatLiable']
    this.purchaseItem = json['PurchaseItem']
    this.salesItem = json['SalesItem']
    this.inventoryItem = json['InventoryItem']
    this.user_Text = json['User_Text']
    this.serialNum = json['SerialNum']
    this.manufacturer = json['Manufacturer']
    this.valid = json['Valid']
    this.validFrom = json['ValidFrom']
    this.validTo = json['ValidTo']
    this.validRemarks = json['ValidRemarks']
    this.frozen = json['Frozen']
    this.frozenFrom = json['FrozenFrom']
    this.frozenTo = json['FrozenTo']
    this.frozenRemarks = json['FrozenRemarks']
    // Code for Item class
    this.salesItemsPerUnit = json['SalesItemsPerUnit']
    // this.salesPackagingUnit = json['SalesPackagingUnit']
    // this.salesQtyPerPackUnit = json['SalesQtyPerPackUnit']
    this.salesUnitLength = json['SalesUnitLength']
    this.salesLengthUnit = json['SalesLengthUnit']
    this.salesUnitWidth = json['SalesUnitWidth']
    this.salesWidthUnit = json['SalesWidthUnit']
    this.salesUnitHeight = json['SalesUnitHeight']
    this.salesHeightUnit = json['SalesHeightUnit']
    this.salesUnitVolume = json['SalesUnitVolume']
    this.salesVolumeUnit = json['SalesVolumeUnit']
    this.salesUnitWeight = json['SalesUnitWeight']
    this.salesWeightUnit = json['SalesWeightUnit']
    this.purchaseUnit = json['PurchaseUnit']
    this.purchaseItemsPerUnit = json['PurchaseItemsPerUnit']
    // this.purchasePackagingUnit = json['PurchasePackagingUnit']
    this.purchaseQtyPerPackUnit = json['PurchaseQtyPerPackUnit']
    this.purchaseUnitLength = json['PurchaseUnitLength']
    this.purchaseLengthUnit = json['PurchaseLengthUnit']
    this.purchaseUnitWidth = json['PurchaseUnitWidth']
    this.purchaseWidthUnit = json['PurchaseWidthUnit']
    this.purchaseUnitHeight = json['PurchaseUnitHeight']
    this.purchaseHeightUnit = json['PurchaseHeightUnit']
    this.purchaseUnitVolume = json['PurchaseUnitVolume']
    this.purchaseVolumeUnit = json['PurchaseVolumeUnit']
    this.purchaseUnitWeight = json['PurchaseUnitWeight']
    this.purchaseWeightUnit = json['PurchaseWeightUnit']
    this.purchaseVATGroup = json['PurchaseVATGroup']
    this.salesFactor1 = json['SalesFactor1']
    this.salesFactor2 = json['SalesFactor2']
    this.salesFactor3 = json['SalesFactor3']
    this.salesFactor4 = json['SalesFactor4']
    this.purchaseFactor1 = json['PurchaseFactor1']
    this.purchaseFactor2 = json['PurchaseFactor2']
    this.purchaseFactor3 = json['PurchaseFactor3']
    this.purchaseFactor4 = json['PurchaseFactor4']
    this.movingAveragePrice = json['MovingAveragePrice']
    this.avgStdPrice = json['AvgStdPrice']
    this.defaultWarehouse = json['DefaultWarehouse']
    this.shipType = json['ShipType']
    this.glMethod = json['GLMethod']
    this.taxType = json['TaxType']
    this.maxInventory = json['MaxInventory']
    this.manageStockByWarehouse = json['ManageStockByWarehouse']
    this.purchaseHeightUnit1 = json['PurchaseHeightUnit1']
    this.purchaseUnitHeight1 = json['PurchaseUnitHeight1']
    this.purchaseLengthUnit1 = json['PurchaseLengthUnit1']
    this.purchaseUnitLength1 = json['PurchaseUnitLength1']
    this.purchaseWeightUnit1 = json['PurchaseWeightUnit1']
    this.purchaseUnitWeight1 = json['PurchaseUnitWeight1']
    this.purchaseWidthUnit1 = json['PurchaseWidthUnit1']
    this.purchaseUnitWidth1 = json['PurchaseUnitWidth1']
    this.salesHeightUnit1 = json['SalesHeightUnit1']
    this.salesUnitHeight1 = json['SalesUnitHeight1']
    this.salesLengthUnit1 = json['SalesLengthUnit1']
    this.salesUnitLength1 = json['SalesUnitLength1']
    this.salesWeightUnit1 = json['SalesWeightUnit1']
    this.salesUnitWeight1 = json['SalesUnitWeight1']
    this.salesWidthUnit1 = json['SalesWidthUnit1']
    this.salesUnitWidth1 = json['SalesUnitWidth1']
    this.forceSelectionOfSerialNumber = json['ForceSelectionOfSerialNumber']
    this.manageSerialNumbersOnReleaseOnly = json['ManageSerialNumbersOnReleaseOnly']
    this.wtLiable = json['WTLiable']
    this.costAccountingMethod = json['CostAccountingMethod']
    this.itemCountryOrg = json['ItemCountryOrg'];
    this.issueMethod = json['IssueMethod'];
    this.sriAndBatchManageMethod = json['SRIAndBatchManageMethod'];
    this.inventoryUOM = json['InventoryUOM'];
    this.itemType = json['ItemType'];
    this.itemClass = json['ItemClass'];
    this.outgoingServiceCode = json['OutgoingServiceCode'];
    this.incomingServiceCode = json['IncomingServiceCode'];
    this.serviceGroup = json['ServiceGroup'];
    this.ncmCode = json['NCMCode'];
    this.materialType = json['MaterialType'];
    this.materialGroup = json['MaterialGroup'];
    this.autoCreateSerialNumbersOnRelease = json['AutoCreateSerialNumbersOnRelease'];
    this.series = json['Series'];
    this.issuePrimarilyBy = json['IssuePrimarilyBy'];
    this.noDiscounts = json['NoDiscounts'];
    this.assetClass = json['AssetClass'];
    this.assetGroup = json['AssetGroup'];
    this.inventoryNumber = json['InventoryNumber'];
    this.technician = json['Technician'];
    this.employee = json['Employee'];
    this.location = json['Location'];
    this.assetStatus = json['AssetStatus'];
    this.manageByQuantity = json['ManageByQuantity'];
    this.uomGroupEntry = json['UoMGroupEntry'];
    this.inventoryUoMEntry = json['InventoryUoMEntry'];
    this.defaultSalesUoMEntry = json['DefaultSalesUoMEntry'];
    this.defaultPurchasingUoMEntry = json['DefaultPurchasingUoMEntry'];
    this.inventoryWeight = json['InventoryWeight'];
    this.inventoryWeightUnit = json['InventoryWeightUnit'];
    this.inventoryWeight1 = json['InventoryWeight1'];
    this.inventoryWeightUnit1 = json['InventoryWeightUnit1'];
    this.defaultCountingUnit = json['DefaultCountingUnit'];
    this.countingItemsPerUnit = json['CountingItemsPerUnit'];
    this.defaultCountingUoMEntry = json['DefaultCountingUoMEntry'];
    this.manageSerialNumbers = json['ManageSerialNumbers'];
    this.manageBatchNumbers = json['ManageBatchNumbers'];
    this.attachmentEntry = json['AttachmentEntry'];
    this.createQRCodeFrom = json['CreateQRCodeFrom'];
    this.itemPrices = json['ItemPrices'];
    this.itemWarehouseInfoCollection = json['ItemWarehouseInfoCollection']
    this.itemBarCodeCollection = json['ItemBarCodeCollection']

    // this.isEditable = !json['Status']?.replace('as', "")?.charAt(0)?.includes('A');
    // this.items = json["DocumentLines"]?.map(
    //   (e: any) => new ItemMasterDocumentLine(e)
    // );

    // this.documentStatus = json["DocumentStatus"]
    //   .replace("bost_", "")
    //   ?.charAt(0);
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
      ReqType: json["reqType"],
      DocType: json["docType"],
      TaxDate: json["taxDate"],
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
      DocumentLines: json["items"]?.map((e: any) =>
        ItemMasterDocumentLine.toCreate(e, json["docType"])
      ),

      // documentLine: json["items"]?.map((e: any) =>
      // ItemMasterDocumentLine.toCreate(e, json["DocType"])),
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
export class ItemMasterDocumentLine extends Model implements DocumentLine {
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
  taxCode?: string | undefined;
  taxRate?: number | undefined;
  vatGroup?: string | undefined;
  lineTotal?: string | undefined;
  requiredDate?: string | undefined;
  shipDate?: string | undefined;
  accountCode?: number | undefined;
  accountNo?: number | undefined;
  accountName?: string | undefined;
  blanketAgreementNumber?: string | undefined;
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
    this.vatGroup = json["VatGroup"];
    this.purchaseVatGroup = json["VatGroup"];
    this.requiredDate = json["RequiredDate"];
    this.discountPercent = json["DiscountPercent"];
    this.shipDate = json["ShipDate"];
    this.accountCode = json["AccountCode"];
    this.accountNo = json["AccountNo"];
    this.accountName = json["AccountName"];
    this.lineTotal = json["LineTotal"];
    this.lineVendor = json["LineVendor"];
    this.itemName = json["ItemDescription"];
    this.taxRate = json["Rate"]
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
      // ItemGroup: json["itemGroup"],
      UnitPrice: json["unitPrice"],
      // LineDiscount: 0.0,
      DocEntry: json["uomGroupEntry"],
      UoMCode: json["uomCode"],
      // TransportationCode: 1,
      // Project: null,
      // TaxCode: null,
      // TAXRate: null,
      UoMEntry: json["uomEntry"],
      // VatGroup: json["vatGroup"],
      VatGroup: json["purchaseVatGroup"],
      LineVendor: json["lineVendor"],
      LineTotal: json["lineTotal"],
      RequiredDate: json["requiredDate"],
      AccountCode: json["AccountNo"],
      // AccountName: json["AccountName"],
      DiscountPercent: json["discountPercent"],
    };

    if (type === "S") {
      delete line.ItemCode;
      delete line.UnitPrice;
    }

    return line;
  }

}