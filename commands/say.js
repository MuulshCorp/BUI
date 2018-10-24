const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if(command == "say") {
	if (message.author.id == "372778933839593483" || message.author.id == "317968962656796674") {
		return message.channel.send('Error');
	} else {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
	}
}
//fin
}
module.exports.help = {
  name: "say"
}