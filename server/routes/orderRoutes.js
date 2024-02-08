import express from 'express';
import tokenVerify from '../middleware/tokenVerify.js';
import { createOrder, getBuyerOrders, getSellerOrders, updateOrder } from '../controllers/orderController.js';

const router = express.Router();

router.use(tokenVerify);

// create route
router.route('/').post(createOrder).patch(updateOrder).put(updateOrder);
router.route('/get-buyer-orders').get(getBuyerOrders);
router.route('/get-seller-orders').get(getSellerOrders);

// export default router
export default router;
