import express from 'express';
import tokenVerify from '../middleware/tokenVerify.js';
import { userUpdate } from '../controllers/userController.js';
import { profileMulter } from '../utils/multer.js';

const router = express.Router();

router.use(tokenVerify);
// create route
router.route('/userUpdate/:id').put(profileMulter, userUpdate).patch(profileMulter, userUpdate);

// export default router
export default router;
