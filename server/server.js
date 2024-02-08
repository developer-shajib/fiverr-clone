import express from 'express';
import colors from 'colors';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import corsOptions from './config/cors.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import authRoute from './routes/authRoutes.js';
import userRoute from './routes/userRoute.js';
import gigsRoute from './routes/gigsRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import messagesRoute from './routes/messagesRoute.js';
import dashboardRoute from './routes/dashboardRoutes.js';

// initialization
const app = express();
dotenv.config();

const PORT = process.env.PORT || 9090;

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

// Static folder
app.use(express.static('public'));

// routing
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/gigs', gigsRoute);
app.use('/api/v1/orders', orderRoute);
app.use('/api/v1/messages', messagesRoute);
app.use('/api/v1/dashboard', dashboardRoute);

// use error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.bgGreen.black);
});
