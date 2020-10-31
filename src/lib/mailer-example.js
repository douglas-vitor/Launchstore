//RENOMEIE ESTE ARQUIVO PARA mailer.js E PREENCHA SUAS CREDENCIAIS ABAIXO PARA USA-LO.

const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "",
        pass: ""
    }
});