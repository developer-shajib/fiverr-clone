import express from 'express';
import tokenVerify from '../middleware/tokenVerify.js';
import { getSellerData } from '../controllers/dashboardController.js';

const router = express.Router();

router.use(tokenVerify);

// create route
router.route('/seller').get(getSellerData);

// export default router
export default router;
