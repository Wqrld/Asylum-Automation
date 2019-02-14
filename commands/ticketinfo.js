
const fs = require("fs");

module.exports.run = async(Discord, client, message, args) => {
    let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
    var embed = new Discord.RichEmbed()
                .setColor('#36393f')
                .addField(`Info`, tickets[message.channel.id].type + "\n"
                 + tickets[message.channel.id].client +
                  "\n" + tickets[message.channel.id].role +
                   "\n" + tickets[message.channel.id].freelancer + "\n")
                .setTimestamp();
            message.channel.send({
                embed: embed
            })

        //     type: 'comission',
        //     client: user.id,
        //     role: undefined,
        //     payment: undefined,
        //     price: undefined,
        //     freelancer: undefined,
        //     message: undefined,
        //     budget: undefined,
}

module.exports.command = {
    name: "ticketinfo"
}