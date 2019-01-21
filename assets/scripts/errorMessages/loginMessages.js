let loginMessages = {
    nondescriptError: {
        msg: "NondescriptError",
        message: {
            eng: "There was an error with your login!",
            pt: "Houve um erro com o seu login!",
        },
        status: 503,
        success: false,
    },
    invalidEmail: {
        msg: "EmailNotFound",
        message: {
            eng: "Your email wasn't found!",
            pt: "O seu email não foi encontrado!",
        },
        status: 400,
        success: false,
    },
    invalidPassword: {
        msg: "IncorrectPassword",
        message: {
            eng: "Your password isn't correct!",
            pt: "A sua password não está correta!",
        },
        status: 400,
        success: false,
    },
    validLogin: {
        msg: "LoginSuccessful",
        message: {
            eng: "Login Successful!",
            pt: "Login realizado com sucesso!",
        },
        status: 200,
        success: true,
    },
};

module.exports = {
    messages: loginMessages,
};