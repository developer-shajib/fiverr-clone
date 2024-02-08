import express from 'express';
import { loggedIn, logout, signIn, signup } from '../controllers/authController.js';
import tokenVerify from '../middleware/tokenVerify.js';

const router = express.Router();

// create route
router.route('/signup').post(signup);
router.route('/signIn').post(signIn);
router.route('/loggedIn').get(tokenVerify, loggedIn);
router.route('/logout').post(tokenVerify, logout);

// export default router
export default router;
