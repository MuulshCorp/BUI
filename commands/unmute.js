const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if(command == "unmute") {
  if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")) 
      return message.reply("Vous n'avez pas la permission `MANAGE_CHANNELS` pour utiliser cette commande !");

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
//fin
}
module.exports.help = {
  name: "unmute"
}