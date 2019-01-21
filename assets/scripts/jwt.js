const fs = require("fs");
const jwt = require("jsonwebtoken");

//KEYS que estão guardadas em ficheiros
const privateKey = fs.readFileSync("./assets/scripts/keys/private.key", "utf-8");
const publicKey = fs.readFileSync("./assets/scripts/keys/public.key", "utf-8");


//opções de criação do JWT para tokens de acesso
const accessSignOptions = {
    expiresIn: "30m",
    algorithm: "RS256",
}

//opções de criação do JWT para tokens de refresh
const refreshSignOptions  = {
    expiresIn: "6h",
    algorithm: "RS256"
}

//opções de verificação do JWT com expire de seis horas
const accessVerifyOptions = {
    expiresIn: "30m",
    algorithm: ["RS256"],
}

//opções de verificação do JWT com expire de seis horas
const refreshVerifyOptions = {
    expiresIn: "6h",
    algorithm: ["RS256"],
}

//autor do token
const author = "EB"

//criar token de refresh
const createRefreshToken = (req) =>{
    
    let token = "";
    
    token = jwt.sign({
        auth: author,                   
        agent: req.headers['user-agent'],
    }, privateKey, refreshSignOptions);
    
    return token;
}

//criar token de acesso
const createAccessToken = (req)=>{
    let token = "";
    
    
    token = jwt.sign({
        auth: author,                   
        agent: req.headers['user-agent'],
    }, privateKey, accessSignOptions);
    
    return token;
}

//validar token
//recebe req, res, e next
//next é a função a correr se validação correr bem
const validateToken = (req, res, next) =>{
    
    //buscar token no header
    let token = req.headers.authorization;
    
    try {
        //verificar se é legit    
        let legit = jwt.verify(token, publicKey, accessVerifyOptions);
        
        console.log(legit);
        
        //testar se token já expirou
        
        if(legit.iat>legit.exp) res.send("token expirado!!")
        
        
        //se legit existir...
        if (legit && legit.auth == author) {
            
            //enviar novo token nos headers
            res.setHeader("Authorization", createAccessToken(req));
            next(req, res);
            
            //ir para next!
            return next(req, res);
        }
        
        //senão dar erro
        else  res.send("erro! autor diferente!");
    } 
    
    //se der erro!
    catch (error) {
        console.log(error);
        res.send("erro em validate!!");
    }
}



//para receber novo token de acesso com token de refresh
//recebe req, res
const refreshToken = (req, res) =>{
    let refreshToken = req.headers.refresh;
    
    try {
        let legit = jwt.verify(refreshToken, publicKey, refreshVerifyOptions);
        
        if (legit && legit.auth == author) {
            res.setHeader("authorization", createAccessToken(req));
            res.setHEader("refresh", createRefreshToken(req));
            res.send("sucesso");
        }
        
        else {
            res.send("erro! autor diferente!")
        }
    }
    
    catch (error){
        console.log(error);
        res.send(error);
    }
};

module.exports={
    createAccessToken: createAccessToken,
    createRefreshToken: createRefreshToken,
    validateToken: validateToken, 
    refreshToken: refreshToken,
};