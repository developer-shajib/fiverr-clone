import express from 'express';
import tokenVerify from '../middleware/tokenVerify.js';
import { addMessage, getMessages, getUnreadMessages, markAsRead } from '../controllers/messagesController.js';

const router = express.Router();

router.use(tokenVerify);
// create route
router.route('/unread-messages').get(getUnreadMessages);
router.route('/mark-as-read/:messageId').put(markAsRead).patch(markAsRead);
router.route('/:orderId').get(getMessages).post(addMessage);

// export default router
export default router;
