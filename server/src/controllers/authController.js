import crypto from 'crypto';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateTokens.js';
import { sendEmail } from '../utils/sendEmail.js';
import logger from '../utils/logger.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.validatedBody;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered',
      });
    }

    // Generate verification token (6 hours expiry)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = new Date(Date.now() + 6 * 60 * 60 * 1000);

    // Create user
    const user = new User({
      name,
      email,
      password, // Will be hashed by pre-save hook
      isEmailVerified: false,
      verificationToken,
      verificationTokenExpires,
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
    const emailResult = await sendEmail({
      to: email,
      subject: 'Verify Your Email - Grove & Co.',
      html: `
        <h2>Welcome to Grove & Co.!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for signing up. Please verify your email to complete your registration.</p>
        <p>
          <a href="${verificationUrl}" style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2d3748;
            color: white;
            text-decoration: none;
            border-radius: 4px;
          ">
            Verify Email
          </a>
        </p>
        <p>Or copy this link: <a href="${verificationUrl}">${verificationUrl}</a></p>
        <p>This link expires in 6 hours.</p>
        <p>Best regards,<br>The Grove & Co. Team</p>
      `,
      text: `Welcome to Grove & Co.! Please verify your email by visiting: ${verificationUrl}`,
    });

    if (!emailResult.success) {
      logger.warn('Email verification could not be sent, user registered but unverified:', {
        userId: user._id,
        email,
      });
    }

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully. Please check your email to verify your account.',
      data: {
        userId: user._id,
        email: user.email,
        name: user.name,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Verify email
 * POST /api/auth/verify-email
 */
export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.validatedBody;

    // Find user by verification token
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    }).select('+verificationToken +verificationTokenExpires');

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired verification token',
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Email verified successfully. You can now log in.',
      data: {
        userId: user._id,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedBody;

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password +refreshToken');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        status: 'error',
        message: 'Please verify your email before logging in',
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password',
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save();

    // Set secure httpOnly cookie for refresh token (optional, for added security)
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Refresh access token
 * POST /api/auth/refresh-token
 */
export const refreshAccessToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.validatedBody;

    // Find user by refresh token
    const user = await User.findOne({ refreshToken }).select('+refreshToken');

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired refresh token',
      });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id, user.role);

    res.status(200).json({
      status: 'success',
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Forgot password
 * POST /api/auth/forgot-password
 */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.validatedBody;

    const user = await User.findOne({ email }).select('+resetPasswordToken +resetPasswordExpires');

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return res.status(200).json({
        status: 'success',
        message: 'If an account with that email exists, a password reset link has been sent.',
      });
    }

    // Generate reset token (1 hour expiry)
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    // Send reset email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
    const emailResult = await sendEmail({
      to: email,
      subject: 'Password Reset Request - Grove & Co.',
      html: `
        <h2>Password Reset Request</h2>
        <p>Hi ${user.name},</p>
        <p>You requested a password reset. Click the link below to proceed:</p>
        <p>
          <a href="${resetUrl}" style="
            display: inline-block;
            padding: 12px 24px;
            background-color: #2d3748;
            color: white;
            text-decoration: none;
            border-radius: 4px;
          ">
            Reset Password
          </a>
        </p>
        <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
        <p>Best regards,<br>The Grove & Co. Team</p>
      `,
      text: `Click here to reset your password: ${resetUrl}. This link expires in 1 hour.`,
    });

    if (!emailResult.success) {
      logger.warn('Password reset email could not be sent:', { email });
      return res.status(500).json({
        status: 'error',
        message: 'Failed to send password reset email. Please try again.',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'If an account with that email exists, a password reset link has been sent.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Reset password
 * POST /api/auth/reset-password
 */
export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.validatedBody;

    // Find user by reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    }).select('+resetPasswordToken +resetPasswordExpires');

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired password reset token',
      });
    }

    // Update password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'Password reset successful. You can now log in with your new password.',
      data: {
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  verifyEmail,
  login,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
};
