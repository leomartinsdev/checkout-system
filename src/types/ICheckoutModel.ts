import { IProduct } from './IProduct';

export default interface ICheckoutModel {
  findAll(): Promise<IProduct[]>;
}
