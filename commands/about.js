const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == 'about') {
    message.channel.send({embed: {
    color: 3447003,
    title: `Salut ${message.author.username} !`,
    description: "Voici les infos et les crédits :p",
    fields: [
      {
        name: "Crédits",
        value: "Merci a toute l'équipe de modération du serveur \"le combat trinitaire {RP}\"\n" + 
        "Tu souhaite rejoindre ce serveur RP ? [Zoupla c'est la !](https://discord.gg/7Wz3mka)\n" +
        "Merci a Flotteurpizza43#5404 pour la photo de profil \n"
      },
      {
        name: "Invitation",
        value: `Tu souhaite m'inviter sur un autre serveur ? Voici l'invit : [Clique ici](https://discordapp.com/api/oauth2/authorize?client_id=472890999551557632&permissions=1341652039&scope=bot)`
      },
      {
        name: "Serveurs",
        value: "Tu souhaite rejoindre le serveur de la Slacker Company ? [C'est ici !](https://discord.gg/MNtmkU9)\n" + 
        "Tu souhaite rejoindre le serveur de DevAll ? [C'est par la !](https://discord.gg/JNNeb4B)\n"
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
  name: "about"
}