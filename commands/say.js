const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if(command == "say") {
	if (message.author == "372778933839593483") {
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