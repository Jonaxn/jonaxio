import { CreateEmailOptions } from "resend/build/src/emails/interfaces";
import { isDev } from "@/config";
import { render } from "@react-email/render";
import { nodemailerAppTransport } from "~/email/transports/nodemailer-app-transport";
import EmailTemplateWelcome from "~/email/react-email/emails/welcome";
import React from "react";
import { Resend } from "resend";
import { env } from "@/env.mjs";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, react }) => {
  const html = render(react);
  let message: CreateEmailOptions = {
    from: "onboarding@resend.dev",
    subject,
    to,
    html,
  };

  if (isDev) {
    return nodemailerAppTransport.sendMail({
      ...message,
    });
  }

  return resend.emails.send({ ...message, react });
};
