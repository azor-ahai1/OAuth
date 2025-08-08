import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./middlewares/oauth.middleware.js";

const app = express();

// CORS Configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN || process.env.FRONTEND_URL, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}));

// Body Parsing
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Session configuration for OAuth
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Static files
app.use("/public", express.static("public"));

// Route Imports
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

// Route Registration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter); 

// Health check
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "UncleFab Backend is running",
        timestamp: new Date().toISOString()
    });
});

// Global Error Middleware
app.use((err, req, res, next) => {
    console.error('Global Error Middleware:', {
        timestamp: new Date().toISOString(),
        method: req.method,
        path: req.path,
        body: req.body,
        query: req.query,
        error: {
            message: err.message,
            stack: err.stack,
            name: err.name,
            code: err.code
        },
    });

    res.status(500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 Handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
    });
});

export { app }; 