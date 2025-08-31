import User from '../models/user.models.js';
import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios'; // We need axios in the backend for this approach

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- HELPER FUNCTIONS ---
const sendEmail = async (email, otp) => {
    try {
        // Create a more robust transporter object
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465, // Use port 465 for SSL
            secure: true, // Use a secure connection
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            // Add this TLS option to handle potential self-signed certificate issues
            tls: {
                rejectUnauthorized: false
            }
        });

        // Send email with defined transport object
        const info = await transporter.sendMail({
            from: `"HighwayD" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
            html: `<b>Your OTP code is ${otp}. It will expire in 10 minutes.</b>`,
        });

        console.log("Message sent: %s", info.messageId);

    } catch (error) {
        // This will give us a much more detailed error in the backend terminal
        console.error("Error sending email:", error);
        // We re-throw the error so the calling function knows something went wrong
        throw new Error('Failed to send email.');
    }
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// --- CONTROLLER LOGIC ---

export const registerWithOtp = async (req, res) => {
    try {
        const { email, name, dateOfBirth } = req.body;

        if (!email || !name || !dateOfBirth) {
            return res.status(400).json({ error: 'All fields are required for registration.' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ error: 'Please enter a valid email address.' });
        }

        let existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.googleId) {
                return res.status(400).json({ error: 'This email is registered with Google. Please sign in with Google.' });
            } else {
                return res.status(400).json({ error: 'This email is already registered. Please sign in.' });
            }
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        const newUser = new User({ name, email, dateOfBirth, otp });
        newUser.otpExpires = Date.now() + 10 * 60 * 1000;

        await newUser.save();
        await sendEmail(email, otp);

        res.status(201).json({ message: 'OTP sent successfully. Please check your email to complete registration.' });

    } catch (error) {
        // This log will now capture the re-thrown error from sendEmail
        console.error('Error in registerWithOtp:', error);
        res.status(500).json({ error: 'Server error during registration' });
    }
};

export const sendLoginOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ error: 'Email is required.' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User with this email not found. Please sign up.' });
        }

        if (user.googleId) {
            return res.status(400).json({ error: 'This account was created with Google. Please sign in with Google.' });
        }

        if (user.otp && user.otpExpires > Date.now()) {
            return res.status(400).json({ error: 'An active OTP has already been sent. Please check your email.' });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();
        await sendEmail(email, otp);

        res.status(200).json({ message: 'Login OTP sent. Please check your email.' });

    } catch (error) {
        console.error('Error in sendLoginOtp:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: 'Email and OTP are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ error: 'OTP is invalid or has expired' });
        }

        const isMatch = await user.compareOtp(otp);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const payload = { id: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });

        const userResponse = { _id: user._id, name: user.name, email: user.email };

        res.status(200).json({ message: 'Verification successful', token, user: userResponse });

    } catch (error) {
        console.error('Error in verifyOtp:', error);
        res.status(500).json({ error: 'Server error during OTP verification' });
    }
};

export const googleSignIn = async (req, res) => {
    try {
        const { accessToken } = req.body;

        // 1. Use the access token to get user info from Google's API
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const { name, email, sub: googleId } = data;

        // 2. Check for an Existing User
        let user = await User.findOne({ email });

        if (user) {
            // Edge case: User exists but signed up with OTP.
            // Link their existing account to Google ID.
            if (!user.googleId) {
                user.googleId = googleId;
                await user.save();
            }
        } else {
            // User does not exist, create a new account.
            user = new User({ name, email, googleId });
            await user.save();
        }

        // 3. Generate a JWT for the authenticated user
        const jwtPayload = { id: user._id };
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '3d' });

        const userResponse = { _id: user._id, name: user.name, email: user.email };

        // 4. Send back the token and user data
        res.status(200).json({ message: 'Google sign-in successful!', token, user: userResponse });

    } catch (error) {
        console.error('Error in googleSignIn:', error);
        res.status(500).json({ error: error.response?.data?.error || 'Server error during Google sign-in.' });
    }
};