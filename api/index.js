import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; // Import the path module
import { fileURLToPath } from 'url'; // Import helper for ES Modules

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import noteRoutes from './routes/noteRoutes.js'; // Import the new note routes

// --- CONFIGURE ENVIRONMENT VARIABLES ---
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly point dotenv to the .env file in the /api directory
dotenv.config({ path: path.resolve(__dirname, './.env') });

// --- DATABASE & SERVER SETUP ---
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes); // Use the new note routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;