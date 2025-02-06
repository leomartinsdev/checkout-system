import { NextFunction, Request, Response } from 'express';

class FieldsValidations {
  static validateCheckoutItems(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        error: 'Items must be an array of product SKUs',
      });
    }

    for (const sku of items) {
      if (typeof sku !== 'string' || sku.trim() === '') {
        return res.status(400).json({
          error: 'Each item must be a valid SKU string',
        });
      }
    }

    next();
  }
}

export default FieldsValidations;
