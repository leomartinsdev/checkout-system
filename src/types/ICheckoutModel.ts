import { IProduct } from './IProduct';

export default interface ICheckoutModel {
  getBySku(sku: string): Promise<IProduct | null>;
  getByName(name: string): Promise<IProduct | null>;
  findAll(): Promise<IProduct[]>;
}
