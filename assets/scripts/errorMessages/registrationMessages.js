let registrationMessages = {
    nondescriptError: {
        msg: "NondescriptError",
        message: {
            eng: "There was an error with your registration!",
            pt: "Houve um erro com o seu registo!",
        },
        status: 503,
        success: false,
    },
    duplicateEmail: {
        msg: "DuplicateEmail",
        message: {
            eng: "Your email is already registered!",
            pt: "O seu email já foi registado!",
        },
        status: 409,
        success: false,
    },
    invalidPassword: {
        msg: "InvalidPassword",
        message: {
            eng: "Your password does not fulfill security requisites!",
            pt: "A sua password não prêenche os requisitos de segurança!",
        },
        status: 400,
        success: false,
    },
    emptyEmail: {
        msg: "EmptyEmail",
        message: {
            eng: "You must have an email!",
            pt: "Precisa de ter um email!",
        },
        status: 400,
        success: false,
    },
    emptyPsssword: {
        msg: "EmptyPassword",
        message: {
            eng: "You must have a password!",
            pt: "Precisa de ter uma password!",
        },
        status: 400,
        success: false,
    },
    validRegistration: {
        msg: "RegistrationSuccessful",
        message: {
            eng: "Your registration was successful!",
            pt: "O seu registo foi efectuado com sucesso!",
        },
        status: 200,
        success: true,
    },
    
};

module.exports = {
    messages: registrationMessages,
}