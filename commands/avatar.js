const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == 'avatar') {
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member) {
      return message.reply(member.avatarURL);
    } else {
    	return message.reply(message.author.avatarURL);
    }
}
//fin
}
module.exports.help = {
  name: "avatar"
}