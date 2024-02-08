// allowed origin
import dotenv from 'dotenv';
dotenv.config();

const allowedOrigins = [process.env.PUBLIC_URL, 'https://localhost:3000', 'http://localhost:5173'];

// cors options
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not Allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};

// exports
export default corsOptions;
