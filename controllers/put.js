//controllers para put
const users = require("../models/users.js");
const warnings = require("../models/warnings.js");
const messages = require("../models/messages.js");
const readings = require("../models/readings.js");
const passwordKeys = require("../models/passwordKeys.js");


const bcrypt = require("bcrypt");
const schedule = require("../assets/scripts/schedule.js");
const msg = require("../assets/scripts/errorMessages/getMessages.js");


//USER
//update password
// const updateUser = (req, res) => {
//     users.user.findOneAndUpdate({ _id: req.params.id }, { password: req.body.password }, { runValidators: true },
//         (error) => {
//             if (error) res.send(error);
//             else {
//                 res.send("success");
//             }
//         });
// };

//Update password com key!
const updatePassword = (req, res) => {
    console.log(`key: ${req.params.key}`);
    console.log(`password: ${req.body.password}`);

    //procurar chave para obter user id associado...
    passwordKeys.passwordKey.findOne({ key: req.params.key }, (error, key) => {
        if (error) res.send(error)
        else {

            //se encontrar, mudar a password!
            users.user.findOneAndUpdate({ _id: key.user_id }, { password: bcrypt.hashSync(req.body.password, 10, ((error, hash) => { if (!error) return hash })) }, (error, success) => {
                if (error) res.send(error);
                else {
                    //apagar a entry com o key
                    passwordKeys.passwordKey.findOneAndDelete({ key: key.key }, (error, success) => {
                        if (error) res.send(error);
                        else res.send("success");
                    })
                };
            })
        }
    })
}

//delete lógico de users
const logigDeleteUser = (req, res) => {

    users.user.findOneAndUpdate({ _id: req.params.id }, { active: false },
        (error) => {
            if (error) res.send(error);
            else {
                res.send("success");
            }
        });

};


//update de warning
const updateWarning = (req, res) => {

    warnings.warning.findById(req.params.id, (error, warning) => {
        if (error) res.send(error)
        else {

            //para actualizar apenas os campos que existem no body...
            //ir a cada item que existe no body
            for (let item in req.body) {

                //procurar se warning que se encontrou na query anterior tem uma chave com o mesmo nome
                //procurar se igual a null pq null também resolve falso, e queremos evitar isso
                if (warning[item] || warning[item] == null) {
                    //se sim, copiar valor da chave com o mesmo nome
                    warning[item] = req.body[item];
                }
            }

            warning.save((error) => {
                if (error) res.send(error);
                else {
                    schedule.scheduleWarning(warning);
                    res.send("success");
                }
            })
        }
    })
};

const logicDeleteWarning = (req, res) => {

    warnings.warning.findOneAndUpdate({ _id: req.params.id }, { active: false },
        (error) => {
            if (error) res.send(error);
            else res.send("success");
        });

};

const updateMessage = (req, res) => {

    messages.message.findById({ _id: req.params.id }, (error, message) => {
        if (error) res.send(error);
        else {
            for (let item in req.body) {
                if (message[item] || message[item] == null) {
                    message[item] = req.body[item];
                }
            }

            message.save((error) => {
                if (error) res.send(error);
                else res.send("success");
            });
        }
    });

};

const logicDeleteMessage = (req, res) => {

    messages.message.findOneAndUpdate({ _id: req.params.id }, { active: false },
        (error) => {
            if (error) res.send(error);
            else res.send("success");
        });

};


const saveRainingReading = (req, res) => {
    if (req.body.rain == true) {

        readings.reading.findOne({}, {}, { sort: { "_id": -1 } }, (error, reading) => {
            if (error) res.send(error);
            else {
                reading.rain = true;
                reading.save((error) => {
                    if (error) res.send(error);
                    else res.send("success");
                })
            }
        });
    }
}

module.exports = {
    //updateUser: updateUser,
    logigDeleteUser: logigDeleteUser,
    updateWarning: updateWarning,
    logicDeleteWarning: logicDeleteWarning,
    updateMessage: updateMessage,
    logicDeleteMessage: logicDeleteMessage,

    updatePassword: updatePassword,
    saveRainingReading: saveRainingReading,
};
