import nodemailer from 'nodemailer';
import logger from './logger.js';

let transporterPromise = null;

const getTransporter = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Fallback to Ethereal / test account in development
  if (!transporterPromise) {
    transporterPromise = (async () => {
      try {
        const testAccount = await nodemailer.createTestAccount();
        console.log(`Created Ethereal test email account: ${testAccount.user}`);
        return nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      } catch (err) {
        console.error('Failed to create Ethereal test account, logging emails to console', err);
        return null;
      }
    })();
  }

  return transporterPromise;
};

/**
 * Send an email
 * @param {Object} options - { to, subject, html, text }
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const transporter = await getTransporter();

    const mailOptions = {
      from: `"Grove & Co." <${process.env.EMAIL_USER || 'no-reply@groveandco.com'}>`,
      to,
      subject,
      text: text || '',
      html: html || '',
    };

    if (transporter) {
      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}: ${info.messageId}`);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log(`Email preview URL: ${previewUrl}`);
      }
      return { success: true, messageId: info.messageId, previewUrl };
    } else {
      console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
      return { success: true, mocked: true };
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export default sendEmail;
