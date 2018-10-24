const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if(command == "say") {
	const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
	if (message.author.id == "372778933839593483") {
		return message.channel.send('Error');
	} else { 
    message.channel.send(sayMessage);
	}
}
//fin
}
module.exports.help = {
  name: "say"
}