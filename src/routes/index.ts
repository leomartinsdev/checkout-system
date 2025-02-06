import { Router } from 'express';
import checkoutRouter from './checkout.routes';

const router = Router();

// Define your routes here
router.use('/checkout', checkoutRouter);

export default router;
