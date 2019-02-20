const Discord = require("discord.js");
var redis = require("redis"),
    red = redis.createClient();
module.exports = function(client) {

   
     //   if (old.roles.find('name', 'Freelancer') == undefined) {
    //     client.on("message", (message) => {
    //         if (!message.guild || message.author.bot) {return};
    //         if (!message.channel.name.startsWith(`ticket-`) && !message.channel.name.startsWith(`complete-`)) {return};
    //         if (message.member.roles.find('name', 'Sales Representative') == undefined) {return};
    //         red.get(
    //             "question" + message.channel.name.replace("complete", "ticket"),
    //             function(err, question) {
    //                 if(question == "true"){
    //         red.get(
    //             "salesrep" + message.channel.name.replace("complete", "ticket"),
    //             function(err, rep) {

    //             if(rep == null){
    //                 message.reply("You have been set as the sales representative for this ticket.")
    //                 red.set("salesrep" + message.channel.name, message.author.id);

    //             }

    //             });
            
    //         };
    //     });
    // });

}