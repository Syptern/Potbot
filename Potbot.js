const Discord = require("discord.js");

const client = new Discord.Client();

const auth = require("./auth.json");

var potmensen = [];

client.on("ready", () => {
    console.log("de potbot is aan het lopen");
});

client.on("message", (message) => {
    
    
    if(message.author.bot) return;
    
    //in de pot
    if (message.content === 'pot') {
        if (potmensen.includes(message.author) === false) {
            potmensen.push(message.author);
        }
        console.log("ik hoor pot " + potmensen);
        
        //als er al in zit
        
        if (potmensen.length === 1) {
        message.channel.send("ik hoor pot!! " + potmensen + " is in voor een pot, maar de hype is matig :feelsBadMan:");
        }
        
        if (potmensen.length === 2) {
        message.channel.send(potmensen.join(' + ') + " zijn in voor een pot, hmmm miss rl?? :intouchables:" );
        }
        
        if (potmensen.length === 3) {
        message.channel.send(potmensen.join(' + ') + " zijn in voor een pot, altijd gezellig met zn drieen <3 ");
        }
        
        if (potmensen.length === 4) {
        message.channel.send(potmensen.join(' + ') + " zijn in voor een pot, 2v2 rl??? nog 1tje hosselen voor de 5man cs?? zoveel opties :kappaPride: " );
        }
        
        if (potmensen.length >= 5) {
        message.channel.send(potmensen.join(' + ') + " dit wordt een feeeestjeeeee :klok: :klok: ");
        }
            
    }
    
    //uit de pot
    if (message.content === 'geen pot') {
        potmensen.pop(message.author);
        message.channel.send(message.author + " is niet meer hyped voor pot :vato: ..... " + potmensen.join(' + ') + ' zijn nog wel hyped');
        console.log(potmensen);
    }
    
});



client.login("MzY0MTc3NTk5Mzg5MjM3MjQ4.DLL_OA.Wbs-oPaHHS6T3gyfa4K-R9AKpkE");
    
