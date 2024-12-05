import express from 'express';
import mongoose from 'mongoose';

import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_DB;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();
app.use(express.json());

mongoose.connect(mongo_url);

import cors from "cors";

const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied: No Token Provided');
    }

    console.log(SECRET_KEY);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send(`Invalid Token ${err}`);
        }

        req.user = user; // Attach user info to request object
        next();
    });
};

app.get('/', (req, res) => {
    res.send("Hello World");
})

import task from './route/task.route.js';
app.use('/task', task);

import User from './route/user.route.js';
app.use('/user', User);

app.listen(port);