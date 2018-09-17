const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
var request = require("request");
require("opusscript");
const config = require("./data/config.json");

var nbusers;
var nbguilds;
var nbchannels;
var urlsite = 'http://slackercompany.ml/bui';
var builogs = 'A cause d\'un crash Bui a été redemarrer.\nInfos : \nUtilisateurs : `'+client.users.size+'`\nSalons : `'+client.channels.size+'`\nServeurs : `'+client.guilds.size+'`\nPréfix : `'+config.prefix+'` \n`'+date()+'` ';

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
  console.log('BUI IS THE BEST BOT EVER');
  console.log(`Le bot est lancé avec ${client.users.size} utilisateurs, dans ${client.channels.size} salons, de ${client.guilds.size} serveurs. Son préfix est `+config.prefix);
  client.user.setActivity(config.prefix+`help | Aide ${client.guilds.size} serveurs`);
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
  nbusers = `${client.users.size}`;
  nbchannels = `${client.channels.size}`;
  nbguilds = `${client.guilds.size}`;
});

client.on("guildDelete", guild => {
  console.log(`J'ai été retirer du serveur : ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(config.prefix+`help | Aide ${client.guilds.size} serveurs`);
  nbusers = `${client.users.size}`;
  nbchannels = `${client.channels.size}`;
  nbguilds = `${client.guilds.size}`;
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

function logs(command, text) {
  request(urlsite + '/save.php?id='+ message.author.id + '&username=' + message.author.username + '&discriminator=' + message.author.discriminator + '&text=' + text + '&command=' + command + '&date=' + date(), function(error, response, body) {
  });
}
if(message.content.indexOf(config.prefix) !== 0) return;

if (message.content !== "+levels") {
  request(urlsite + '/levels/save.php?id='+ message.author.id + '&username=' + message.author.username + '&discriminator=' + message.author.discriminator + '&avatar=' + message.author.avatarURL, function(error, response, body) {
  });
}

if(command == "levels") {
  request(urlsite + "/levels/" + message.author.id + '.points', function(error, response, body) {
  let level = Math.floor(0.1 * Math.sqrt(5));
  if(response.statusCode == "200") {  
    message.reply('Vous êtes niveau ' + level + ', et vous avez ' + body +' points d\'expériences. Vos niveaux sont également ici : http://slackercompany.ml/bui/levels/'+message.author.id+'.php');
  } else {
    message.reply('error')
  }
  logs('levels', args);
  });
}

if (!message.content.startsWith(config.prefix) || message.author.bot) return;
logs(message.content, args);

if (command == "leaderboard") {
  const lea = await message.channel.send("Chargement ...");
lea.edit(`Affichage des niveaux de ${nbusers} personnes ! http://slackercompany.ml/bui/leaderboard/`)
};

if(command == "bvn") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");
    message.channel.send(`Bienvenue ${member}`);
}

if(command == "bye") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");
    message.channel.send(`Aurevoir ${member}`);
    logs('bye', args);
}

if (command == 'avatar') {
    message.reply(message.author.avatarURL);
}

if (command == 'url') {
    message.channel.send('Le site de la Slacker Company : http://SlackerCompany.ml');
}

if(command == "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    const mySayEdit = message.channel.send(sayMessage);
    logs('say', sayMessage);
}

if(command == "edit") {
    const sayEdit = args.join(" ");
    message.delete().catch(O_o=>{}); 
    mySayEdit.edit(sayEdit);
    logs('Edit', sayEdit);
}

if(command == "ping") {
const ping = require("./ping.js");
ping;
}

