const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == 'url') {
    message.channel.send('Le site de la Slacker Company : http://SlackerCompany.ml');
}
//fin
}
module.exports.help = {
  name: "url"
}