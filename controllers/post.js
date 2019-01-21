//controller para posts
const users = require("../models/users.js");
const warnings = require("../models/warnings.js");
const messages = require("../models/messages.js");
const readings = require("../models/readings.js");
const passwordKeys = require("../models/passwordKeys.js");

const bcrypt = require("bcrypt");
const mail = require("../assets/scripts/mail.js");
const keyGen = require("../assets/scripts/keyGen.js");
const schedule = require("../assets/scripts/schedule.js");
const jwt = require("../assets/scripts/jwt.js");
const msg = require("../assets/scripts/errorMessages/postMessages.js");
const loginMsg = require("../assets/scripts/errorMessages/loginMessages.js");


//LOGIN
const login = (req, res) => {

    //Função BCrypt para validar comaração entre password na db e password no body
    const isValidPassword = (savedPassword, bodyPassword) => {
        return bcrypt.compareSync(bodyPassword, savedPassword);
    };

    //Procurar user por email...
    users.user.findOne({ email: req.body.email.toLowerCase() }, (error, user) => {
        //se não existe dar erro
        if (error || !user) res.send(loginMsg.messages.invalidEmail);

        //se sim...
        else { //comparar passwords!
            if (isValidPassword(user.password, req.body.password)) {
                res.setHeader("Authorization", jwt.createAccessToken(req));
                res.setHeader("Refresh", jwt.createRefreshToken(req));
                res.status(200);
                let data = {
                    id: user._id,
                    admin: user.admin,
                }
                res.send(data);
            }
            else {
                res.send(loginMsg.messages.invalidPassword)
            };
        }
    });
};

//POST para novo user
const saveUser = (req, res) => {

    users.user.findOne({ email: req.body.email }, (error, result) => {
        if (error) res.send(error);
        else {

            if (result) res.send("email já existe!")
            else {

                let newUser = users.user({
                    email: req.body.email.toLowerCase(),
                    password: bcrypt.hashSync(req.body.password, 10, ((error, hash) => { if (!error) return hash })),
                });

                newUser.save((error) => {
                    if (error) {
                        console.log(error);
                        res.send(error.errors);
                    }
                    else {
                        res.status(200);
                        res.send("success");

                    };
                });

            }
        }
    });
}

//Função para request de nova key para mudar de password
const requestNewPasswordChangeKey = (req, res) => {

    //procurar user com o email para obter id
    users.user.findOne({ email: req.body.email }, (error, user) => {
        if (error) res.send(error)
        else {
            //gerar nova password key
            let newPasswordKey = passwordKeys.passwordKey({
                key: keyGen.newKey(),
                user_id: user._id,
            })

            newPasswordKey.save((error) => {
                if (error) res.send(error);
                else {
                    //enviar mail de reposição!
                    mail.sendPasswordKey(newPasswordKey.key, req.body.email);
                    res.status(200)
                    res.send("success");
                }
            })
        }
    })

}

//POST para novo warning
//Faz de PUT tb para salvar problemas às 11 da noite
const saveWarning = (req, res) => {
    
    let newWarning = warnings.warning({
        user_id: req.body.user_id,
        tipo: req.body.tipo,
        hour: req.body.hour,
        minute: req.body.minute,
        active: req.body.active || true,
        temp_lower_than: req.body.temp_lower_than,
        temp_higher_than: req.body.temp_higher_than,
        if_rain: req.body.if_rain,

    });

    warnings.warning.findOne({ user_id: newWarning.user_id }, (error, result) => {
        if (error) res.send(error);
        
        if (result != null) {
            warnings.warning.findOne({user_id: newWarning.user_id}, (error, warning)=>{
            console.log("a actualizar warning existente...")    
                
            if (error) res.send(error);
            //para actualizar apenas os campos que existem no body...
            //ir a cada item que existe no body
            warning.user_id = newWarning.user_id;
            warning.tipo = newWarning.tipo;
            warning.hour = newWarning.hour;
            warning.minute = newWarning.minute;
            warning.active = newWarning.active;
            warning.temp_higher_than = newWarning.temp_higher_than;
            warning.temp_lower_than = newWarning.temp_lower_than;
            warning.if_rain = newWarning.if_rain;
            
            warning.save((error)=>{
                    if (error) res.send(error);
                    else {
                        
                        schedule.scheduleWarning(result);
                        res.send("success");
                    }
                })    
                
            })    
            
            

        }
        else {
            
            console.log("a a gravar novo warning...");

            newWarning.save((error) => {

                if (error) res.send(error);
                else {
                    schedule.scheduleWarning(newWarning);
                    res.send("success");
                };

            });

        }
    })
};

//POST para nova mensagem
const saveMessage = (req, res) => {
    let newMensagem = messages.message({
        message: req.body.message,
        weather: req.body.weather,
    });

    newMensagem.save((error) => {
        if (error) res.send(error)
        else res.send("success")
    })
};

const saveReading = (req, res) => {
    let newReading = readings.reading({
        humidity: req.body.humidity,
        temperature: req.body.temperature,
        rain: req.body.rain,
    });

    newReading.save((error) => {
        if (error) res.send(error);
        else res.send("success");
    })
}

module.exports = {
    login: login,
    saveUser: saveUser,
    saveMessage: saveMessage,
    saveWarning: saveWarning,
    saveReading: saveReading,
    requestNewPasswordChangeKey: requestNewPasswordChangeKey,
};
