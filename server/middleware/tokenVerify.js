import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import { prisma } from '../prisma/index.js';

// Verify Token
const tokenVerify = (req, res, next) => {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  if (!authHeader) return res.status(400).json({ message: 'Unauthorized' });
  const token = authHeader?.split(' ')[1];

  // const token = req.cookies.accessToken;

  if (!token) return res.status(400).json({ message: 'Unauthorized' });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    asyncHandler(async (error, decode) => {
      if (error) {
        return res.status(400).json({ message: 'Invalid Token' });
      }

      const me = await prisma.user.findUnique({ where: { id: decode.id }, include: { gigs: true } });
      me.password = undefined;

      req.me = me;

      next();
    })
  );
};

export default tokenVerify;
