let getMessages = {
    noID: {
        msg: "NoID",
        message: {
            eng: "You didn't send an ID!",
            pt: "Não enviou nenhum ID!",
        },
        status: 400,
        success: false,
    },
    invalidID: {
        msg: "InvalidID",
        message: {
            eng: "The ID you sent isn't valid!",
            pt: "O ID que enviou não é válido!",
        },
        status: 400,
        success: false,
    },
};

module.exports = {
    messages: getMessages,
};