import expressAsyncHandler from 'express-async-handler';
import { prisma } from '../prisma/index.js';

/**
 * @DESC Get all message
 * @ROUTE /api/v1/message
 * @method GET
 * @access public
 */
export const getMessages = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.orderId) return res.status(400).json({ message: 'orderId is required !' });

  const messages = await prisma.messages.findMany({
    where: { order: { id: req.params.orderId } },
    orderBy: {
      createdAt: 'asc'
    }
  });

  await prisma.messages.updateMany({
    where: { orderId: req.params.orderId, recipentId: req.me.id },
    data: {
      isRead: true
    }
  });
  const order = await prisma.order.findUnique({
    where: { id: req.params.orderId },
    include: { gig: true }
  });

  let recipentId;
  if (order.buyerId == req.me.id) {
    recipentId = order.gig.userId;
  } else if (order.gig.userId == req.me.id) {
    recipentId = order.buyerId;
  }
  res.status(200).json({ messagesData: messages, recipentId, message: 'Message get success' });
});

/**
 * @DESC Add message
 * @ROUTE /api/v1/messages
 * @method POST
 * @access public
 */
export const addMessage = expressAsyncHandler(async (req, res) => {
  if (!req.body.recipentId || !req.body.text || !req.params.orderId) return res.status(400).json({ message: 'userId, recipentId, orderId is required !' });

  const messageData = await prisma.messages.create({
    data: {
      sender: { connect: { id: req.me.id } },
      recipent: { connect: { id: req.body.recipentId } },
      order: { connect: { id: req.params.orderId } },
      text: req.body.text
    }
  });

  if (!messageData) return res.status(400).json({ message: 'Message was not sent' });

  res.status(201).json({ newMsg: messageData, message: 'Message sent successful' });
});

export const getUnreadMessages = expressAsyncHandler(async (req, res, next) => {
  const messagesData = await prisma.messages.findMany({
    where: {
      recipentId: req.me.id,
      isRead: false
    },
    include: {
      sender: true
    }
  });

  if (!messagesData) return res.status(400).json({ message: 'Unread messages not fetch' });
  return res.status(200).json({ unreadMessages: messagesData, message: 'Unread message fetch success' });
});

export const markAsRead = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.messageId) return res.status(400).json({ message: 'Message Id is required' });

  await prisma.messages.update({
    where: { id: req.params.messageId },
    data: { isRead: true }
  });
  return res.status(200).send('Message mark as read.');
});
