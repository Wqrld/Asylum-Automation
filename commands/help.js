module.exports.run = async (Discord, client, message, commands) => {
  var config = require("../config.json");
  const embed = new Discord.RichEmbed()
    .setColor(0x3366ff)
    .setThumbnail(config.logo)
    .setFooter("Bot by Wqrld");

  var messages = "**Commands**\n";
  for (var [key, value] of commands) {
    messages += key + "\n";
  }
  embed.setDescription(messages);

  message.channel.send({
    embed: embed
  });
};

module.exports.command = {
  name: "help",
  info: "Shows all loaded commands"
};
