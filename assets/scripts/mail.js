const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const messages = require("./errorMessages/emailMessages.js");

const serviceEmail = "meteoesmad@gmail.com";
const serviceEmailPassword = "projetoeb2";


//definir transporter
const transporter = nodemailer.createTransport(smtpTransport({
    service: "Gmail",
    auth: {
        user: serviceEmail,
        pass: serviceEmailPassword,
    },
}));


//Função que verifica se serviço de email 
const verifyService = () => {
    transporter.verify((error, success) => {
        if (error) {
            console.log("Mail Service Error: ", error);
            //res.send(messages.message.noService);
        }
        else console.log("Mail Service Verified");
    });
};

//Função que envia o email!
const sendWarningEmail =(email, temp, rain)=>{
    let content = `Este é o seu aviso da MeteoESMAD. A temperatura é ${temp}C e chuva é ${rain}`;
    
    let mailOptions = {
        from: serviceEmail,
        to: email,
        subject: "MeteoESMAD",
        text: content,
    };
    
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) console.log(error);
        else console.log(`Mail sent: ${info}`);
    });
};


//função para envio de passwor dkey por email
const sendPasswordKey = (passwordKey, email)=>{
    
    //construir rota de troca de password
    let rota = "www.meteoesmad.olev/?key="  + passwordKey;
    
    let content = `O seu link de reposição de password: ${rota}`;
    
    let mailOptions = {
        from: serviceEmail,
        to: email,
        subject: "Reposição de Password - MeteoESMAD",
        text: content,
    };
        transporter.sendMail(mailOptions, (error, info)=>{
        if(error) console.log(error);
        else console.log(`Mail sent:`), console.log(info);
    });
};

verifyService();

module.exports={
    sendWarningEmail: sendWarningEmail,
    sendPasswordKey: sendPasswordKey,
};