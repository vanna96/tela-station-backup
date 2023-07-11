import { dateFormat } from '../utilies';
import Model from './Model';
import { MasterDocument, DocumentLine } from './interface/index';
import moment from 'moment';
import { IContactPersonList } from '../astractions/index';
import { ContactEmployee } from './BusinessParter';
import ShippingTypeRepository from '../services/actions/shippingTypeRepository';
import PaymentTermTypeRepository from '../services/actions/paymentTermTypeRepository';
import OwnerRepository from '../services/actions/ownerRepository';
import { getValueDocumentStatus } from '@/constants';

export interface BinlocationProps {
  id: any;
  absEntry?: any;
  warehouse?: number;
  binCode?: boolean;
  inactive?: string;
  sublevel1?: string;
  sublevel2?: string;
  sublevel3?: string;
  description?: string;
  alternativeSortCode?: string;
  barCode?: string;
  minimumQty?: number;
  maximumQty?: number;
  MaximumWeight?: number;
  restrictedItemType?: string;
  RestrictedUoMType?: string;
  ratchRestrictions?: string;
  restrictedTransType?: string;
  specificItemGroup?: string;
  batchRestrictions?: string;
  specificItem?: string;
  specificUoMGroup?: string;
  restrictionReason?: string
}

export default class Binlocation extends Model {
  id: any;
  absEntry?: any;
  warehouse?: number;
  binCode?: boolean;
  inactive?: string;
  sublevel1?: string;
  sublevel2?: string;
  sublevel3?: string;
  description?: string;
  alternativeSortCode?: string;
  barCode?: string;
  minimumQty?: number;
  maximumQty?: number;
  MaximumWeight?: number;
  restrictedItemType?: string;
  restrictedUoMType?: string;
  ratchRestrictions?: string;
  restrictedTransType?: string;
  specificItemGroup?: string;
  batchRestrictions?: string;
  specificItem?: string;
  specificUoMGroup?: string;
  restrictionReason?: string
  constructor(json: any) {
    super();
    this.id = json['AbsEntry'];
    this.specificItem = json['SpecificItem'];
    this.batchRestrictions = json['BatchRestrictions']
    this.absEntry = json['AbsEntry'];
    this.warehouse = json['Warehouse'];
    this.binCode = json['BinCode'];
    this.restrictionReason = json['RestrictionReason']
    this.inactive = json['Inactive'];
    this.sublevel1 = json['Sublevel1'];
    this.sublevel2 = json['Sublevel2'];
    this.sublevel3 = json['Sublevel3'];
    this.description = json['Description'];
    this.alternativeSortCode = json['AlternativeSortCode'];
    this.barCode = json['BarCode'];
    this.minimumQty = json['MinimumQty'];
    this.maximumQty = json['MaximumQty'];
    this.MaximumWeight = json['MaximumWeight'];
    this.restrictedItemType = json['RestrictedItemType'];
    this.restrictedUoMType = json['RestrictedUoMType'];
    this.ratchRestrictions = json['RatchRestrictions'];
    this.restrictedTransType = json['RestrictedTransType'];
    this.specificItemGroup = json['SpecificItemGroup'];
    this.specificUoMGroup = json['SpecificUoMGroup']
  }

  toJson(update: boolean) {
    throw new Error('Method not implemented.');
  }


  public static toCreate(json: any) {
    return {
      "AbsEntry": json['absEntry'],
      "SpecificItem": json['specificItem'],
      "Warehouse": json['warehouse'],
      "RestrictionReason": json['restrictionReason'],
      "SpecificUoMGroup": json['specificUoMGroup'],
      "BatchRestrictions": json['batchRestrictions'],
      "BinCode": json['binCode'],
      "Inactive": json['inactive'],
      "Sublevel1": json['sublevel1'],
      "Sublevel2": json['sublevel2'],
      "Sublevel3": json['sublevel3'],
      "Description": json['description'],
      "AlternativeSortCode": json['alternativeSortCode'],
      "BarCode": json['barCode'],
      "MinimumQty": json['minimumQty'],
      "MaximumQty": json['maximumQty'],
      "MaximumWeight": json['maximumWeight'],
      "RestrictedItemType": json['restrictedItemType'],
      "RestrictedUoMType": json['restrictedUoMType'],
      "RatchRestrictions": json['ratchRestrictions'],
      "RestrictedTransType": json['restrictedTransType'],
      "SpecificItemGroup": json['specificItemGroup'],
    };
  }


  public static toUpdate(json: any) {
    return {
      "AbsEntry": json['absEntry'],
      "SpecificUoMGroup": json['specificUoMGroup'],
      "SpecificItem": json['specificItem'],
      "Warehouse": json['warehouse'],
      "RestrictionReason": json['restrictionReason'],
      "BatchRestrictions": json['batchRestrictions'],
      "BinCode": json['binCode'],
      "Inactive": json['inactive'],
      "Sublevel1": json['sublevel1'],
      "Sublevel2": json['sublevel2'],
      "Sublevel3": json['sublevel3'],
      "Description": json['description'],
      "AlternativeSortCode": json['alternativeSortCode'],
      "BarCode": json['barCode'],
      "MinimumQty": json['minimumQty'],
      "MaximumQty": json['maximumQty'],
      "MaximumWeight": json['maximumWeight'],
      "RestrictedItemType": json['restrictedItemType'],
      "RestrictedUoMType": json['restrictedUoMType'],
      "RatchRestrictions": json['ratchRestrictions'],
      "RestrictedTransType": json['restrictedTransType'],
      "SpecificItemGroup": json['specificItemGroup'],
    };
  }

  public static getRestrictedItemType(RestrictedItemType: string | null): string {
    switch (RestrictedItemType) {
      case 'briNone':
        return 'None'
      case 'briSpecificItem':
        return 'Specific Item'
      case 'briSingleItemOnly':
        return 'Single Item Only'
      case 'briSpecificItemGroup':
        return 'Specific Item Group'
      case 'briSingleItemGrouponly':
        return 'Single Item Group Only'
      default:
        return '';
    }
  }

  public static getRestrictedUoMType(restrictedUoMType: string | null): string {
    switch (restrictedUoMType) {
      case 'briNone':
        return 'None'
      case 'bruSpecificUoM':
        return 'Specific UoM'
      case 'bruSingleUoMOnly':
        return 'Single UoM Only'
      case 'briSpecificItemGroup':
        return 'Specific Item Group'
      case 'briSingleItemGrouponly':
        return 'Single Item Group Only'
      case 'bruSingleUoMGrouponly':
        return 'Single UoM Group Only'
      case 'bruSpecificUoMGroup':
        return 'Specific UoM Group'
      default:
        return '';
    }
  }
  public static getBatchRestriction(batchRestriction: string | null): string {
    switch (batchRestriction) {
      case 'brbNoRestrictions':
        return 'None'
      case 'brbSingleBatch':
        return 'Single Batch'

      default:
        return '';
    }
  }

  public static getRestrictedTransType(restrictedTransType: string | null): string {
    switch (restrictedTransType) {
      case 'brtNoRestrictions':
        return 'None'
      case 'bruSpecificUoM':
        return 'Specific UoM'
      case 'brtAllTrans':
        return 'All transaction'
      case 'brtAllExceptInventoryTrans':
        return 'All Except Inventory Transfer and Counting Transactions'
      default:
        return '';
    }
  }
}



