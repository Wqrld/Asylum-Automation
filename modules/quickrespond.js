const Discord = require("discord.js");
module.exports = async function(client) {

    const responseObject = {
        "-links": "soon",
        "-discord": "soon",
        "Quick Response 4": ""
    };
    
    // Just saying what to do with the objects above
    console.log("qr init")
    client.on("message", (message) => {
        if (responseObject[message.content]) {
            message.delete()
            //   message.channel.send(responseObject[message.content]);
            console.log(responseObject[message.content]);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .setFooter("Made by Asylum Setups | Wqrld#7373")
                .addField(message.content, responseObject[message.content])
            message.channel.send({
                embed: embed
            });
    
    
    
        }
    });


}
