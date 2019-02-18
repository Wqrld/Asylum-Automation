var utils = require("../lib/utils.js");
var config = require("../config.json");
module.exports.run = async (Discord, client, message, commands) => {
  if (
    message.member.roles.find("name", config.CEORole) == undefined &&
    message.author.id != "541004751786213376"
) {return}
message.delete();
const embed = new Discord.RichEmbed()
            .setColor(config.color)
            .addField(
                message.content.split(" ").splice(1).join(" ").split("|")[0],
                message.content.split(" ").splice(1).join(" ").split("|")[1]
            )
            .setTimestamp()
            .setFooter(message.author.username)

        message.channel.send({
            embed: embed
        });

}

module.exports.command = {
  name:"embed",
}