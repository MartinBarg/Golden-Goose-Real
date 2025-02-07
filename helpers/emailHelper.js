const nodemailer = require('nodemailer');

const emailHelper = async (to, subject, text) => {
    //Crear el transport
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
            user: "martotester@gmail.com",
            pass: "loyz pyig snlg wquz"
        }
    });
    
    //Seteo las opciones del mail
    let mailOptions = {
        from: "martotester@gmail.com",
        to: to,
        subject: subject,
        text: text
    }

    //Mandar el mail
    try {
        var info = await transporter.sendMail(mailOptions);
        console.log("Email sent " + info.response);
        return info;
    } catch(error) {
        console.error("Error sending email:" + error);
        throw error
    }
}

module.exports = emailHelper;