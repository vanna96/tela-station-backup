import { getItemFromLocal } from "../../utilies";
import request from '@/utilies/request';
import ShippingType from "@/models/ShippingType";
import Owner from "@/models/Owner";



export default class InitializeData {

    constructor() {
    }

    public static async shippingType() : Promise<ShippingType[]> {

        const response: any = await request('GET', '/ShippingTypes?$select=Code,Name&$orderby=Name asc');
        if (!response?.data) return [];

        return response.data.value?.map((e:any) => new ShippingType(e));
    }

    public static async unitOfMeasurement() : Promise<any> {
        const response: any = await request('GET', '/UnitOfMeasurementGroups?$select=AbsEntry,Code,Name,BaseUoM');

        if (!response?.data) return [];

        return response.data.value;
    }

    public static async paymentTermType() : Promise<any> {
        const response: any = await request('GET', '/PaymentTermsTypes');

        if (!response?.data) return [];

        return response.data.value;
    }

    public static async vatGroups() : Promise<any> {
        const response: any = await request('GET', '/VatGroups');

        if (!response?.data) return [];

        return response.data.value;
    }

    public static async branches() : Promise<any> {
        const response: any = await request('GET', '/Branches');

        if (!response?.data) return [];

        return response.data.value;
    }

    public static async department() : Promise<any> {
        const response: any = await request('GET', '/Departments');

        if (!response?.data) return [];

        return response.data.value;
    }

    public static async owner() : Promise<Owner[]> {
        const response: any = await request('GET', '/EmployeesInfo?$filter=ApplicationUserID ne null&$select=EmployeeID,FirstName,LastName');

        if (!response?.data) return [];

        return response.data.value?.map((e: any) => new Owner(e));
    }

    public static async factoringIndicator() : Promise<any> {
        const response: any = await request('GET', '/FactoringIndicators');

        if (!response?.data) return [];

        return response.data.value;
    }
}