import express from 'express';
import { registerWithOtp, sendLoginOtp, verifyOtp, googleSignIn } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerWithOtp);
router.post('/send-login-otp', sendLoginOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google-signin', googleSignIn);

export default router;