import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port:  587,
      secure: false,  
      auth: {
        user: process.env.SMTP_USER,       
        pass: process.env.SMTP_PASS,
      },
    });

    const verificationUrl = `${process.env.CLIENT_URL}verify-email?token=${token}`;

    const mailOptions = {
      from: `Techuaride-pratical <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verification",
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>
        <p>This link will expire in 24 hours.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to: ${email}`);
  } catch (error) {
    console.error("Failed to send verification email:", error);
  }
};

export default sendVerificationEmail;
