import { Request, Router, Response } from 'express';
import CheckoutCOntroller from '../controllers/CheckoutController';

const checkoutController = new CheckoutCOntroller();

const router = Router();

router.post('/', async (req: Request, res: Response) => {});

export default router;
