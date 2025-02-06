import { Op } from 'sequelize';
import SequelizeProducts from '../database/models/product.model';
import IProduct from '../types/IProduct';
import ICheckoutModel from '../types/ICheckoutModel';

export default class CheckoutModel implements ICheckoutModel {
  private model = SequelizeProducts;

  public async getBySku(sku: string): Promise<IProduct | null> {
    const product = this.model.findOne({
      where: {
        sku: {
          [Op.like]: sku,
        },
      },
    });
    return product;
  }

  public async getByName(name: string): Promise<IProduct | null> {
    const product = this.model.findOne({
      where: {
        name: {
          [Op.like]: name, // case insensitive
        },
      },
    });
    return product;
  }

  public async findAll(): Promise<IProduct[]> {
    const products = this.model.findAll();
    return products;
  }
}
