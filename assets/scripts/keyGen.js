//script para gerar chaves aletórias
//este código tem-me safado tantas vezes omg

//função que gera nova key para reposição de password
function randomPasswordRequestPath(){
    
    //possíveis caracteres
    //ter cuidado com caracteres por causa do encoding de URLs
    let possibleChars = "abcdefghijklmnoprstuvwxyzABCDEFGHIJKLMOPQRSTUVWXYZ1234567890";
    
    //tamanho da key, não há preocupação em exagerar
    let pathSize = 100;
    let path = "";
    
    //geração da chave
    for (let x = 0; x < pathSize; x++) {
        path += possibleChars.charAt(parseInt(Math.floor((Math.random()*possibleChars.length))));
    }

    return path;

}

module.exports = {
    newKey: randomPasswordRequestPath
};

