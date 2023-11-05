import nodemailer from 'nodemailer';
import config from "@/Config/index";

// const mailTransporter = nodemailer.createTransport({
//     host: Config.mail.hostName,
//     port: Number(Config.mail.port),
//     secure: Config.mail.secure === 'true',
//     auth: {
//         user: Config.mail.auth.user,
//         pass: Config.mail.auth.password,
//     },
// });

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    port: 576,
    auth: {
        user: 'hello.ataur39n@gmail.com',
        pass: config.mail.auth.password,
    },
    tls: {
        rejectUnauthorized: true
    }
});

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