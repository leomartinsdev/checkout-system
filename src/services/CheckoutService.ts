import CheckoutModel from '../models/CheckoutModel';
import ICheckoutModel from '../types/ICheckoutModel';

export default class CheckoutService {
  constructor(private checkoutModel: ICheckoutModel = new CheckoutModel()) {}

  public async findAll() {
    const products = await this.checkoutModel.findAll();
    return { status: 200, data: { products } };
  }
}
