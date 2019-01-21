//Script para organizar schedules de avisos

const schedule = require("node-schedule");
const GET = require("../../controllers/get.js");
const mail = require("./mail.js");
const warnings = require("../../models/warnings.js");
const readings = require("../../models/readings.js");
const users = require("../../models/users.js");

//Este array mantém em memória os jobs que foram criados para manutenção e edição em runtime
//Como este array existe apenas em runtime, é preciso correr uma função ao iniciar para correr jobs dos warnings que já existem na base de dados
let activeJobs = [];

//Este JSON mantém info dos scheduled jobs em runtime para permitir manupulação tb em runtime desses mesmos jobs!
//Porque é que isto é um Object Literal e não um array? Não sei. Não percebo muito a diferença entre os dois sinceramente.
let warningsList = {};

//Função que faz query à bd
//next segue para a função que trata os dados!
function getExistingWarningsInternal(next){
    
    //procura warnings a partir daqui
    //este controller está aqui para pq é custom para esta funcionalidade
    //e não tem reusabilidade
    warnings.warning.find({},(error, warnings)=>{
        if (error) {
            console.log(error);
            return;
        }
        else {
            warningsList = warnings;
            return next();
        }
    });
}

//Função que vê warnings que já existem on start e cria schedules!
//Ocorre a partir de função de query
function checkExistingWarnings(){
    console.log("Searching existing warnings...");
    
    //esta RecurrenceRule é um objecto de determina a recorrência de um job no node-schedule
    //é muito mais legível do que usar a rule directamente no job
    let rule = new schedule.RecurrenceRule();
    
    //logging de quantos warnings foram encontrados...
    if(warningsList.length>0) console.log(`Found ${warningsList.length} warnings.`);
    else console.log("No warnings found!");
    
    //para cada warning na warningsList...
    for (let item in warningsList) {
        
        //actualizar a RecurrenceRule com as horas e minutos associados ao warning
        rule.hour = warningsList[item].hour;
        rule.minute = warningsList[item].minute;
        
        //criar item que contém o id do warning e o job de node-schedule que lhe está associado
        //assim podemos sempre saber se um dado warning já tem job ou não
        //e agir em concordância
        let job = {
            id: warningsList[item]._id,
            job: new schedule.scheduleJob(rule, ()=>{
                
                //getMostRecentReadingInternal(item, validateWarning);
                testJob();
                
            })
        };
        
        //logging do scheduling de cada job...
        //como corre no início não polui a consola depois da primeira vez!
        console.log(`Scheduled warning with id:${warningsList[item]._id} for ${warningsList[item].hour}:${warningsList[item].minute}.`)
        activeJobs.push(job);
    }
    
}

//Correr função logo quando é feito um require deste script
getExistingWarningsInternal(checkExistingWarnings);


//Função que apanha os warnings, verifica se já existem, e caso existam ou não trata do assunto!
const scheduleWarning = (warning)=>{
    
    console.log("Scheduling warning...")
    
    //variável para saber se um dado job foi encontrado
    let found = false;
    
    //regras para serem usadas no schedule
    let rule = new schedule.RecurrenceRule();
    rule.hour = warning.hour;
    rule.minute = warning.minute;
    
    //procurar se este warning já tem job no array
    for (let item in activeJobs){
        
        //se sim...
        if (item.id == warning._id) {
            
            console.log("edited job")
            //alterar o job para um novo com a nova informação
            item.job =  new schedule.scheduleJob(rule, getMostRecentReadingInternal(warning, validateWarning));
        } 
    }
    
    //se não tiver sido encontrado...
    if (!found) {
        console.log("new job")
        
        //criar novo item com id do warning e novo job
        let job = {
            id: warning._id,
            job: new schedule.scheduleJob(rule, getMostRecentReadingInternal(warning, validateWarning)),
        };
        
        console.log(rule);
        
        //adicionar ao array
        activeJobs.push(job);
    }
    
};

//função para ir buscar o reading mais recente!
//para depois comparar com regras de um dado warning
function getMostRecentReadingInternal(warning, next){
    console.log("a ler warnings")
    
    //esta função ordena negativamente os IDs de cada resultado para obter o último item introduzido!
    readings.reading.findOne({}, {}, {sort: {"_id": -1}}, (error, reading)=>{
        if (error) {
            console.log(error);
            return;
        }
        else {
            return next(warning, reading);
        }
    });
}

//Função que verifica se alguma condição do warning é verificada
const validateWarning = (warning, reading) =>{
    console.log("a validar warning")
    
    if (warning.temp_higher_than > reading.temperature || warning.temp_lower_than < reading.temperature || (warning.if_rain == true && reading.rain == true)) {
        
           users.user.findOne({_id: warning.user_id}, (error, result)=>{
               if (error) console.log("user_id not found!");
               else{
                   mail.sendWarningEmail(result.email, reading.temperature, reading.rain);
               }
           })
           
       }
       
    else console.log("Warning sem efeito!");
    
       
};

module.exports = {
    scheduleWarning: scheduleWarning,
};