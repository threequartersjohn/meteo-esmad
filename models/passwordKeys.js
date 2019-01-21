const error = require("../assets/scripts/errorMessages/messageMessages.js")
const db = require("mongoose");

let passwordKey = db.model("PasswordKey", {
    key: [{
        type: String,
        required: true,
    }],
    user_id: [{
        type: String,
        required: true,
    }]
})

module.exports= {
    passwordKey: passwordKey,
}