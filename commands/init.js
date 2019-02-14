var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');
var moment = require('moment');
let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
module.exports.run = async (Discord, client, message, commands, args) => {
    let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
 if (!message.member.permissions.has("KICK_MEMBERS")) {
            message.reply("This command can onyl be used by staff members");
            message.react('❌');
            return;
        }
        const embed = new Discord.RichEmbed()
        .setColor(0x1edb3e)
        .setTitle(config.name)
        .setFooter("Order")
        .setThumbnail(config.logo)
        //.setImage('https://ferox.host/assets/images/logo.png')
        .addField(`Order` , ` React with 🎟 to open a ticket.`)
        .setTimestamp();
    message.channel.send({
        embed: embed
    }).then(function(m){
m.react("🎟");
//done
    });

}

module.exports.command = {
  name:"init"
}