let registrationMessages = {
    wrongType: {
        msg: "WrongType",
        message: {
            eng: "Message has to be of type 'Hot', 'Sun', 'Cold' or 'Rain'!",
            pt: "A Mensagem tem de ser de tipo 'Hot', 'Sun', 'Cold' ou 'Rain'!",
        },
        status: 400,
        success: false,
    },
};

module.exports = {
    messages: registrationMessages,
};