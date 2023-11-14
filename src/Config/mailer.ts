import config from "@/Config/index";
import {MailtrapClient} from "mailtrap";

type TMailPayload = {
    receiverEmail: string, subject: string, html: string, category: string
}

export const sendAMail = async ({
                                    receiverEmail, category, subject, html
                                }: TMailPayload) => {

    const {token} = config.mail

    const sender = config.node_env === 'development' ? {
        email: "hello@trelyt.store",
        name: "Trelyt Support",
    } : {
        email: "hello@dreamfurniturebd.com",
        name: "Dream Furniture Support",
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
}
