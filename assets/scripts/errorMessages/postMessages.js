let postMessages = {
    
    //user
    saveUserError: {
        msg: "SaveUserError",
        message: {
            eng: "There was a problem with registration!",
            pt: "Houve um problema com o registo!",
        },
        status: 400,
        success: false,
    },
    saveUserSuccess: {
        msg: "SaveUserSuccess",
        message: {
            eng: "User registered with success!",
            pt: "User registado com sucesso!!",
        },
        status: 200,
        success: true,
    },
    
    //messages
    saveMessageError: {
        msg: "SaveMessageError",
        message: {
            eng: "There was a problem saving your message!",
            pt: "Houve um problema ao gravar a sua mensagem!",
        },
        status: 400,
        success: false,
    },
    saveMessageSuccess: {
        msg: "SaveMessageSuccess",
        message: {
            eng: "Message saved with success!",
            pt: "Mensagem gravada com sucesso!",
        },
        status: 200,
        success: true,
    },
    
    //warnings
    saveWarningError: {
        msg: "SaveWarningError",
        message: {
            eng: "There was a problem saving your warning!",
            pt: "Houve um problema ao gravar o seu aviso!",
        },
        status: 400,
        success: false,
    },
    saveWarningSuccess: {
        msg: "SaveWarningSuccess",
        message: {
            eng: "Warning saved with success!",
            pt: "Aviso gravada com sucesso!",
        },
        status: 200,
        success: true,
    },
    
};

module.exports = {
    messages: postMessages,
};