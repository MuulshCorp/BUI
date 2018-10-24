const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if(command == "purge") {
  if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES"))
      return message.reply('Tu a la permission `MANAGE_MESSAGES` pour utiliser cette commande ?');
    
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 1 || deleteCount > 150)
      return message.reply("Vous devez donner un nombre entre 2 et 150");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Je ne peux pas effacer les messages car : ${error}`));
}
//fin
}
module.exports.help = {
  name: "purge"
}