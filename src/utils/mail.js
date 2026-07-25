import Mailgen from "mailgen";

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

export { emailVerificationMailgenContent, forgotPasswordMailgenContent };
