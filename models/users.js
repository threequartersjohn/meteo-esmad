//Model de users
const db = require("mongoose");
const error = require("../assets/scripts/errorMessages/registrationMessages.js")

let user = db.model("User", {
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    admin: {
        type: Boolean,
        required: true,
        default: false,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = {
    user: user,
}