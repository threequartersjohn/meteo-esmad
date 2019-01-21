//jello

//vars
const app = require("express")();
const port = process.env.PORT;
const bodyparser = require("body-parser");

//test connection
const connection = require("mongoose");
connection.connect("mongodb://admin:admin2016@ds039301.mlab.com:39301/sd_project");
console.log("connection state: " + connection.connection.readyState);

//bodyparser
app.use(bodyparser.urlencoded({ extended: true }), bodyparser.json());

//rotas
app.use("/", require("./routes.js"));

//serviço de email
require("./assets/scripts/mail.js");

//jwt
require("./assets/scripts/jwt.js");

//schedules
require("./assets/scripts/schedule.js");

//listen 
app.listen(port, () => console.log("listening on " + port));