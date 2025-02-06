import SequelizeProducts from '../database/models/product.model';
import IProduct from '../types/IProduct';
import ICheckoutModel from '../types/ICheckoutModel';

export default class CheckoutModel implements ICheckoutModel {
  private model = SequelizeProducts;

  public async findAll(): Promise<IProduct[]> {
    const products = this.model.findAll();
    return products;
  }
}
