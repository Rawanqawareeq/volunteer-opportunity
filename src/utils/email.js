import  nodemailer from "nodemailer";
import { emailTemplate, sendCodeTemplete } from "../middlewave/emailTemplate.js";
export async function sendEmail (to,subject,userName,token){
    
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORDEMAIL,
    },
});
const info = await transporter.sendMail({
    from: `Volunteer Opportunity" <process.env.EMAIL>`, 
    to, 
    subject,
    html:emailTemplate(userName,token),
  });

  return info;
}
export async function sendCode (to,subject,email,code){
    
  const transporter = nodemailer.createTransport({
      service:'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORDEMAIL,
      },
  });
  const info = await transporter.sendMail({
      from: `Volunteer Opportunity" <process.env.EMAIL>`, 
      to, 
      subject,
      html:sendCodeTemplete(email,code),
    });
  
    return info;
  }


