const nodemailer = require('nodemailer');

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // email service provider
    port: 465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection:false, 
    auth: {
        user: 'thenightbird809@gmail.com', // email address
        pass: 'Rahna@123#', // email password
    },
    tls: {
        rejectUnAuthorized:true
    }
});

// Function to send email
const sendRegistrationEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'thenightbird809@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { sendRegistrationEmail };
