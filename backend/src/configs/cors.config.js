const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://yourdomain.com",
  "http://localhost:5175",
];

export const corsConfig = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
