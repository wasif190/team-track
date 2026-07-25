import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Team track",
      link: "https:teamtrackxyz.com",
    },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.teamtrack@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mail);
  } catch (error) {
    console.log("Error while sending mail: ", error);
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,

      intro: [
        "Welcome to TeamTrack! 🎉",
        "We're excited to have you on board. To keep your account secure, please verify your email address before getting started.",
      ],

      action: {
        instructions: "Click the button below to verify your email address:",
        button: {
          color: "#2563EB",
          text: "Verify Email",
          link: verificationUrl,
        },
      },

      outro: "Need help? Just reply to this email—we're here to help.",
    },
  };
};

const forgotPasswordMailgenContent = (username, resetPasswordUrl) => {
  return {
    body: {
      name: username,

      intro: [
        "We received a request to reset your password.",
        "If you made this request, click the button below to create a new password.",
      ],

      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#DC4D2F",
          text: "Reset Password",
          link: resetPasswordUrl,
        },
      },

      outro: [
        "If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.",
        "If you're having trouble with the button above, copy and paste the URL into your browser.",
      ],
    },
  };
};

export {
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
  sendEmail,
};
