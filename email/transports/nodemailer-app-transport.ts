import * as nodemailer from "nodemailer";
import { env } from "@/env.mjs";

let user = env.NODEMAILER_LOCAL_USER; // add this to .env.local from the NodemailerApp
let pass = env.NODEMAILER_LOCAL_PASS; // add this to .env.local from the NodemailerApp

export const nodemailerAppTransport = nodemailer.createTransport({
  // any timer open wsl, should modify this,
  host: "192.168.80.1",
  port: 1025,
  auth: {
    user: user,
    pass: pass,
  },
});
