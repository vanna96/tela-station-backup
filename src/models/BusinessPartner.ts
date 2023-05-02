import { dateFormat } from "../utilies";
import { ContactEmployee } from "./BusinessParter";
import Model from "./Model";
import {
  MasterDocument,
  DocumentLine,
  ContactEmployees,
  BPAddresses,
} from "./interface/index";
import moment from "moment";
let index = 1;
export interface BusinessPatnersProps {
  id: any;
  employeeID?: number;
  linkedBusinessPartner?: string;
  payTermsGrpCode?: string;
  currency?: number;
  cardCode?: number;
  cardName?: string;
  cardType?: string;
  groupCode?: number;
  contactPerson?: string;
  cardForeignName?: string;
  federalTaxID?: number;
  // series?: string;
  openOrdersBalance?: number;
  openDeliveryNotesBalance?: number;
  currentAccountBalance?: number;
  phone1?: number;
  phone2?: number;
  cellular?: number;
  fax?: number;
  website?: string;
  shippingType?: number;
  password?: number;
  indicator?: number;
  projectCode?: string;
  industry?: string;
  companyPrivate?: string;
  additionalID?: number;
  unifiedFederalTaxID?: number;
  notes?: string;
  salesPersonCode?: string;
  territory?: string;
  globalLocationNumber?: number;
  aliasName?: string;
  valid?: string;
  validFrom?: string;
  validTo?: string;
  validRemarks?: string;
  name?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  title?: string;
  position?: string;
  address?: string;
  mobilePhone?: number;
  e_Mail?: string;
  emailGroupCode?: string;
  pager?: string;
  remarks1?: string;
  remarks2?: string;
  placeOfBirth?: string;
  gender?: string;
  profession?: string;
  cityOfBirth?: string;
  // addressName?: string;
  // addressName2?: string;
  // addressName3?: string;
  street?: string;
  block?: string;
  zipCode?: number;
  city?: string;
  county?: string;
  country?: string;
  state?: string;
  buildingFloorRoom?: string;
  streetNo?: number;
  u_RouteCode?: number;
  intrestRatePercent?: number;
  priceListNum?: number;
  discountPercent?: number;
  creditLimit?: number;
  maxCommitment?: number;
  effectivePrice?: string;
  effectiveDiscount?: string;
  bankCountry?: string;
  bankCode?: string;
  houseBank?: string;
  accountNo?: number;
  bICSwiftCode?: string;
  defaultBranch?: number;
  iBAN?: string;
  mandateID?: number;
  signatureDate?: string;
  avarageLate?: string;
  priority?: string;
  houseBankCountry?: string;
  houseBankAccount?: number;
  houseBankBranch?: number;
  houseBankIBAN?: string;
  controlKey?: number;
  dME?: string;
  referenceDetails?: string;
  bankChargesAllocationCode?: string;
  fatherCard?: string;
  debitorAccount?: number;
  downPaymentInterimAccount?: number;
  downPaymentClearAct?: number;
  planningGroup?: string;
  paymentBlockDescription?: string;
  emailAddress?: string;
  instructionKey?: string;
  freeText?: string;
  defaultBankCode?: string;
  // contactEmployees: BusinessPartnersContactEmployeesProps[];
  // bPAddresses: BusinessPartnersBPAddresses[];
}
export interface BusinessPartnersBPAddresses {
  addressName?: string | undefined;
  addressName2?: string | undefined;
  addressName3?: string | undefined;
}

