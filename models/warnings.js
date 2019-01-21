//Model de warnings

const db = require("mongoose");

let warning = db.model("Warning", {
    user_id: [{
        type: String,
        required: true,
    }],
    tipo: [{
        type: String,
        enum: ["email", "push_notification"],
        required: true,
    }],
    hour: [{
        type: Number,
        required: true,
        min: 0,
        max: 24,
    }],
    minute: [{
        type: Number,
        required: false,
        default: 0,
        min: 0,
        max: 60
    }],
    active: [{
        type: Boolean,
        required: true,
        default: true,
    }],
    temp_higher_than: [{
        type: Number,
        required: false,
        default: null,
    }],
    temp_lower_than: [{
        type: Number,
        required: false,
        default: null,
    }],
    if_rain: [{
        type: Boolean,
        required: false,
        default: false,
    }],
});

module.exports = {
    warning: warning,
};