<!-- 🔹 Nodemailer OTP + Rate Limiting (Implementation Notes) -->
Where It Is Used

User Registration → send OTP email

OTP Verification → verify user

Resend OTP → send OTP again

Forgot Password → send reset OTP

Routes Protected → /auth/send-otp, /auth/resend-otp

<!-- 📦 Package Installation -->
npm install nodemailer express-rate-limit

✉️ Nodemailer – How Used in Code

Use Case

Send OTP email to user

Setup

Create reusable mail utility

```js
// utils/mailer.js
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});
```


Send OTP

```js
export const sendOtpMail = async (email, otp) => {
  await transporter.sendMail({
    to: email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}`
  });
};
```


Used In

Register controller

Resend OTP controller

<!-- ⏱ Rate Limiting – How Used in Code -->

Use Case

Prevent OTP abuse

Setup

```js

// middleware/otpRateLimit.js
import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: "Too many OTP requests. Try later."
});

```


Applied On Routes

```js
router.post("/send-otp", otpLimiter, sendOtp);
router.post("/resend-otp", otpLimiter, resendOtp);
```

🔐 Coding Checklist

OTP expires in DB

OTP cleared after verification

Rate limit only OTP routes

Secrets stored in .env

✅ Status

✔ OTP email implemented
✔ Rate limiting applied
✔ Production-safe auth flow