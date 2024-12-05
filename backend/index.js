import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_DB;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));

// CORS Configuration
const corsConfig = {
    origin: "*", // Allow all origins
    credentials: true, // Allow cookies/auth
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
};
app.use(cors(corsConfig)); // Apply CORS to all routes

// Middleware for Token Authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer

    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided');
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).send('Access Denied: Invalid Token');
        }

        req.user = user; // Attach decoded user info to request
        next();
    });
};

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

// Import routes
import task from './route/task.route.js';
app.use('/task', task);

import User from './route/user.route.js';
app.use('/user', User);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
