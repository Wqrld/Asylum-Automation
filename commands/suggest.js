module.exports.run = async (Discord, client, message, args) => {
chan = message.guild.channels.find(channel => channel.name === 'suggestions');
var reason = message.content.split(" ").slice(1).join(" ")
const embed = new Discord.RichEmbed()
                .setColor(0x292f33)
                .setTitle("suggestion")
                .setFooter("by " + message.author.username)
                .addField(reason, "react to vote")
                .setTimestamp();
       chan.send({
            embed: embed
        }).then(msg => {
            msg.react("👍");
            msg.react("👎")
        })

const newembed = new Discord.RichEmbed()
                .setColor(0x292f33)
                .setTitle("suggestion")
                .setFooter("by " + message.author.username)
                .addField("suggestion created", reason)
                .setTimestamp();
       message.channel.send({
            embed: newembed
        })
}

module.exports.command = {
  name:"suggest23423"
}