import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

export const sendVerificationEmail = async (email, token, name) => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'UncleFab - Verify Your Email',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; color: #3b82f6;">UncleFab</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.8;">Fashion & Style</p>
                </div>
                <div style="padding: 30px; background: white;">
                    <h2 style="color: #0f172a; margin-bottom: 20px;">Welcome to UncleFab, ${name}!</h2>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 25px;">
                        Thank you for signing up! Please verify your email address to complete your registration and start shopping for the latest fashion trends.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${verificationUrl}" 
                           style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                            Verify Email Address
                        </a>
                    </div>
                    <p style="color: #64748b; font-size: 14px; margin-top: 25px;">
                        If the button doesn't work, copy and paste this link into your browser:<br>
                        <a href="${verificationUrl}" style="color: #3b82f6;">${verificationUrl}</a>
                    </p>
                    <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                        This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
                    </p>
                </div>
                <div style="background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
                    <p>© 2024 UncleFab. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

export const sendPasswordResetEmail = async (email, token, name) => {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'UncleFab - Reset Your Password',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px; text-align: center;">
                    <h1 style="margin: 0; color: #3b82f6;">UncleFab</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.8;">Fashion & Style</p>
                </div>
                <div style="padding: 30px; background: white;">
                    <h2 style="color: #0f172a; margin-bottom: 20px;">Password Reset Request</h2>
                    <p style="color: #64748b; line-height: 1.6; margin-bottom: 25px;">
                        Hi ${name}, we received a request to reset your password. Click the button below to create a new password.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" 
                           style="background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #64748b; font-size: 14px; margin-top: 25px;">
                        If the button doesn't work, copy and paste this link into your browser:<br>
                        <a href="${resetUrl}" style="color: #3b82f6;">${resetUrl}</a>
                    </p>
                    <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
                        This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
                    </p>
                </div>
                <div style="background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
                    <p>© 2024 UncleFab. All rights reserved.</p>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
}; 