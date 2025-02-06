import { Request, Response } from 'express';
import CheckoutService from '../services/CheckoutService';

export default class CheckoutController {
  constructor(
    private checkoutService: CheckoutService = new CheckoutService()
  ) {}

  public async productsCheckout(req: Request, res: Response): Promise<void> {
    try {
      const serviceResponse = await this.checkoutService.findAll();
      res.status(serviceResponse.status).json(serviceResponse.data);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
