
module.exports.run = async (Discord, client, message, args) => {

if(message.channel.name.startsWith("ticket-")){


    var embed = new Discord.RichEmbed()
    .setColor('#36393f')
    .addField(`Hey ${message.author.username}!`,
        `Ticket set back to new.`)
    .setTimestamp();
  
  message.channel.setParent('539545176281186324')
  
    
  message.channel.send({
        embed: embed
    })
   }

 
}

module.exports.command = {
  name:"revert"
}