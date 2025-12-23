import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });


    await transporter.sendMail({
        from:`"HackSphere" <${process.env.EMAIL_USER}>`,
        to:email,
        subject:"HackSphere OTP Verification",
        html:`
        <h2>HackSphere OTP Verification</h2>
        <p>Your OTP is:</p>  <h1><strong>${otp}</strong></h1>
        <p>This OTP is valid for 10 minutes.</p>
        <br/>
        <p>If you did not request this, please ignore this email.</p>
        <br/>
        <p>Best Regards,<br/>HackSphere Team</p>

        `
    });

};

export default sendOtpEmail;