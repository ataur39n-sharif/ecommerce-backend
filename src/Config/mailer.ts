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
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
        user: 'api',
        pass: config.mail.auth.password
    }
});

export default mailTransporter