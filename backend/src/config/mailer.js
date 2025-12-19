const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "rafelblog21@gmail.com",
        pass: "ohfofjoedxmflpqa"   // tanpa spasi
    }
});

module.exports = transporter;
