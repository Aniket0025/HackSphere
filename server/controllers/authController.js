import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import sendOtpEmail from '../utils/sendOtpEmail.js';


dotenv.config();

export const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();



    await User.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        otp: otp,
        otpExpiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes from now
    });

    await sendOtpEmail(email, otp);

    res.status(201).json({ message: "OTP sent to email. Please Verify." });

};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
        return res.status(400).json({ message: "Please verify your email before logging in." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    res.json({ token, user });
};


export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
        return res.status(400).json({ message: "User already verified" });
    }

    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });

    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
    res.json({ message: "User verified successfully" });
}


export const resendOtp = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({ message: "User not found" });
    }

    if (user.isVerified) {
        res.status(400).json({ message: "User already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();

    await sendOtpEmail(email, otp);

    res.json({ message: "OTP resent to email" });

}

export const forgotPassword = async (req, res) => {

    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    await user.save();
    await sendOtpEmail(email, otp);
    res.json({ message: "OTP sent to email" });

}

export const resetPassword = async (req, res) => {

    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({ message: "User not found" });
    }

    if (user.otp !== otp || user.otpExpiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
    res.json({ message: "Password reset successfully" });
}

