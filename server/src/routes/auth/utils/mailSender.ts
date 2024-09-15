import nodemailer from "nodemailer";

export const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASSWORD,
      },
    });
    const info = await transporter.sendMail({
      from: process.env.NODE_MAILER_USER,
      to: email,
      subject: title,
      html: body,
    });
    return info;
  } catch (error) {
    console.log(error);
  }
};
