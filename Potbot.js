const request = require('request');

const Discord = require("discord.js");

const client = new Discord.Client();

const auth = require("./auth.json");

var potmensen = [];

var btcprijs;

var ethprijs;

var meta;

const update_prices = () => client.user.setGame(btcprijs + ' - ' + ethprijs)

function requestBTC() {
    request.get('https://api.bitfinex.com/v1/pubticker/BTCUSD', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        let nieuwe_btcprijs = JSON.stringify(JSON.parse(body).mid);
        btcprijs = nieuwe_btcprijs
    }
})}

function requestETH() {
    request.get('https://api.bitfinex.com/v1/pubticker/ETHUSD', (error, response, body) => {
    if (!error && response.statusCode == 200) {
        let nieuwe_ethprijs = JSON.stringify(JSON.parse(body).mid);
        ethprijs = nieuwe_ethprijs
    }
})}

client.on("ready", () => {
    console.log("de potbot is aan het lopen");
});

client.on("message", (message) => {
    const emoji = (name) => {
      return message.guild.emojis.find("name", name);
    }

    if(message.author.bot) return;

    if(message.content === 'hoeveel is 1 btc waard?') {
       message.channel.send(btcprijs + ' usd');
    }
    if (message.content === 'wat is de meta?') {
        message.channel.send('StickFightTheGame');
    }
    //in de pot
    if (message.content === 'pot') {
        if (potmensen.includes(message.author) === false) {
            potmensen.push(message.author);
        }
        console.log("ik hoor pot " + message.author);

        //als er al in zit

        if (potmensen.length === 1) {
        message.channel.send(`ik hoor pot!! ${potmensen[0]} is in voor een pot, maar de hype is matig ${emoji('feelsBadMan')}`);
        }

        if (potmensen.length === 2) {
        message.channel.send(potmensen.join(' + ') + ` zijn in voor een pot, hmmm miss rl?? ${emoji('intouchables')}`);
        }

        if (potmensen.length === 3) {
        message.channel.send(potmensen.join(' + ') + " zijn in voor een pot, altijd gezellig met zn drieen <3 ");
        }

        if (potmensen.length === 4) {
        message.channel.send(potmensen.join(' + ') + ` zijn in voor een pot, 2v2 rl??? nog 1tje hosselen voor de 5man cs?? zoveel opties ${emoji('kappaPride')}`);
        }

        if (potmensen.length >= 5) {
        message.channel.send(potmensen.join(' + ') + ` dit wordt een feeeestjeeeee ${emoji('klok')} ${emoji('klok')}`);
        }

    }

    //uit de pot
    if (message.content === 'geen pot') {
        potmensen = potmensen.filter(mens => mens !== message.author);

        if (potmensen.length === 0) {
            message.channel.send('niemand is meer hyped voor een pot')};

        if (potmensen.length === 1) {
            message.channel.send(message.author + ` is niet meer hyped voor pot ${emoji('vato')} ..... ` + potmensen.join(' + ') + ' is in zijn eentje nog wel hyped');
        if (potmensen.length >= 2) {
             message.channel.send(message.author + ` is niet meer hyped voor pot ${emoji('vato')} ..... ` + potmensen.join(' + ') + ' zijn nog wel hyped');
        }
    }
}

    if (message.content === 'pot status') {
        message.channel.send('Mensen die in zijn voor een pot: ' + potmensen.join(' + '));
    }
});


client.on("presenceUpdate", (oldMember, newMember) => {
    console.log(potmensen[0]);
    if (oldMember.presence.status === 'online' && ['idle', 'offline'].includes(newMember.presence.status)) {
        console.log('status verandering' + oldMember + potmensen[0]);
        const generalchannel = client.channels.get("364004159847923714")
        generalchannel.send(newMember + ' is van online naar idle of offline gegaan en uit de pot gehaald');
        potmensen = potmensen.filter(mens => mens.username !== oldMember.username);
    }
});

setInterval(() => {
  requestBTC();
  requestETH();
  if (btcprijs && ethprijs) update_prices();
}, 5000);

const token = process.argv[2] || auth.token;
client.login(token);
