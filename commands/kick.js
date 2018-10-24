const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if(command == "kick") {
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS"))
      return message.reply('Vous n\'avez pas la permission `KICK_MEMBERS` !');
    
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Vous devez mentionner un personne valide !");
    if(!member.kickable) 
      return message.reply("Je peut pas expulser cette personne ! J'ai la permission `KICK_MEMBERS` ? "+member.user.tag+" a un role au dessus de moi ?");
    
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "Aucune raison choisie";
    
    await member.kick(reason)
      .catch(error => message.reply(`Désolé ${message.author} Je peut pas expulser cette personne car ${error}`));
    member.createDM().then(channel => {
      return channel.send(`Vous a été kick par ${message.author.tag} du serveur ${message.guild} car ${reason}`);
    }).catch(console.error);
    message.reply(`${member.user.tag} a été expulser par ${message.author.tag} car ${reason}`);
}
//fin
}
module.exports.help = {
  name: "kick"
}