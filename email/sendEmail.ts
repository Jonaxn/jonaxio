import { Resend } from "resend";
import { isDev } from "@/config";
import React from "react";
import StripeWelcomeEmail from "~/email/react-email/emails/stripe-welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, html }) => {
  let message = {
    from: "delivered@resend.dev",
    to,
    subject,
    react: React.createElement(StripeWelcomeEmail, {
      content: "hell world",
      buttonText: "click here to do something with our email",
    }),
  };

  // if (isDev) {
  //   // we can't open file here, because it's in wsl2 now
  //   const previewEmail = (await import("preview-email")).default;
  //   const res = await previewEmail(message);
  //   console.log("res", typeof res, res);
  //   // \\wsl.localhost\Ubuntu-20.04\tmp
  //   return res;
  // } else {
  // }
  return resend.emails.send(message);
};
