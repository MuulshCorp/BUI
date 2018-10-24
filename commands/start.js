const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == 'start') {
    message.channel.send({embed: {
    color: 3447003,
    title: `Yo ${message.author.username} !`,
    description: "Voici les Pré-requis !",
    fields: [
      {
        name: "Pré-requis",
        value: 'Un salon pour les messages de Bienvenue : "accueil"'
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Slacker Company"
    }
  }
});

}
//fin
}
module.exports.help = {
  name: "start"
}