/* 
    express application root file
*/

import express, {Application} from 'express'
import cors from 'cors'
import {v2 as cloudinary} from 'cloudinary';
import globalErrorHandler from "@/Middlewares/Errors/globalErrorHandler";
import notFoundHandler from "@/Middlewares/Errors/notFoundHandler";
import configRoutes from './Routes/config';
import {MailtrapClient} from "mailtrap";
import config from "@/Config";

const app: Application = express()
app.use(express.json())
app.use(cors())
app.use('/', configRoutes)
app.use(globalErrorHandler)
app.use(notFoundHandler)

cloudinary.config({
    cloud_name: 'dycvd4936',
    api_key: '623246772371727',
    api_secret: 'UfcM6iWxFtSZD5reNLvaBmYzgNU'
});

// mailTransporter.verify(function (error, success) {
//     if (error) {
//         console.log(error.message);
//     } else {
//         console.log("Mail server - ok!");
//     }
// });


// mailTransporter.sendMail({
//     from: 'Support<suppot@trelyt.store>',
//     to: 'amead@mailto.plus',
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
//     console.log('res', {res});
// }).catch((err) => {
//     console.log({err});
// })

const TOKEN = config.mail.token;
const RECIPIENT_EMAIL = "contact@ataur.dev";

const client = new MailtrapClient({token: TOKEN});

const sender = config.node_env === 'development' ? {
    email: "hello@trelyt.store",
    name: "Trelyt Support",
} : {
    email: "hello@dreamfurniturebd.com",
    name: "Dream Furniture Support",
};

client
    .send({
        from: sender,
        to: [{email: RECIPIENT_EMAIL}],
        subject: "Hello from Mailtrap!",
        text: "Welcome to Mailtrap Sending!",
    })
    .then(console.log)
    .catch(console.error);

export default app