export default class BusinessPatners extends Model {
  index?: number;
  id: any;
  employeeID?: number;
  payTermsGrpCode?: string;
  freeText?: string;
  linkedBusinessPartner?: string;
  cardCode?: number;
  cardName?: string;
  cardType?: string;
  groupCode?: number;
  contactPerson?: string;
  cardForeignName?: string;
  federalTaxID?: number;
  // series?: string;
  currency?: number;
  openOrdersBalance?: number;
  openDeliveryNotesBalance?: number;
  currentAccountBalance?: number;
  phone1?: number;
  phone2?: number;
  cellular?: number;
  fax?: number;
  website?: string;
  shippingType?: number;
  password?: number;
  indicator?: number;
  projectCode?: string;
  industry?: string;
  companyPrivate?: string;
  additionalID?: number;
  unifiedFederalTaxID?: number;
  notes?: string;
  salesPersonCode?: string;
  territory?: string;
  globalLocationNumber?: number;
  aliasName?: string;
  valid?: string;
  validFrom?: string;
  validTo?: string;
  validRemarks?: string;
  name?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  title?: string;
  position?: string;
  address?: string;
  mobilePhone?: number;
  e_Mail?: string;
  emailGroupCode?: string;
  pager?: string;
  remarks1?: string;
  remarks2?: string;
  placeOfBirth?: string;
  gender?: string;
  profession?: string;
  cityOfBirth?: string;
  // addressName?: string;
  // addressName2?: string;
  // addressName3?: string;
  street?: string;
  block?: string;
  zipCode?: number;
  city?: string;
  county?: string;
  country?: string;
  state?: string;
  buildingFloorRoom?: string;
  streetNo?: number;
  u_RouteCode?: number;
  intrestRatePercent?: number;
  priceListNum?: number;
  discountPercent?: number;
  creditLimit?: number;
  maxCommitment?: number;
  effectivePrice?: string;
  effectiveDiscount?: string;
  bankCountry?: string;
  bankCode?: string;
  houseBank?: string;
  accountNo?: number;
  bICSwiftCode?: string;
  defaultBranch?: number;
  iBAN?: string;
  mandateID?: number;
  signatureDate?: string;
  avarageLate?: string;
  priority?: string;
  houseBankCountry?: string;
  houseBankAccount?: number;
  houseBankBranch?: number;
  houseBankIBAN?: string;
  controlKey?: number;
  dME?: string;
  referenceDetails?: string;
  bankChargesAllocationCode?: string;
  fatherCard?: string;
  debitorAccount?: number;
  downPaymentInterimAccount?: number;
  downPaymentClearAct?: number;
  planningGroup?: string;
  paymentBlockDescription?: string;
  instructionKey?: string;
  emailAddress?: string;
  defaultBankCode?: string;
  // bPAddresses: BusinessPartnersBPAddresses[];

