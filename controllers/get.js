//Controller para gets
const users = require("../models/users.js");
const warnings = require("../models/warnings.js");
const messages = require("../models/messages.js");
const readings = require("../models/readings.js");
const passwordKeys = require("../models/passwordKeys.js");

const msg = require("../assets/scripts/errorMessages/getMessages.js");

//função para buscar todos os users
const getAllUsers = (req, res) => {
    users.user.find({}, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });
};

//função para buscar user
const getUser = (req, res) => {
    let id = req.params.id;

    users.user.findById(id, (error, result) => {
        if (error && error.name === "CastError") res.send(msg.messages.invalidID);
        else res.send(result);
    });
};

//função para buscar todos os avisos
const getWarnings = (req, res) => {
    warnings.warning.find({}, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });
};

//função para buscar aviso de user em específico
const getWarningByUserId = (req, res) => {

    warnings.warning.find({ user_id: req.params.id }, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });

};

//função para buscar todas as mensagens
const getAllMessages = (req, res) => {

    messages.message.find({}, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });

};

//função para buscar mensagens de um tipo de weather específico
const getMessagesByWeather = (req, res) => {
    messages.message.find({ weather: req.params.weather }, (error, result) => {
        if (error) res.send(error);
        else res.send(result);
    });
};

//Funçãoq ue envia umam mensagem aletória de um dado weather;
const getRandomMessageByWeather = (req, res)=>{
    messages.message.find({weather: req.params.weather}, (error, result)=>{
        if (error) res.send(error);
        else {
            //contar quantos itens há...
            let count = result.length-1;
            //fazer random
            let random = Math.floor((Math.random() * count) + 1);
            //enviar posição random do json
            res.send(result[random]);
        }
    })
}

//função para buscar todos os readings
const getReadings = (req, res) => {
    
    readings.reading.find({}, (error, result)=>{
        if (error) res.send(error);
        else res.send(result);
    })
    
}

//função para buscar reading mais recente
const getMostRecentReading = (req, res)=>{
    
    //esta função ordena negativamente os IDs de cada resultado para obter o último item introduzido!
    readings.reading.findOne({}, {}, {sort: {"_id": -1}}, (error, result)=>{
        if (error) res.send(error);
        else res.send(result);
    });
    
};

//função para buscar um dado número de readings mais recentes
const getReadingsUpTo = (req, res)=>{
    
    let limit  = parseInt(req.params.number);
    
    readings.reading.find({}, {}, {sort: {"_id": -1}}, (error, result)=>{
        if (error) res.send(error);
        else res.send(result);
    }).limit(limit);
};

const getPasswordKeys = (req, res)=>{
    passwordKeys.passwordKey.find({}, (error, result)=>{
        if (error) res.send(error)
        else res.send(result);
    })
}


module.exports = {
    getUser: getUser,
    getAllUsers: getAllUsers,

    getWarnings: getWarnings,
    getWarningByUserId: getWarningByUserId,

    getAllMessages: getAllMessages,
    getMessagesByWeather: getMessagesByWeather,
    getRandomMessageByWeather: getRandomMessageByWeather,
    
    getReadings: getReadings,
    getMostRecentReading: getMostRecentReading,
    getReadingsUpTo: getReadingsUpTo,
    
    getPasswordKeys: getPasswordKeys,
};

