const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == "serveur") {
	request('http://lescookies.ml/stats', function (error, response, body) {
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body); 
  if (response && response.statusCode == "404") {
  	message.channel.send('Le serveur est fermé');
  } else {
  	message.channel.send('Le serveur est '+body);
  }
});
}

//fin
}
module.exports.help = {
  name: "serveur"
}