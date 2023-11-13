import config from "@/Config/index";
import {MailtrapClient} from "mailtrap";

type TMailPayload = {
    receiverEmail: string, subject: string, html: string, category: string
}

// const mailTransporter = nodemailer.createTransport({
//     host: "mail.privateemail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: 'support@trelyt.store',
//         pass: config.mail.auth.password
//     }
// });

// export default mailTransporter


export const sendAMail = async ({
                                    receiverEmail, category, subject, html
                                }: TMailPayload) => {

    const {token, endpoint} = config.mail

    const sender = {
        email: "support@trelyt.store",
        name: "Trelyt Support",
    };
    const recipients = [
        {
            email: receiverEmail,
        }
    ];

    const client = new MailtrapClient({token});

    client
        .send({
            from: sender,
            to: recipients,
            subject,
            html,
            category
        })
        .then(console.log)
        .catch(console.error);


    // const report = await mailTransporter.sendMail({
    //     from: '"Support"<support@trelyt.store>',
    //     to: receiverEmail,
    //     subject,
    //     html
    // })

    // return report
}
