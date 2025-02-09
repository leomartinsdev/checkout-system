import { Request, Router, Response } from 'express';
import CheckoutController from '../controllers/CheckoutController';
import FieldsValidations from '../middlewares/fields.middleware';

const checkoutController = new CheckoutController();

const router = Router();

router.post(
  '/',
  FieldsValidations.validateCheckoutItems,
  async (req: Request, res: Response) => {
    return checkoutController.productsCheckout(req, res);
  }
);

export default router;
