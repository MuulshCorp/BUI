const Discord = require("discord.js");
module.exports.run = async (client, message, args, command, config, fs, request) => {
//mettre la commande ici
if (command == "serveur") {
	request('http://lescookies.ml/stats', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
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