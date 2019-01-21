let registrationMessages = {
    wrongType: {
        msg: "WrongType",
        message: {
            eng: "Reading has to be of type 'Temperature' or 'Humidity'!",
            pt: "O Reading tem de ser de tipo 'Temperature' ou 'Humidity'!",
        },
        status: 400,
        success: false,
    },
};

module.exports = {
    messages: registrationMessages,
};