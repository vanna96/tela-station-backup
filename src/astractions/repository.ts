

export default abstract class Repository<T> {
    abstract url: string;

    abstract get<T>(query? : string): Promise<T[]>;
    abstract find<T>(query? : string): Promise<T>;
    abstract post(payload: any): Promise<T>;
    abstract patch(id :any, payload : any): Promise<T>;
    abstract delete(id : any): Promise<T>;
}