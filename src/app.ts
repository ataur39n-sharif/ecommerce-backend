/* 
    express application root file
*/

import express, {Application} from 'express'
import cors from 'cors'
import globalErrorHandler from "@/Middlewares/Errors/globalErrorHandler";
import notFoundHandler from "@/Middlewares/Errors/notFoundHandler";
import configRoutes from './Routes/config';
import mailTransporter from "@/Config/mailer";
import { MailService } from './App/modules/Mail/mail.service';

const app: Application = express()
app.use(express.json())
app.use(cors())
app.use('/', configRoutes)
app.use(globalErrorHandler)
app.use(notFoundHandler)


mailTransporter.verify(function (error, success) {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Mail server - ok!");
    }
});

//  mailTransporter.sendMail({
//     from: 'Contact<sharif@dreamtouch-bd.com>',
//     to: 'ciwak13167@klanze.com',
//     replyTo: "sharif@dreamtouch-bd.com",
//     subject: "Verify your email .",
//     html: `
//     <div>
//         <h3>Congratulation - Account successfully Created .</h3>
//         <p>Here is the last step - <b>Verify your email</b> .</p>
//         <p>To verify your email click this confirm link - <a href=''>Confirm</a></p>
//         <p>Note : This email is only valid for 5min.</p>
//     </div>
//     `
// }).then((res) => {
//     console.log('res',{res});
    
// }).catch((err) => {
//     console.log({err});
    
// })




export default app
