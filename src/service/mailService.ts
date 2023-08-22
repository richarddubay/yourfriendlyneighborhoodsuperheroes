import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, message: string, name: string) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT ?? '465'),
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    logger: true,
    debug: true,
  });

  console.log('process.env.EMAIL_SERVER_HOST = ', process.env.EMAIL_SERVER_HOST);
  console.log('process.env.EMAIL_SERVER_PORT = ', process.env.EMAIL_SERVER_PORT);
  console.log('process.env.EMAIL_SERVER_USER = ', process.env.EMAIL_SERVER_USER);
  console.log('process.env.EMAIL_SERVER_PASSWORD = ', process.env.EMAIL_SERVER_PASSWORD);
  console.log('lets send an email in here');

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_SERVER_USER,
    subject: `Website form submission from ${name}`,
    html: `<div>From: ${name}</div><div>Email: ${email}</div><div>Message: ${message}</div>`,
  });
};
