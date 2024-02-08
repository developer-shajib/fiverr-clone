import expressAsyncHandler from 'express-async-handler';
import { prisma } from '../prisma/index.js';

/**
 * @DESC Dashboard
 * @ROUTE /api/v1/dashboard
 * @method GET
 * @access public
 */
export const getSellerData = expressAsyncHandler(async (req, res) => {
  const gigs = await prisma.gigs.count({ where: { userId: req.me.id } });

  const {
    _count: { id: orders }
  } = await prisma.order.aggregate({
    where: {
      isCompleted: true,
      gig: {
        createdBy: {
          id: req.me.id
        }
      }
    },
    _count: {
      id: true
    }
  });
  const unreadMessages = await prisma.messages.count({
    where: {
      recipentId: req.me.id,
      isRead: false
    }
  });
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisYear = new Date(today.getFullYear(), 0, 1);
  const {
    _sum: { price: revenue }
  } = await prisma.order.aggregate({
    where: {
      gig: {
        createdBy: {
          id: req.me.id
        }
      },
      isCompleted: true,
      createdAt: {
        gte: thisYear
      }
    },
    _sum: {
      price: true
    }
  });
  const {
    _sum: { price: dailyRevenue }
  } = await prisma.order.aggregate({
    where: {
      gig: {
        createdBy: {
          id: req.me.id
        }
      },
      isCompleted: true,
      createdAt: {
        gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    },
    _sum: {
      price: true
    }
  });
  const {
    _sum: { price: monthlyRevenue }
  } = await prisma.order.aggregate({
    where: {
      gig: {
        createdBy: {
          id: req.userId
        }
      },
      isCompleted: true,
      createdAt: {
        gte: thisMonth
      }
    },
    _sum: {
      price: true
    }
  });
  return res.status(200).json({
    dashboardData: {
      orders,
      gigs,
      unreadMessages,
      dailyRevenue,
      monthlyRevenue,
      revenue
    },
    message: 'Seller data fetch success'
  });

  //
});
