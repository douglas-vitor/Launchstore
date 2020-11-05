const nodemailer = require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ddbe9e7047fa79",
        pass: "b2b5b5ebddb03e"
    }
});
