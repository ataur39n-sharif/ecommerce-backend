import nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
    host: "mail.dreamtouch-bd.com",
    port: 465,
    secure: true,
    auth: {
        user: "sharif@dreamtouch-bd.com",
        pass: "}ul).59k*S*m",
    },
});

export default mailTransporter