const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
const usernameAndPassword = require('./secret');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'vkcky6@gmail.com',
        pass: "oplzzcqyiqmetyrp"
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function (err, template) {
            if (err) { console.log('error in rendering template', err); return }

            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}

// module.exports = ({ env }) => ({
//     transporter: transporter,
//     renderTemplate: renderTemplate,
//     email: {
//         provider: 'nodemailer',
//         providerOptions: {
//             host: env('SMTP_HOST', 'smtp.example.com'),
//             port: env('SMTP_PORT', 587),
//             auth: {
//                 user: env('SMTP_USERNAME'),
//                 pass: env('SMTP_PASSWORD'),
//             },
//             // ... any custom nodemailer options
//         },
//         settings: {
//             defaultFrom: 'hello@example.com',
//             defaultReplyTo: 'hello@example.com',
//         },
//     },
// });