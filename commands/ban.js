const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
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
//fin
}
module.exports.help = {
  name: "ban"
}