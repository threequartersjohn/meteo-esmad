//este model não deve ser necessário
const error = require("../assets/scripts/errorMessages/readingsMessages.js")
const db = require("mongoose");

let reading = db.model("Reading", {
    humidity: {
      type: Number,
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    rain:{
        type: Boolean,
        required: true,
        default: false,
    },
    active: {
        type: Boolean,
        required: false,
        default: true,
    },
});

module.exports=  {
    reading: reading,
};