//controllers para delete
const users = require("../models/users.js");
const warnings = require("../models/warnings.js");
const messages = require("../models/messages.js");

const msg = require("../assets/scripts/errorMessages/getMessages.js");


//USER
//delete user!!
const deleteUser = (req, res) => {
    users.user.findOneAndDelete({ _id: req.params.id },
        (error) => {
            if (error) res.send(error);
            else res.send("success!");
        })
};

//delete all users
const deleteAllUsers = (req, res)=>{
    users.user.deleteMany({}, (error)=>{
        if(error) res.send(error);
        else res.send("success");
    })
}

//WARNINGS
//delete warning
const deleteWarning = (req, res) => {
    warnings.warning.findOneAndDelete({ _id: req.params.id },
        (error) => {
            if (error) res.send(error)
            else res.send("surresss!!!")
        })
}

//delete ALL warnings
const deleteAllWarnings = (req, res) => {
    warnings.warning.deleteMany({}, (error)=>{
        if(error) res.send(error);
        else res.send("success!!");
    })
}

//MESSAGES
//delete message
const deleteMessage = (req, res) => {
    
    messages.message.findOneAndDelete({ _id: req.params.id },
        (error) => {
            if (error) res.send(error);
            else res.send("success");
        });
};

//Delete ALL messages
const deleteAllMessages = (req, res)=>{
    messages.message.deleteMany({}, (error)=>{
        if(error) res.send(error);
        else res.send("success");
    })
}

module.exports = {
    deleteUser: deleteUser,
    deleteAllUsers: deleteAllUsers,
    deleteWarning: deleteWarning,
    deleteAllWarnings: deleteAllWarnings,
    deleteMessage: deleteMessage,
    deleteAllMessages: deleteAllMessages,
};

