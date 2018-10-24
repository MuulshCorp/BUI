const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == 'avatar') {
	let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(empty(member)) {
    	message.reply(member.avatarURL);
    } else {
    	message.reply(message.author.avatarURL);
    }
}
//fin
}
module.exports.help = {
  name: "avatar"
}