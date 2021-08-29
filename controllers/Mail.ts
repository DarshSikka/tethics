import nodemailer from "nodemailer";
export const sendMail = async (
  people: string,
  notificationashtml: string,
  subject: string
) => {
  console.log(people);
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mail = await transport.sendMail({
    from: process.env.EMAIL_ADDRESS,
    to: [people],
    subject,
    html: notificationashtml,
  });
  console.log(mail);
};
