//este model não deve ser necessário
const error = require("../assets/scripts/errorMessages/messageMessages.js")
const db = require("mongoose");

let message = db.model("Message", {
    message: [{
        type: String,
        required: true,
    }],
    weather: [{ 
        type: String,
        required: true,
        enum: { //weather tem que ser umd estes quatro valores!! sempre
            values: ["hot", "sun", "cold", "rain"]
        },

    }],
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
});

module.exports = {
    message: message,
};
