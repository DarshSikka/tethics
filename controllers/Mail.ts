//Import nodemailer
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
      // provide valid email address and password for mails to function
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mail = await transport.sendMail({
    // Send mail to the student selected
    from: process.env.EMAIL_ADDRESS,
    to: [people],
    subject,
    html: notificationashtml,
  });
  console.log(mail);
};
