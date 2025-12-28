import express from 'express';
import { forgotPassword, login, register, resendOtp, resetPassword, verifyOtp, } from '../controllers/authController.js';

import { otpLimiter, loginLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/register', otpLimiter, register);
router.post('/login', loginLimiter, login);
router.post('/forgot-password', otpLimiter, forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', otpLimiter, resendOtp);
router.post('/verify-otp', verifyOtp);


export default router;