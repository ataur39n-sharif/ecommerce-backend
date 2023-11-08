import nodemailer from "nodemailer"
import config from "@/Config/index";

type TMailPayload = {
    receiverEmail: string, subject: string, html: string, category: string
}

const mailTransporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    auth: {
        user: 'support@trelyt.store',
        pass: config.mail.auth.password
    }
});

export default mailTransporter


export const sendAMail = async ({
                                    receiverEmail, category, subject, html
                                }: TMailPayload) => {

    // const {token, endpoint} = config.mail
    // const sender = {
    //     email: "support@trelyt.store",
    //     name: "Trelyt Support",
    // };
    // const recipients = [
    //     {
    //         email: receiverEmail,
    //     }
    // ];
    // const options = {
    //     method: 'POST',
    //     url: 'https://send.api.mailtrap.io/api/send',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //         'Api-Token': '86eaf7df172f10c9d2200ba5973f4342'
    //     },
    //     data: {
    //         to: recipients,
    //         from: sender,
    //         subject,
    //         text: 'Congratulations on your order no. 1234',
    //         // html
    //     }
    // };
    // let data = JSON.stringify({
    //     "to": [
    //         {
    //             "email": "edhcu@mailto.plus",
    //             "name": "John Doe"
    //         }
    //     ],
    //     "from": {
    //         "email": "support@trelyt.store",
    //         "name": "Support"
    //     },
    //     "subject": "Your Example Order Confirmation",
    //     "text": "Congratulations on your order no. 1234",
    //     "category": "API Test"
    // });
    //
    // let config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: 'https://send.api.mailtrap.io/api/send',
    //     headers: {
    //         'Api-Token': '86eaf7df172f10c9d2200ba5973f4342',
    //         'Content-Type': 'application/json'
    //     },
    //     data: data,
    // };
    //
    // axios.request(config)
    //     .then((response) => {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // return axios.post('https://send.api.mailtrap.io/api/send', {
    //     to: recipients,
    //     from: sender,
    //     subject,
    //     html
    // }, {
    //     headers: {
    //         "Content-Type": "application/json",
    //         Accept: 'application/json',
    //         'Api-Token': token,
    //     }
    // });

    const report = await mailTransporter.sendMail({
        from: '"Support"<support@trelyt.store>',
        to: receiverEmail,
        subject,
        html
    })

    return report

}
