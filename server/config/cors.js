// allowed origin

const allowedOrigins = [process.env.PUBLIC_URL, 'https://localhost:3000', 'http://localhost:5173', 'https://chat-app-with-mern-stack.vercel.app'];

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
