import nodemailer from 'nodemailer';
import Config from "@/Config/index";

const mailTransporter = nodemailer.createTransport({
    host: Config.mail.hostName,
    port: Number(Config.mail.port),
    secure: Config.mail.secure === 'true',
    auth: {
        user: Config.mail.auth.user,
        pass: Config.mail.auth.password,
    },
});


/*
* HOST=mail.dreamtouch-bd.com
SECURE=true
SMTPUSER=sharif@dreamtouch-bd.com
SMTPPASSWORD=}ul).59k*S*m
* */

// const mailTransporter = nodemailer.createTransport({
//     host: "email-smtp.us-east-1.amazonaws.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "AKIATXQSEZ6OWA7CCSH5",
//         pass: "BKHmHq8zdn5c27UlQGoual3ni1LvdujZmS9Ac2ddKnse",
//     },
// });


export default mailTransporter