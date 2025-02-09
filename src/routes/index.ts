import { Router } from 'express';
import checkoutRouter from './checkout.routes';

const router = Router();

router.use('/checkout', checkoutRouter);

export default router;
