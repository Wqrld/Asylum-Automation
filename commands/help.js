module.exports.run = async (Discord, client, message, commands) => {
  var config = require("../config.json");
  const embed = new Discord.RichEmbed()
    .setColor(0x3366ff)
    .setThumbnail(config.logo)
    .setFooter("Made by Asylum Setups | Wqrld#7373");


  embed.setDescription(`
  **Commands**

  **tickets**
  -add
  -remove
  -close
  -hr
  -revert
  -pending
  -complete

  **Freelancer commands**
  -cut
  -paypal
  -portfolio

  **Invoicing**
  -invoice
  -status

  **Info commands**
  -links
  -info
  -tos
  
  **Staff**
  -kick
  -ban
  -mute
  -clear
  -embed
  `);

  message.channel.send({
    embed: embed
  });
};

module.exports.command = {
  name: "help",
  info: "Shows all loaded commands"
};
