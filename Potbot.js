const Discord = require("discord.js");

const client = new Discord.Client();

const auth = require("./auth.json");

var potmensen = [];

client.on("ready", () => {
    console.log("de potbot is aan het lopen");
});

const status_order = [
  'online',
  'idle',
  'dnd',
  'offline',
];
const status_rank = (status) => status_order.indexOf(status);

client.on("presenceUpdate", (oldMember, newMember) => {
  const old_status = oldMember.presence.status;
  const new_status = newMember.presence.status;

  if (status_rank(old_status) < status_rank(new_status)) {
    // Person got "more offline" (online -> idle, or idle -> offline)
  }
});

client.on("message", (message) => {
    const emoji = (name) => {
      return message.guild.emojis.find("name", name);
    }

    if(message.author.bot) return;

    //in de pot
    if (message.content === 'pot') {
        if (potmensen.includes(message.author) === false) {
            potmensen.push(message.author);
        }
        console.log("ik hoor pot " + potmensen);

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
}});
    



const token = process.argv[2] || "MzY0MTc3NTk5Mzg5MjM3MjQ4.DLL_OA.Wbs-oPaHHS6T3gyfa4K-R9AKpkE";
client.login(token);
