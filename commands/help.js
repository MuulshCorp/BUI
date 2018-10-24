const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == "help") {
message.channel.send({embed: {
    color: 3447003,
    title: `Bonjour ${message.author.username} ! Bui aide actuellement ${client.guilds.size} serveurs !`,
    description: `Voici les liens utiles, Bui aide actuellement ${client.guilds.size} serveurs !`,
    fields: [
      {
        name: "Les Commandes",
        value: config.prefix+"start : Pour connaitre les Pré-requis \n" + 
        config.prefix+"about : A propos du bot \n" + 
        config.prefix+"ping : Pour connaitre la latence \n" + 
        config.prefix+"say : Pour faire parler le bot \n" + 
        config.prefix+"levels : Vos niveaux ! \n" +  
        config.prefix+"leaderboard : Leurs niveaux ! \n" +  
        config.prefix+"purge : Supprime 1 à 150 messages \n" + 
        config.prefix+"kick : Expulse une personne \n" + 
        config.prefix+"ban : Ban une personne \n" +
        config.prefix+"mute : Rend muet une personne \n" + 
        config.prefix+"avatar : Ton avatar en plus grand \n" +
        config.prefix+"stats : Les stats du bot \n" +
        config.prefix+"url : Un lien express pour le site de la Slacker Company \n"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "BUI - Müulsh#4726 - Slacker Company"
    }
  }
});

}
//fin
}
module.exports.help = {
  name: "help"
}