  constructor(json: any) {
    super();
    this.index = index++;
    this.id = json["CardCode"];
    this.cardName = json["CardName"];
    this.payTermsGrpCode = json["PayTermsGrpCode"];
    this.freeText = json["FreeText"];
    this.cardCode = json["CardCode"];
    this.cardType = json["CardType"];
    this.instructionKey = json["InstructionKey"];
    this.groupCode = json["GroupCode"];
    this.contactPerson = json["ContactPerson"];
    this.cardForeignName = json["CardForeignName"];
    this.federalTaxID = json["FederalTaxID"];
    // this.series = json['Series'];
    this.paymentBlockDescription = json["PaymentBlockDescription"];
    this.currency = json["Currency"];
    this.emailAddress = json["EmailAddress"];
    this.linkedBusinessPartner = json["LinkedBusinessPartner"];
    this.openOrdersBalance = json["OpenOrdersBalance"];
    this.openDeliveryNotesBalance = json["OpenDeliveryNotesBalance"];
    this.currentAccountBalance = json["CurrentAccountBalance"];
    this.phone1 = json["Phone1"];
    this.phone2 = json["Phone2"];
    this.cellular = json["Cellular"];
    this.fax = json["Fax"];
    this.website = json["Website"];
    this.shippingType = json["ShippingType"];
    this.password = json["Password"];
    this.indicator = json["Indicator"];
    this.projectCode = json["ProjectCode"];
    this.industry = json["Industry"];
    this.companyPrivate = json["CompanyPrivate"];
    this.additionalID = json["AdditionalID"];
    this.unifiedFederalTaxID = json["UnifiedFederalTaxID"];
    this.notes = json["Notes"];
    this.salesPersonCode = json["SalesPersonCode"];
    this.territory = json["Territory"];
    this.globalLocationNumber = json["GlobalLocationNumber"];
    this.aliasName = json["AliasName"];
    this.valid = json["Valid"];
    this.validFrom = json["ValidFrom"];
    this.validTo = json["ValidTo"];
    this.validRemarks = json["ValidRemarks"];
    this.name = json["Name"];
    this.firstName = json["FirstName"];
    this.middleName = json["MiddleName"];
    this.lastName = json["LastName"];
    this.title = json["Title"];
    this.position = json["Position"];
    this.address = json["Address"];
    this.mobilePhone = json["MobilePhone"];
    this.e_Mail = json["E_Mail"];
    this.emailGroupCode = json["EmailGroupCode"];
    this.pager = json["Pager"];
    this.remarks1 = json["Remarks1"];
    this.remarks2 = json["Remarks2"];
    this.placeOfBirth = json["PlaceOfBirth"];
    this.gender = json["Gender"];
    this.profession = json["Profession"];
    this.cityOfBirth = json["CityOfBirth"];
    // this.addressName = json['AddressName'];
    // this.addressName2 = json['AddressName2'];
    // this.addressName3 = json['AddressName3'];
    this.street = json["Street"];
    this.block = json["Block"];
    this.zipCode = json["ZipCode"];
    this.city = json["City"];
    this.county = json["County"];
    this.country = json["Country"];
    this.state = json["State"];
    this.buildingFloorRoom = json["BuildingFloorRoom"];
    this.streetNo = json["StreetNo"];
    this.u_RouteCode = json["U_RouteCode"];
    this.intrestRatePercent = json["IntrestRatePercent"];
    this.priceListNum = json["PriceListNum"];
    this.discountPercent = json["DiscountPercent"];
    this.creditLimit = json["CreditLimit"];
    this.maxCommitment = json["MaxCommitment"];
    this.effectivePrice = json["EffectivePrice"];
    this.effectiveDiscount = json["EffectiveDiscount"];
    this.bankCountry = json["BankCountry"];
    this.bankCode = json["BankCode"];
    this.houseBank = json["HouseBank"];
    this.accountNo = json["AccountNo"];
    this.bICSwiftCode = json["BICSwiftCode"];
    this.defaultBranch = json["DefaultBranch"];
    this.iBAN = json["IBAN"];
    this.mandateID = json["MandateID"];
    this.signatureDate = json["SignatureDate"];
    this.avarageLate = json["AvarageLate"];
    this.priority = json["Priority"];
    this.houseBankCountry = json["HouseBankCountry"];
    this.houseBankAccount = json["HouseBankAccount"];
    this.houseBankBranch = json["HouseBankBranch"];
    this.houseBankIBAN = json["HouseBankIBAN"];
    this.controlKey = json["ControlKey"];
    this.dME = json["DME"];
    this.referenceDetails = json["ReferenceDetails"];
    this.referenceDetails = json["ReferenceDetails"];
    this.bankChargesAllocationCode = json["BankChargesAllocationCode"];
    this.fatherCard = json["FatherCard"];
    this.debitorAccount = json["DebitorAccount"];
    this.downPaymentInterimAccount = json["DownPaymentInterimAccount"];
    this.downPaymentClearAct = json["DownPaymentClearAct"];
    this.planningGroup = json["PlanningGroup"];
    this.defaultBankCode = json["DefaultBankCode"];
    // this.bPAddresses = json['BPAddresses']?.map((e: any) => new BusinessPartnersBPAddresses(e));
  }
  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }

  public static toCreate(json: any) {
    console.log(json);

    return {
      EmployeeID: json["employeeID"],
      PayTermsGrpCode: json["payTermsGrpCode"],
      CardName: json["cardName"],
      CardCode: json["cardCode"],
      CardType: json["cardType"],
      GroupCode: json["groupCode"],
      ContactPerson: json["contactPerson"],
      CardForeignName: json["cardForeignName"],
      FederalTaxID: json["federalTaxID"],
      // "Series": json['series'],
      PaymentBlockDescription: json["paymentBlockDescription"],
      Currency: json["currency"],
      EmailAddress: json["emailAddress"],
      InstructionKey: json["instructionKey"],
      LinkedBusinessPartner: json["linkedBusinessPartner"],
      Freetext: json["freetext"],
      OpenOrdersBalance: json["openOrdersBalance"],
      OpenDeliveryNotesBalance: json["openDeliveryNotesBalance"],
      CurrentAccountBalance: json["currentAccountBalance"],
      Phone1: json["phone1"],
      Phone2: json["phone2"],
      Cellular: json["cellular"],
      Fax: json["fax"],
      Website: json["website"],
      ShippingType: json["shippingType"],
      Password: json["password"],
      Indicator: json["indicator"],
      ProjectCode: json["projectCode"],
      Industry: json["industry"],
      CompanyPrivate: json["companyPrivate"],
      AdditionalID: json["additionalID"],
      UnifiedFederalTaxID: json["unifiedFederalTaxID"],
      Notes: json["notes"],
      SalesPersonCode: json["salesPersonCode"],
      Territory: json["territory"],
      GlobalLocationNumber: json["globalLocationNumber"],
      AliasName: json["aliasName"],
      Valid: json["valid"],
      ValidFrom: json["validFrom"],
      ValidTo: json["validTo"],
      ValidRemarks: json["validRemarks"],
      Name: json["name"],
      firstName: json["firstName"],
      LastName: json["lastName"],
      MiddleName: json["middleName"],
      // "title": json['title'],
      Position: json["position"],
      Address: json["address"],
      MobilePhone: json["mobilePhone"],
      e_Mail: json["e_Mail"],
      EmailGroupCode: json["emailGroupCode"],
      Pager: json["pager"],
      Remarks1: json["remarks1"],
      Remarks2: json["remarks2"],
      PlaceOfBirth: json["placeOfBirth"],
      Gender: json["gender"],
      Profession: json["profession"],
      CityOfBirth: json["cityOfBirth"],
      AddressName: json["addressName"],
      AddressName2: json["addressName2"],
      AddressName3: json["addressName3"],
      Street: json["street"],
      Block: json["block"],
      ZipCode: json["zipCode"],
      City: json["city"],
      County: json["county"],
      Country: json["country"],
      State: json["state"],
      BuildingFloorRoom: json["buildingFloorRoom"],
      StreetNo: json["streetNo"],
      u_RouteCode: json["u_RouteCode"],
      IntrestRatePercent: json["intrestRatePercent"],
      PriceListNum: json["priceListNum"],
      DiscountPercent: json["discountPercent"],
      CreditLimit: json["creditLimit"],
      MaxCommitment: json["maxCommitment"],
      EffectivePrice: json["effectivePrice"],
      EffectiveDiscount: json["effectiveDiscount"],
      BankCountry: json["bankCountry"],
      BankCode: json["bankCode"],
      HouseBank: json["houseBank"],
      AccountNo: json["accountNo"],
      BICSwiftCode: json["bICSwiftCode"],
      DefaultBranch: json["defaultBranch"],
      IBAN: json["iBAN"],
      MandateID: json["mandateID"],
      SignatureDate: json["signatureDate"],
      AvarageLate: json["avarageLate"],
      Priority: json["priority"],
      HouseBankCountry: json["houseBankCountry"],
      HouseBankAccount: json["houseBankAccount"],
      HouseBankBranch: json["houseBankBranch"],
      HouseBankIBAN: json["houseBankIBAN"],
      ControlKey: json["controlKey"],
      DME: json["dME"],
      ReferenceDetails: json["referenceDetails"],
      BankChargesAllocationCode: json["bankChargesAllocationCode"],
      FatherCard: json["fatherCard"],
      DebitorAccount: json["debitorAccount"],
      DownPaymentInterimAccount: json["downPaymentInterimAccount"],
      DownPaymentClearAct: json["downPaymentClearAct"],
      PlanningGroup: json["planningGroup"],
      DefaultBankCode: json["defaultBankCode"],
      // "BPAddresses": json['bPAddresses'].map((e: any) => BusinessPartnersBPAddresses),
    };
  }
  public static toUpdate(json: any) {
    return {
      EmployeeID: json["employeeID"],
      DefaultBankCode: json["defaultBankCode"],
      PayTermsGrpCode: json["payTermsGrpCode"],
      CardCode: json["cardCode"],
      CardName: json["cardName"],
      CardType: json["cardType"],
      GroupCode: json["groupCode"],
      ContactPerson: json["contactPerson"],
      CardForeignName: json["cardForeignName"],
      FederalTaxID: json["federalTaxID"],
      // "Series": json['series'],
      PaymentBlockDescription: json["paymentBlockDescription"],
      Currency: json["currency"],
      OpenOrdersBalance: json["openOrdersBalance"],
      OpenDeliveryNotesBalance: json["openDeliveryNotesBalance"],
      CurrentAccountBalance: json["currentAccountBalance"],
      Phone1: json["phone1"],
      Phone2: json["phone2"],
      Cellular: json["cellular"],
      Fax: json["fax"],
      Freetext: json["freetext"],
      Website: json["website"],
      ShippingType: json["shippingType"],
      Password: json["password"],
      Indicator: json["indicator"],
      ProjectCode: json["projectCode"],
      Industry: json["industry"],
      CompanyPrivate: json["companyPrivate"],
      InstructionKey: json["instructionKey"],
      AdditionalID: json["additionalID"],
      UnifiedFederalTaxID: json["unifiedFederalTaxID"],
      Notes: json["notes"],
      SalesPersonCode: json["salesPersonCode"],
      Territory: json["territory"],
      GlobalLocationNumber: json["globalLocationNumber"],
      AliasName: json["aliasName"],
      Valid: json["valid"],
      ValidFrom: json["validFrom"],
      ValidTo: json["validTo"],
      ValidRemarks: json["validRemarks"],
      Name: json["name"],
      firstName: json["firstName"],
      LastName: json["lastName"],
      MiddleName: json["middleName"],
      // "Title": json['title'],
      Position: json["position"],
      Address: json["address"],
      MobilePhone: json["mobilePhone"],
      e_Mail: json["e_Mail"],
      EmailGroupCode: json["emailGroupCode"],
      Pager: json["pager"],
      Remarks1: json["remarks1"],
      Remarks2: json["remarks2"],
      PlaceOfBirth: json["placeOfBirth"],
      Gender: json["gender"],
      Profession: json["profession"],
      CityOfBirth: json["cityOfBirth"],
      AddressName: json["addressName"],
      AddressName2: json["addressName2"],
      AddressName3: json["addressName3"],
      Street: json["street"],
      Block: json["block"],
      ZipCode: json["zipCode"],
      City: json["city"],
      County: json["county"],
      Country: json["country"],
      State: json["state"],
      BuildingFloorRoom: json["buildingFloorRoom"],
      StreetNo: json["streetNo"],
      u_RouteCode: json["u_RouteCode"],
      IntrestRatePercent: json["intrestRatePercent"],
      PriceListNum: json["priceListNum"],
      DiscountPercent: json["discountPercent"],
      CreditLimit: json["creditLimit"],
      MaxCommitment: json["maxCommitment"],
      EffectivePrice: json["effectivePrice"],
      EffectiveDiscount: json["effectiveDiscount"],
      BankCountry: json["bankCountry"],
      BankCode: json["bankCode"],
      HouseBank: json["houseBank"],
      AccountNo: json["accountNo"],
      BICSwiftCode: json["bICSwiftCode"],
      DefaultBranch: json["defaultBranch"],
      LinkedBusinessPartner: json["linkedBusinessPartner"],
      IBAN: json["iBAN"],
      MandateID: json["mandateID"],
      SignatureDate: json["signatureDate"],
      AvarageLate: json["avarageLate"],
      Priority: json["priority"],
      HouseBankCountry: json["houseBankCountry"],
      HouseBankAccount: json["houseBankAccount"],
      HouseBankBranch: json["houseBankBranch"],
      HouseBankIBAN: json["houseBankIBAN"],
      ControlKey: json["controlKey"],
      DME: json["dME"],
      ReferenceDetails: json["referenceDetails"],
      BankChargesAllocationCode: json["bankChargesAllocationCode"],
      FatherCard: json["fatherCard"],
      DebitorAccount: json["debitorAccount"],
      DownPaymentInterimAccount: json["downPaymentInterimAccount"],
      DownPaymentClearAct: json["downPaymentClearAct"],
      PlanningGroup: json["planningGroup"],
      EmailAddress: json["emailAddress"],
      // "BPAddresses": json['bPAddresses'].map((e: any) => BusinessPartnersBPAddresses),
    };
  }
  public static getCompany(companyPrivate: string | null): string {
    switch (companyPrivate) {
      case "cCompany":
        return "Company";
      case "CPrivate":
        return "Private";
      case "cGovernment":
        return "Government";
      default:
        return "";
    }
  }
  public static getEffectivePrice(effectivePrice: string | null): string {
    switch (effectivePrice) {
      case "epDefaultPriority":
        return "Default Priority";
      case "epHighestPrice":
        return "Highest Price";
      case "epLowestPrice":
        return "Lowest Price";
      default:
        return "";
    }
  }
  public static getEffectiveDiscount(effectiveDiscount: string | null): string {
    switch (effectiveDiscount) {
      case "dgrAverageDiscount":
        return "Average";
      case "dgrHighestDiscount":
        return "Highest Discount";
      case "dgrLowestDiscount":
        return "Lowest Discount";
      case "dgrMultipliedDiscount":
        return "Discount Multiples";
      case "dgrDiscountTotals":
        return "Total";
      default:
        return "";
    }
  }
}
export class BusinessPartnersBPAddresses extends Model implements BPAddresses {
  addressName?: string | undefined;
  addressNam2?: string | undefined;
  addressNam3?: string | undefined;

  constructor(json: any) {
    super();
    this.addressName = json["AddressName"];
    this.addressName2 = json["AddressName2"];
    this.addressName3 = json["AddressName3"];
  }
  toJson(update: boolean) {
    throw new Error("Method not implemented.");
  }
  public static toCreate(json: any, type: any) {
    let line = {
      AddressName: json["addressName"],
      AddressName2: json["addressName2"],
      AddressName3: json["addressName3"],
    };
    return line;
  }
}