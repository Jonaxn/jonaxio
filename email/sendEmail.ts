import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ subject, to, html }) => {
  resend.emails.send({
    from: "delivered@resend.dev",
    to,
    subject,
    html,
  });
};
