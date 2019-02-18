
var config = require("../config.json");
module.exports.run = async (Discord, client, message, args) => {



        

  price = message.content.split(" ")[1];
  if(!price){return message.reply("-cut 10")}
var embed = new Discord.RichEmbed()
                .setColor(config.color)
                .setTitle("Cut")
                .setFooter("Made by Asylum Setups | Wqrld#7373")
                .setDescription("Prices in USD")
.addField("Freelancer", price * config.cuts.freelancer)
.addField("sales rep", price * config.cuts.salesrep, true)
.addField("company", price * config.cuts.company, true)
                .setTimestamp();
            message.channel.send({
                embed: embed
            })
};
    



module.exports.command = {
  name:"cut"
}
