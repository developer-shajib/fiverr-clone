import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { prisma } from '../prisma/index.js';
import { createToken } from '../helpers/createToken.js';

/**
 * @DESC Sign Up
 * @ROUTE /api/v1/auth/signup
 * @method POST
 * @access public
 */
export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) return res.status(400).json({ message: 'All fields are required!' });

  const findUser = await prisma.user.findUnique({ where: { email } });

  if (findUser) return res.status(400).json({ message: 'Email already exist!' });

  const hashPass = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashPass
    }
  });
  user.password = undefined;

  // response to client
  if (user) {
    const token = createToken({ id: user.id, email: user.email });
    if (token)
      res
        .status(201)
        .cookie('accessToken', token, {
          httpOnly: false,
          secure: true,
          sameSite: 'none',
          path: '/',
          maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({ user, message: 'Account created successful' });
  } else {
    res.status(400).json({ message: 'Account not created' });
  }
});
/**
 * @DESC Sign In
 * @ROUTE /api/v1/auth/signIn
 * @method POST
 * @access public
 */
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // validation
  if (!email || !password) return res.status(400).json({ message: 'All fields are required!' });

  const user = await prisma.user.findUnique({ where: { email }, include: { gigs: true } });

  if (!user) return res.status(400).json({ message: 'You have no account!' });

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) return res.status(400).json({ message: 'Incorrect password!' });

  user.password = undefined;

  // response to client

  const token = createToken({ id: user.id, email: user.email });
  if (token)
    res
      .status(200)
      .cookie('accessToken', token, { 
        httpOnly: false,
        secure: true,
        sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({ user, message: 'Sign In successful' });
});

/**
 * @DESC Logged In user
 * @ROUTE /api/v1/auth/loggedIn
 * @method GET
 * @access public
 */
export const loggedIn = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req?.me, message: 'LoggedIn User' });
});
/**
 * @DESC Logout
 * @ROUTE /api/v1/auth/logout
 * @method POST
 * @access public
 */
export const logout = asyncHandler(async (req, res) => {
  res
    .status(200)
    .clearCookie('accessToken', {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      path: '/',
      expires: new Date(0)
    })
    .json({ message: 'Logout successful' });
});
