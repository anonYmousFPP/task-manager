import express from 'express';
import User from '../schema/User.schema.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        // todo for post
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid credentials');
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid credentials');
        }

        // Create a new JWT token
        const token = jwt.sign({ username }, SECRET_KEY);

        // Return the token to the user
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send(e);
    }
})

router.post('/signup', async (req, res) => {
    try {
        // todo for post
        const { username, password, name } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).send('Username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = jwt.sign({ username }, SECRET_KEY);

        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            jwtToken: token,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', token });
    }
    catch (e) {
        console.log(`Error is found ${e}`);
        res.status(404).send(e);
    }
})

export default router;