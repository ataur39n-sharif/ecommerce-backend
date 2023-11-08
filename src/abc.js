const {MailtrapClient} = require("mailtrap")

const TOKEN = "86eaf7df172f10c9d2200ba5973f4342";
const SENDER_EMAIL = "support@trelyt.store";
const RECIPIENT_EMAIL = "rahman.sharif39n@gmail.com";

const client = new MailtrapClient({token: TOKEN});

client
    .send({
        from: {name: "Mailtrap Test", email: SENDER_EMAIL},
        to: [{email: RECIPIENT_EMAIL}],
        subject: "Hello from Mailtrap!",
        text: "Welcome to Mailtrap Sending!",
    })
    .then(console.log)
    .catch(console.error);