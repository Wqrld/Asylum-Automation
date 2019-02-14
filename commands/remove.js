var utils = require("../lib/utils.js");
module.exports.run = async (Discord, client, message, args) => {

        if (!message.channel.name.startsWith(`ticket-`) && !message.channel.name.startsWith(`order-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
        let user = message.guild.member(message.guild.members.find(u => u.name == message.content.split(" ")[1]) || message.mentions.users.first() || message.guild.members.get(message.content.split(" ")[1]));


        if(user == undefined){
            return message.reply("User not found.")
          }
        message.channel.overwritePermissions(user, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        message.channel.send({
          embed: utils.createembed(null, "removed " + user)
        });

    

}

module.exports.command = {
  name:"remove",
  info:"Add someone to your ticket"
}