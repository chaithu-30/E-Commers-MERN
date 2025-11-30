import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

if (!process.env.EMAIL_USER && !process.env.EMAIL_PASS) {
  try {
    dotenv.config();
  } catch (e) {}
}

const hasValidEmailConfig = 
  process.env.EMAIL_USER && 
  process.env.EMAIL_USER.trim() !== '' &&
  process.env.EMAIL_PASS && 
  process.env.EMAIL_PASS.trim() !== '';

if (!hasValidEmailConfig) {
  if (typeof process.env.PORT !== 'undefined') {
    console.warn('⚠️  Email credentials not configured. Emails will not be sent.');
    console.warn('   Please set EMAIL_USER and EMAIL_PASS in your .env file');
  }
}

let transporter;

if (process.env.EMAIL_SERVICE === 'mailtrap') {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('📧 Using Mailtrap for email');
} else if (process.env.EMAIL_SERVICE === 'outlook' || process.env.EMAIL_SERVICE === 'hotmail') {
  transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('📧 Using Outlook/Hotmail for email');
} else if (process.env.EMAIL_SERVICE === 'custom') {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  console.log('📧 Using custom SMTP server for email');
} else {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000
  });
}

export const sendOrderEmail = async (order, user) => {
  const hasValidConfig = 
    process.env.EMAIL_USER && 
    process.env.EMAIL_USER.trim() !== '' &&
    process.env.EMAIL_PASS && 
    process.env.EMAIL_PASS.trim() !== '';
    
  if (!hasValidConfig) {
    console.warn('⚠️  Email not sent: EMAIL_USER or EMAIL_PASS not configured or empty');
    return { success: false, message: 'Email service not configured' };
  }

  try {
    await transporter.verify();
    console.log('✓ Email server is ready to send messages');

    const formatPrice = (price) => {
      return `₹${price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    };

    const orderItemsHTML = order.items.map(item => `
      <tr>
        <td style="word-wrap: break-word; max-width: 150px;">${item.name}</td>
        <td>${item.size}</td>
        <td>${item.quantity}</td>
        <td>${formatPrice(item.price)}</td>
        <td style="text-align: right;">${formatPrice(item.price * item.quantity)}</td>
      </tr>
    `).join('');

    const fromName = process.env.EMAIL_FROM_NAME || 'StyleVault';
    const fromEmail = process.env.EMAIL_FROM || process.env.EMAIL_USER;
    const fromAddress = `${fromName} <${fromEmail}>`;

    const mailOptions = {
      from: fromAddress,
      to: user.email,
      replyTo: fromEmail,
      subject: `Order Confirmation - Order #${order._id}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f5f5f5; -webkit-font-smoothing: antialiased; }
            .email-wrapper { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .container { width: 100%; max-width: 600px; margin: 0 auto; }
            .header { background-color: #ff9900; color: #0f1111; padding: 25px 20px; text-align: center; }
            .header h1 { font-size: 24px; margin: 0; }
            .content { padding: 20px; background-color: #eaeded; }
            .content p { margin: 10px 0; font-size: 14px; line-height: 1.6; }
            .order-details { background-color: white; padding: 15px; margin: 15px 0; border-radius: 4px; border: 1px solid #ddd; }
            .order-details h2 { font-size: 18px; margin-bottom: 15px; color: #0f1111; }
            .order-info { margin: 10px 0; font-size: 14px; }
            .order-info strong { display: inline-block; min-width: 100px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 13px; }
            table th { background-color: #f0f2f2; color: #0f1111; padding: 10px 8px; text-align: left; border-bottom: 2px solid #ddd; font-weight: 700; font-size: 12px; }
            table td { padding: 10px 8px; border-bottom: 1px solid #e7e7e7; font-size: 13px; word-wrap: break-word; }
            .total { font-size: 16px; font-weight: bold; text-align: right; margin-top: 15px; padding-top: 15px; border-top: 2px solid #ddd; }
            .footer { padding: 15px 20px; text-align: center; font-size: 12px; color: #666; }
            @media only screen and (max-width: 600px) {
              .email-wrapper { width: 100% !important; }
              .container { width: 100% !important; padding: 0 !important; }
              .header { padding: 20px 15px !important; }
              .header h1 { font-size: 20px !important; }
              .content { padding: 15px !important; }
              .order-details { padding: 12px !important; margin: 10px 0 !important; }
              table { font-size: 11px !important; }
              table th { padding: 8px 5px !important; font-size: 11px !important; }
              table td { padding: 8px 5px !important; font-size: 11px !important; }
              .order-info { font-size: 13px !important; }
              .order-info strong { display: block; margin-bottom: 5px; }
            }
            @media only screen and (max-width: 480px) {
              table th, table td { padding: 6px 3px !important; font-size: 10px !important; }
              .total { font-size: 14px !important; }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="container">
              <div class="header">
                <h1>Order Confirmed!</h1>
              </div>
              <div class="content">
                <p>Dear ${user.name},</p>
                <p>Thank you for your order! We've received your order and it's being processed.</p>
                
                <div class="order-details">
                  <h2>Order Details</h2>
                  <div class="order-info">
                    <strong>Order ID:</strong> ${order._id}
                  </div>
                  <div class="order-info">
                    <strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleDateString()}
                  </div>
                  
                  <table>
                    <thead>
                      <tr>
                        <th style="width: 35%;">Product</th>
                        <th style="width: 15%;">Size</th>
                        <th style="width: 15%;">Qty</th>
                        <th style="width: 20%;">Price</th>
                        <th style="width: 15%; text-align: right;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${orderItemsHTML}
                    </tbody>
                  </table>
                  
                  <div class="total">
                    <p>Total Amount: ${formatPrice(order.totalPrice)}</p>
                  </div>
                </div>
                
                <p>We'll send you another email when your order ships.</p>
                <p>If you have any questions, please don't hesitate to contact us.</p>
                <p>Best regards,<br><strong>${fromName} Team</strong></p>
              </div>
              <div class="footer">
                <p>StyleVault E-Commerce</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Order confirmation email sent successfully');
    console.log('  To:', user.email);
    console.log('  Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('✗ Error sending email:');
    console.error('  Error Code:', error.code);
    console.error('  Error Message:', error.message);
    
    if (error.code === 'EAUTH') {
      console.error('  → Authentication failed. Check your EMAIL_USER and EMAIL_PASS');
      console.error('  → For Gmail, use an App Password, not your regular password');
    } else if (error.code === 'ECONNECTION') {
      console.error('  → Connection failed. Check your internet connection');
    } else if (error.code === 'ETIMEDOUT') {
      console.error('  → Connection timeout. Check your email service settings');
    }
    
    return { success: false, error: error.message, code: error.code };
  }
};