if(command == "cookie") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply(`Pour voir vos cookies il faut faire +cookieview`);
    if(member.id == message.author.id) {
      return message.channel.send(`Vos cookies sont ici : http://slackercompany.ml/bui/cookie/${message.author.id}.php.`);
    }
  var mec = client.users.get(member.id);

  var username = encodeURI(message.author.username);
  var discriminator = encodeURI(message.author.discriminator);
  var avatarURL = encodeURI(message.author.avatarURL);
  var usernamemec = encodeURI(mec.username);
  var discriminatormec = encodeURI(mec.discriminator);
  var avatarmec = encodeURI(mec.avatarURL);
  request(`${urlsite}/cookie/save.php?username=${usernamemec}&discriminator=${discriminatormec}&avatar=${avatarmec}&id=${member.id}&usernamed=${username}&discriminatord=${discriminator}&idd=${message.author.id}&avatard=${avatarURL}`, function(error, response, body) {
  });
  message.channel.send(`${message.author.username} donne un cookie à ${member} !`);

}
if(command == "cookieview") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply(`Vos cookies sont ici : http://slackercompany.ml/bui/cookie/${message.author.id}.php.`);

  var mec = client.users.get(member.id);

  message.channel.send(`Les cookies de ${mec.username} sont ici : http://slackercompany.ml/bui/cookie/${member.id}.php.`);

}
if (command == "help") {
message.channel.send({embed: {
    color: 3447003,
    title: `Bonjour ${message.author.username} ! Bui aide actuellement ${client.guilds.size} serveurs !`,
    description: `Voici les liens utiles, Bui aide actuellement ${client.guilds.size} serveurs !`,
    fields: [
      {
        name: "Les Commandes",
        value: config.prefix+"start : Pour connaitre les Pré-requis \n" + 
        config.prefix+"about : A propos du bot \n" + 
        config.prefix+"ping : Pour connaitre la latence \n" + 
        config.prefix+"say : Pour faire parler le bot \n" + 
        config.prefix+"levels : Vos niveaux ! \n" +  
        config.prefix+"leaderboard : Leurs niveaux ! \n" +  
        config.prefix+"purge : Supprime 1 à 150 messages \n" + 
        config.prefix+"kick : Expulse une personne \n" + 
        config.prefix+"ban : Ban une personne \n" +
        config.prefix+"mute : Rend muet une personne \n" + 
        config.prefix+"avatar : Ton avatar en plus grand \n" +
        config.prefix+"stats : Les stats du bot \n" +
        config.prefix+"bvn : Souhaite la Bienvenue\n" +
        config.prefix+"bye : Le message d'Adieu \n" +
        config.prefix+"url : Un lien express pour le site de la Slacker Company \n"
      },
      {
        name: "A propos",
        value: "Je suis un bot créé par Müulsh#4726 !"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});

}

if (command == 'stats') {
    message.channel.send({embed: {
    color: 3447003,
    title: `Hey ${message.author.username} !`,
    description: "Voici les stats !",
    fields: [
      {
        name: "Stats du bot",
        value: `${nbguilds} serveurs \n` + 
        `${nbchannels} salons \n` +
        `${nbusers} utilisateurs`
      },
      {
        name: `Stats du serveur `,
        value: `Le nom du serveur : ${message.guild} \n `
      },
      {
        name: "A propos",
        value: "Je suis un bot créé par Müulsh#4726 !"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});

}

if (command == 'about') {
    message.channel.send({embed: {
    color: 3447003,
    title: `Salut ${message.author.username} !`,
    description: "Voici les infos et les crédits :p",
    fields: [
      {
        name: "Crédits",
        value: "Merci a toute l'équipe de modération du serveur \"le combat trinitaire {RP}\"\n" + 
        "Tu souhaite rejoindre ce serveur RP ? [Zoupla c'est la !](https://discord.gg/7Wz3mka)\n" +
        "Merci a Flotteurpizza43#5404 pour la photo de profil \n"
      },
      {
        name: "Invitation",
        value: `Tu souhaite m'inviter sur un autre serveur ? Voici l'invit : [Clique ici](https://discordapp.com/api/oauth2/authorize?client_id=472890999551557632&permissions=1341652039&scope=bot)`
      },
      {
        name: "Serveurs",
        value: "Tu souhaite rejoindre le serveur de la Slacker Company ? [C'est ici !](https://discord.gg/MNtmkU9)\n" + 
        "Tu souhaite rejoindre le serveur de DevAll ? [C'est par la !](https://discord.gg/JNNeb4B)\n"
      },
      {
        name: "A propos",
        value: "Je suis un bot créé par Müulsh#4726 !"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});

}

if (command == 'start') {
    message.channel.send({embed: {
    color: 3447003,
    title: `Yo ${message.author.username} !`,
    description: "Voici les Pré-requis !",
    fields: [
      {
        name: "Pré-requis",
        value: 'Un salon pour les messages de Bienvenue : "accueil"'
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});

}

if(command == "purge") {
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))
      return message.reply('Tu a la permission MANAGE_MESSAGES pour utiliser cette commande ?');
    
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 1 || deleteCount > 150)
      return message.reply("Vous devez donner un nombre entre 2 et 150");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je ne peux pas effacer les messages car : ${error}`));
    logs('purge', deleteCount);
}

if(command == "mute") {
  if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) 
      return message.reply("Vous n'avez pas la permission `MANAGE_CHANNELS` !");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");

    let reason = args.slice(1).join(' ');
    if(!reason) {
      reason = "Aucune raison choisie";
    }

    if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Je n'ai pas la permission `MANAGE_CHANNELS` !");
      member.createDM().then(channel => {
        return channel.send(`Vous a été mute par ${message.author.tag} du serveur ${message.guild} car: ${reason}`);
      }).catch(console.error);
      message.channel.overwritePermissions(member, { SEND_MESSAGES: false}).then(channel => {
      message.channel.send(`${member.user} est mute sur ${channel} car ${reason}`);
      })
      
  }

if(command == "unmute") {
  if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) 
      return message.reply("Vous n'avez pas la permission `MANAGE_CHANNELS` !");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison choisie";

    if(!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
      return message.channel.send("Je n'ai pas la permission `MANAGE_CHANNELS` !");
      member.createDM().then(channel => {
        return channel.send(`Vous a été unmute par ${message.author.tag} du serveur ${message.guild} car: ${reason}`);
      }).catch(console.error);
      message.channel.overwritePermissions(member, { SEND_MESSAGES: true}).then(channel => {
      message.channel.send(`${member.user} est unmute sur ${channel} car ${reason}`);
      })
      

  }

if(command == "kick") {
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply('Vous n\'avez pas la permission `KICK_MEMBERS` !');
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");
    if(!member.kickable) 
      return message.reply("Je peut pas expulser cette personne ! J'ai la permission `KICK_MEMBERS` ?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison choisie";
    
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je peut pas expulser cette personne car : ${error}`));
    member.createDM().then(channel => {
      return channel.send(`Vous a été kick par ${message.author.tag} du serveur ${message.guild} car: ${reason}`);
    }).catch(console.error);
    message.reply(`${member.user.tag} a été expulser par ${message.author.tag} car : ${reason}`);
    

}
  
if(command == "ban") {
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS"))
      return message.reply('Vous n\'avez pas la permission `BAN_MEMBERS` !');
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");
    if(!member.bannable) 
      return message.reply("Je peut pas bannir cette personne ! J'ai la permission `BAN_MEMBERS` ?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison choisie";
    
    await member.ban(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je peut pas bannir cette personne car : ${error}`));
    member.createDM().then(channel => {
      return channel.send(`Vous a été banni par ${message.author.tag} du serveur ${message.guild} car: ${reason}`);
    }).catch(console.error);
    message.reply(`${member.user.tag} a été banni par ${message.author.tag} car: ${reason}`);
    
}

});
client.login(process.env.TOKEN);