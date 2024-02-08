import expressAsyncHandler from 'express-async-handler';
import { prisma } from '../prisma/index.js';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OMVjoBdEm986tXbaeGJrBQyiRLZw01liTzMARQmBdRdI8aysLxs2u1xykUXlquFNdM9NrB9WGNpA6urZBY387xP00WPjBv5yG');

/**
 * @DESC Create a Order
 * @ROUTE /api/v1/orders
 * @method POST
 * @access public
 */
export const createOrder = expressAsyncHandler(async (req, res) => {
  const { gigId } = req.body;
  if (!gigId) return res.status(400).json({ message: 'Gig Id is required' });

  const gig = await prisma.gigs.findUnique({ where: { id: gigId } });

  if (!gig) return res.status(400).json({ message: 'Gig not found' });

  // Create Stripe payment intent
  await stripe.paymentIntents
    .create({
      amount: gig?.price * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true
      }
    })
    .then(async (stripRes) => {
      const order = await prisma.order.create({
        data: {
          paymentIntent: stripRes.id,
          price: gig?.price,
          buyer: { connect: { id: req.me.id } },
          gig: { connect: { id: gigId } }
        }
      });

      return res.status(201).json({ order, clientSecret: stripRes.client_secret, message: 'Order Created Successful' });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(400).json({ message: 'Order not created. Try again!' });
    });
});

/**
 * @DESC Update a Order
 * @ROUTE /api/v1/orders
 * @method PATCH/PUT
 * @access public
 */
export const updateOrder = expressAsyncHandler(async (req, res) => {
  const { paymentIntent } = req.body;

  if (!paymentIntent) return res.status(400).json({ message: 'Stripe payment intent is required' });

  const order = await prisma.order.findUnique({ where: { paymentIntent } });

  if (!order) return res.status(400).json({ message: 'Your payment intent is not valid' });

  const updateOrder = await prisma.order.update({ where: { paymentIntent }, data: { isCompleted: true } });

  res.status(200).json({ order: updateOrder, message: 'Payment Update Successful' });
});

/**
 * @DESC Get Buyers Order
 * @ROUTE /api/v1/orders/get-buyer-orders
 * @method GET
 * @access public
 */
export const getBuyerOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    where: { buyerId: req.me.id, isCompleted: true },
    include: { gig: true }
  });
  return res.status(200).json({ orders, message: 'Buyer orders get success' });
});
/**
 * @DESC Get Seller Order
 * @ROUTE /api/v1/orders/get-seller-orders
 * @method GET
 * @access public
 */
export const getSellerOrders = expressAsyncHandler(async (req, res, next) => {
  const orders = await prisma.order.findMany({
    where: { gig: { createdBy: { id: req.me.id } }, isCompleted: true },
    include: { gig: true, buyer: true }
  });
  return res.status(200).json({ orders, message: 'Seller orders get success' });
});
