import nodemailer from 'nodemailer';

// const mailTransporter = nodemailer.createTransport({
//     host: "mail.dreamtouch-bd.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: "sharif@dreamtouch-bd.com",
//         pass: "}ul).59k*S*m",
//     },
// });
const mailTransporter = nodemailer.createTransport({
    host: "email-smtp.us-east-1.amazonaws.com",
    port: 465,
    secure: true,
    auth: {
        user: "AKIATXQSEZ6OWA7CCSH5",
        pass: "BKHmHq8zdn5c27UlQGoual3ni1LvdujZmS9Ac2ddKnse",
    },
});


export default mailTransporter