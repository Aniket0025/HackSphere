import express from 'express';
import { forgotPassword, login, register, resendOtp, resetPassword, verifyOtp } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/resend-otp', resendOtp);
router.post('/verify-otp', verifyOtp);


export default router;