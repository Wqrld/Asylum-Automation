const Discord = require("discord.js");
const fs = require("fs");

    function savetickets(tickets) {
        fs.writeFile("tickets.json", JSON.stringify(tickets, null, 4));
      }

module.exports = async function(client) {
    let config = JSON.parse(fs.readFileSync("config.json", "utf8"));

    
//t

    client.on('messageReactionAdd', (reaction, user) => {

        if (reaction.message.channel != reaction.message.guild.channels.find(c => c.id == config.comissionchannel)) return;

        if (!user.bot && reaction.emoji.name === "✅" && config.ticketsenabled) {

            let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
          //  client.channels.get('518433045330526243');
          //  reaction.member.roles.has('518425575136952330')

        //   if (!tickets[c.id]) tickets[c.id] = {
        //     type: 'comission',
        //     client: user.id,
        //     role: undefined,
        //     payment: undefined,
        //     price: undefined,
        //     freelancer: undefined,
        //     message: undefined,
        //     budget: undefined,
        //   };
       
    
            var id = reaction.message.embeds[0].fields[5].value;
            var channel = client.guilds.get(config.guildid).channels.find(c => c.name == id);

//if(reaction.member.roles.has('518425575136952330')){}

//let channel = reaction.guild.channels.find("name", "@everyone");
console.log(reaction.count)
if(tickets[channel.id].freelancer != undefined){
user.send("This commission was already claimed by someone else.")
reaction.remove(user);
    return;
}
 
            console.log(id + "\n" + channel)
           // red.set("freelancer" + reaction.message.channel.name, user.id, redis.print);
            var embed = new Discord.RichEmbed()
                .setColor(config.color)
                .addField(`Commission claimed`,
                    "<@" + user.id + "> Has claimed your commission.\nPlease discuss a price and when ready type -invoice (email) (amount).")
                .setTimestamp();
            channel.send({
                embed: embed
            })
            tickets[channel.id].freelancer = user.id;
            savetickets(tickets);
           // red.set("freelancer" + channel.name, user.id, redis.print);
             channel.send("<@" + user.id + ">").then((m) => {
              m.delete();
                 })
            channel.overwritePermissions(user, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
    
        }
    
    });




}