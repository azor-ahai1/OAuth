import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: function() {
                return !this.authProvider || this.authProvider === 'local';
            },
            minlength: [6, 'Password must be at least 6 characters']
        },
        profileImage: {
            type: String,
            default: ""
        },
        refreshToken: {
            type: String
        },
        // OAuth fields
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },
        microsoftId: {
            type: String,
            unique: true,
            sparse: true
        },
        authProvider: {
            type: String,
            enum: ['local', 'google', 'microsoft'],
            default: 'local'
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        emailVerificationToken: {
            type: String
        },
        emailVerificationExpiry: {
            type: Date
        },
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

// Pre-save middleware for password hashing
userSchema.pre("save", async function (next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Instance methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.generateEmailVerificationToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email
        },
        process.env.EMAIL_VERIFICATION_SECRET,
        { 
            expiresIn: '24h'
        }
    );
};

userSchema.methods.generatePasswordResetToken = function () {
    return jwt.sign(
        { 
            _id: this._id,
            email: this.email
        },
        process.env.PASSWORD_RESET_SECRET,
        { 
            expiresIn: '1h'
        }
    );
};

export const User = mongoose.model("User", userSchema); 