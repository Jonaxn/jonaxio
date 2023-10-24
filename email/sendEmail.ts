import { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import { isDev } from "@/config";
import { render } from "@react-email/render";
import { nodemailerAppTransport } from "~/email/transports/nodemailer-app-transport";
import StripeWelcomeEmail from "~/email/react-email/emails/stripe-welcome";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, html }) => {
  let react = React.createElement(StripeWelcomeEmail, {
    content: "content",
    buttonText: "buttonText",
  });

  let message: CreateEmailOptions = {
    from: "onboarding@resend.dev",
    subject,
    to,
    html,
  };

  if (isDev) {
    const html = render(react);
    return nodemailerAppTransport.sendMail({
      ...message,
      html,
    });
  }

  return resend.emails.send({ ...message, react });
};
