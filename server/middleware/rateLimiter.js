import rateLimit from 'express-rate-limit';

// OTP limiter (Register, Resend OTP, Forgot Password)
export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        message: "Too many OTP requests from this IP, please try again after 10 minutes"
    }
});


// Login limiter

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
    message: {
        message: "Too many login attempts from this IP, please try again after 15 minutes"
    }
})
