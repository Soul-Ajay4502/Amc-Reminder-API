const nodemailer = require("nodemailer");
const twilio = require("twilio");

const transporter = nodemailer.createTransport({
    //   host: "gmail",
    //   port: 587,
    service: "gmail",
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "arajayraj0@gmail.com",
        pass: "uvom baiq natd jlcz",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail({
    to = "rajay5767@gmail.com",
    subject = "Email From AMC-UCC",
    text = "Hello User",
    html = "<b>Hello User</b>",
}) {
    //use comma sparated for multiple to
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: "arajayraj0@gmail.com", // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

const accountSid = "AC0ca972e2e953e72ee98e75b8fc1d4d57";
const authToken = "8d2a9b55e2379db70c764525640703e9";
const client = new twilio(accountSid, authToken);

const sendWhatsAppMessage = async (
    to = "+919846027693",
    message = "from twilio"
) => {
    client.messages
        .create({
            body: message,
            from: "whatsapp:+14155238886",
            to: `whatsapp:${to}`,
        })
        .then((message) => console.log(`Message sent: ${message.sid}`))
        .catch((error) => console.error(`Error sending message: ${error}`));
};

module.exports = { sendMail, sendWhatsAppMessage };
