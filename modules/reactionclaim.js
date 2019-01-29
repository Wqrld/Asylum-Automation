const Discord = require("discord.js");
var redis = require("redis"),
    red = redis.createClient();
const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};
module.exports = async function(client) {

    client.on('raw', async event => {
        if (!events.hasOwnProperty(event.t)) return;
    
        const {
            d: data
        } = event;
        const user = client.users.get(data.user_id);
        const channel = client.channels.get(data.channel_id) || await user.createDM();
    
        if (channel.messages.has(data.message_id)) return;
    
        const message = await channel.fetchMessage(data.message_id);
        const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
        const reaction = message.reactions.get(emojiKey);
    
        client.emit(events[event.t], reaction, user);
    });
    
//t

    client.on('messageReactionAdd', (reaction, user) => {

        if (reaction.message.channel != reaction.message.guild.channels.find(c => c.name == "commissions")) return;

        if (!user.bot && reaction.emoji.name === "✅") {

            
          //  client.channels.get('518433045330526243');
          //  reaction.member.roles.has('518425575136952330')


       
    
            var id = reaction.message.embeds[0].fields[5].value;
            var channel = client.guilds.get('517394741911093268').channels.find(c => c.name == id);

//if(reaction.member.roles.has('518425575136952330')){}

//let channel = reaction.guild.channels.find("name", "@everyone");
console.log(reaction.count)
if(reaction.count > 2){
user.send("This commission was already claimed by someone else.")
reaction.remove(user);
    return;
}



 red.get(
     "role" + channel.name.replace("complete", "ticket"),
     function(err, role) {
         console.log(role)
         console.log(client.guilds.get('517394741911093268').roles.find(r => r.id == role))
     //    console.log(role)
 var crole = client.guilds.get('517394741911093268').roles.find(r => r.name == role).name
 var srole = reaction.message.guild.roles.find(c => c.name == crole)


 let usery = reaction.message.guild.members.find(user => user.id == message.author.id);

 if(usery.roles.has(srole.id)){




            console.log(id + "\n" + channel)
            red.set("freelancer" + reaction.message.channel.name, user.id, redis.print);
            var embed = new Discord.RichEmbed()
                .setColor('#36393f')
                .addField(`Commission claimed`,
                    "<@" + user.id + "> Has claimed your commission.\nPlease discuss a price and when ready type -invoice (email) (amount).")
                .setTimestamp();
            channel.send({
                embed: embed
            })
            red.set("freelancer" + channel.name, user.id, redis.print);
             channel.send("<@" + user.id + ">").then((m) => {
              m.delete();
                 })
            channel.overwritePermissions(user, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
    
         }else{
             reaction.remove(user)
             user.send("You cannot accept this commission as you do not have the required role.")
            }
         });
    }
    
    });




}