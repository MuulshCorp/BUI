const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == 'avatar') {
	message.reply(message.author.avatarURL);
}
//fin
}
module.exports.help = {
  name: "avatar"
}