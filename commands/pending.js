const fs = require("fs");
module.exports.run = async (Discord, client, message, args) => {
  let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  if (message.channel.topic != undefined) {
    message.channel.setParent(config.pendingchannel);

    const embed = new Discord.RichEmbed()
      .setColor("#36393f")
      .addField(
        `Hey ${message.author.username}!`,
        `Thanks for your payment. Our freelancer will get started now`
      )
      .setTimestamp();

    message.channel.send({
      embed: embed
    });
  } else {
    const embed = new Discord.RichEmbed()
      .setColor("#36393f")
      .addField(
        `Hey ${message.author.username}!`,
        `Please pay first using -invoice`
      )
      .setTimestamp();

    message.channel.send({
      embed: embed
    });
  }
};

module.exports.command = {
  name: "pending"
};
