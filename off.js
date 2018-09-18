if(message.content.indexOf(config.prefix) !== 0) return;

if (message.content !== "+levels") {
  request(urlsite + '/levels/save.php?id='+ message.author.id + '&username=' + message.author.username + '&discriminator=' + message.author.discriminator + '&avatar=' + message.author.avatarURL, function(error, response, body) {
  });
}

if(command == "levels") {
  request(urlsite + "/levels/" + message.author.id + '.points', function(error, response, body) {
  let level = Math.floor(0.1 * Math.sqrt(5));
  if(response.statusCode == "200") {  
    message.reply('Vous êtes niveau ' + level + ', et vous avez ' + body +' points d\'expériences. Vos niveaux sont également ici : http://slackercompany.ml/bui/levels/'+message.author.id+'.php');
  } else {
    message.reply('error')
  }
  logs('levels', args);
  });
}

if (!message.content.startsWith(config.prefix) || message.author.bot) return;
logs(message.content, args);

if (command == "leaderboard") {
  const lea = await message.channel.send("Chargement ...");
lea.edit(`Affichage des niveaux de ${nbusers} personnes ! http://slackercompany.ml/bui/leaderboard/`)
};

if(command == "cookie") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply(`Pour voir vos cookies il faut faire +cookieview`);
    if(member.id == message.author.id) {
      return message.channel.send(`Vos cookies sont ici : http://slackercompany.ml/bui/cookie/${message.author.id}.php.`);
    }
  var mec = client.users.get(member.id);

  var username = encodeURI(message.author.username);
  var discriminator = encodeURI(message.author.discriminator);
  var avatarURL = encodeURI(message.author.avatarURL);
  var usernamemec = encodeURI(mec.username);
  var discriminatormec = encodeURI(mec.discriminator);
  var avatarmec = encodeURI(mec.avatarURL);
  request(`${urlsite}/cookie/save.php?username=${usernamemec}&discriminator=${discriminatormec}&avatar=${avatarmec}&id=${member.id}&usernamed=${username}&discriminatord=${discriminator}&idd=${message.author.id}&avatard=${avatarURL}`, function(error, response, body) {
  });
  message.channel.send(`${message.author.username} donne un cookie à ${member} !`);

}

if(command == "cookieview") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply(`Vos cookies sont ici : http://slackercompany.ml/bui/cookie/${message.author.id}.php.`);

  var mec = client.users.get(member.id);

  message.channel.send(`Les cookies de ${mec.username} sont ici : http://slackercompany.ml/bui/cookie/${member.id}.php.`);
}