const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
var request = require("request");

let rawconfig = fs.readFileSync('config.json');  
let config = JSON.parse(rawconfig);
let token = process.env.TOKEN;


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});

function date() {
  var now     = new Date();
  var annee   = now.getFullYear();
  var mois    = now.getMonth() + 1;
  var jour    = now.getDate();
  var heure   = now.getHours() + 2;
  var minute  = now.getMinutes();
  var seconde = now.getSeconds();
  return "Nous somme le "+jour+"/"+mois+"/"+annee+" et il est "+heure+"h "+minute+"mins "+seconde+"sec";
}


client.on("ready", () => {
  var builogs = 'A cause d\'un crash Bui a été redemarrer.\nInfos : \nUtilisateurs : `'+client.users.size+'`\nSalons : `'+client.channels.size+'`\nServeurs : `'+client.guilds.size+'`\nPréfix : `'+config.prefix+'` \n`'+date()+'` ';
  console.log('BUI IS THE BEST BOT EVER');
  console.log(`Le bot est lancé avec ${client.users.size} utilisateurs, dans ${client.channels.size} salons, de ${client.guilds.size} serveurs. Son préfix est `+config.prefix);
  client.user.setActivity(client.guilds.size+" serveurs | "+client.users.size+" utilisateurs | "+config.prefix+`help`, {type: "WATCHING"});
  nbusers = `${client.users.size}`;
  nbchannels = `${client.channels.size}`;
  nbguilds = `${client.guilds.size}`;
  var buiserv = client.channels.get('486095966143774720');
  var skcy = client.channels.get('486099003981824005');
  var ttatane = client.channels.get('482957401541312525');
  buiserv.send(builogs);
  skcy.send(builogs);
  ttatane.send(builogs);
});

client.on("guildCreate", guild => {
  console.log(`Nouveau serveur rejoint : ${guild.name} (id: ${guild.id}). Ce serveur a ${guild.memberCount} membres!`);
  client.user.setActivity(config.prefix+`help | Aide ${client.guilds.size} serveurs`);
});

client.on("guildDelete", guild => {
  console.log(`J'ai été retirer du serveur : ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(config.prefix+`help | Aide ${client.guilds.size} serveurs`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'accueil');
  if (!channel) return;
  channel.send(`Bienvenue ${member} !`);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'accueil');
  if (!channel) return;
  channel.send(`Aurevoir ${member} !`);
});

client.on("message", async message => {
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

if(message.content.indexOf(config.prefix) !== 0) return;
if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let commandfile = client.commands.get(cmd.slice(config.prefix.length));
  if(commandfile) commandfile.run(client,message,args,command,config,fs,request);

if(command == "levels" || command == "leaderboard" || command == "cookie" || command == "cookieview") {
  message.channel.send('Cette commande n\'est plus disponible pour le moment...');
}

  if(message.content.startsWith === ":inversed_ok_hand:") {
    message.channel.send(':point_left:');
  }

});
client.login(token);
