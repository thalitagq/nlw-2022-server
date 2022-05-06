import { MailAdapter, SendMailData } from "../mailAdapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "68fd5f2321962e",
    pass: "8f17793e24517d",
  },
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
      from: "Equipe Feedget <oi@fidget.com>",
      to: "Thalita Gonçalves <thalitagq@outlook.com>",
      subject,
      html: body,
    });
  }
}