import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
        type: String,
        enum: ["user", "admin", "judge", "participate"],
        default: "participate"
    },
    otp: String,
    otpExpiresAt: Date,
    isVerified: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });

export default mongoose.model("User", UserSchema);