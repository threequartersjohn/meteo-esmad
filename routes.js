//ROUTING

//router
const express = require("express");
const router = express.Router();
const cors = require("cors");

//controllers
const GET = require("./controllers/get.js");
const POST = require("./controllers/post.js");
const PUT = require("./controllers/put.js");
const DELETE = require("./controllers/delete.js");

//JWT
const JWT = require("./assets/scripts/jwt.js")

//messages
const getMsg = require("./assets/scripts/errorMessages/getMessages.js");

//para permitir envio de headers custom
//tentei com o meu middleware de cors mas não consegui
let corsOptions = {
  exposedHeaders: ["Authorization", "Refresh"]
};
router.use(cors(corsOptions));

//cors
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});

//rotas

//refresh tokens
router.get("/refresh", (req, res) => JWT.refreshToken(req, res));

//testar tokens
router.get("/token", (req, res) => JWT.validateToken(res, req, GET.getAllUsers));

//login
router.post("/login", (req, res) => POST.login(req, res));                                              //working

//passwords
router.get("/password", (req, res)=> GET.getPasswordKeys(req, res))
router.post("/password", (req, res)=>POST.requestNewPasswordChangeKey(req, res));                       //working
router.put("/password/:key", (req, res)=>PUT.updatePassword(req, res));                                 //working

//user
router.get("/users/:id", (req, res) =>  GET.getUser(req, res));                                         //working
//router.get("/users", (req, res) => GET.getAllUsers(req, res));                                          //working
router.post("/users", (req, res) => POST.saveUser(req, res));                                           //working
router.put("/users/del/:id", (req, res) => PUT.logicDeleteUser(req, res));                              //working
//router.delete("/users/all", (req, res) => DELETE.deleteAllUsers(req, res));                             //working
//router.delete("/users/:id", (req, res) => DELETE.deleteUser(req, res));                                 //working

//warnings  
//router.get("/warnings/users/:id", (req, res) => GET.getWarningByUserId(req, res));                      //working
//router.get("/warnings", (req, res) => GET.getWarnings(req,res));                                        //working
router.post("/warnings", (req, res) => POST.saveWarning(req, res));                                     //working
router.put("/warnings/:id", (req, res) => PUT.updateWarning(req, res));                                 //working
router.put("/warnings/del/:id", (req, res) => PUT.logicDeleteWarning(req, res));                        //working
//router.delete("/warnings/all/", (req, res) => DELETE.deleteAllWarnings(req, res));                      //working
//router.delete("/warnings/:id", (req, res) => DELETE.deleteWarning(req, res));                           //working

//messages
//router.get("/messages", (req, res) => GET.getAllMessages(req, res));                                    //working
router.get("/messages/random/weather/:weather", (req, res) => GET.getRandomMessageByWeather(req, res)); //working
router.get("/messages/weather/:weather", (req, res) => GET.getMessagesByWeather(req, res));             //working
router.post("/messages", (req, res) => POST.saveMessage(req, res));                                     //working
//router.put("/messages/:id", (req, res) => PUT.updateMessage(req, res));                                 //working
//router.put("/messages/del/:id", (req, res) => PUT.logicDeleteMessage(req, res));                        //working!                     
//router.delete("/messages/all/", (req, res) => DELETE.deleteAllMessages(req, res));                      //wprlomg
//router.delete("/messages/:id", (req, res) => DELETE.deleteMessage(req, res));                           //wprlomg

//readings
//router.get("/readings", (req, res) => GET.getReadings(req, res));                                       //working
router.get("/readings/recent", (req, res) => GET.getMostRecentReading(req, res));                       //working 
router.get("/readings/upto/:number", (req, res) => GET.getReadingsUpTo(req, res));                      //working!!!!!!
router.post("/readings" ,(req, res)=> POST.saveReading(req, res));                                      //working
router.put("/readings/raining", (req, res)=> PUT.saveRainingReading(req, res));                         //working

module.exports = router;