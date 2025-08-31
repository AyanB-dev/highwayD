import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/noteController.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.models.js';

const router = express.Router();

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token and attach it to the request object
            req.user = await User.findById(decoded.id).select('-otp');

            next();
        } catch (error) {
            console.error('Error in authentication middleware:', error);
            res.status(401).json({ error: 'Not authorized, token failed.' });
        }
    }
    if (!token) {
        res.status(401).json({ error: 'Not authorized, no token.' });
    }
};

// Notes API Endpoints
// All of these routes will use the 'protect' middleware
router.route('/').get(protect, getNotes).post(protect, createNote);
router.route('/:id').delete(protect, deleteNote);

export default router;