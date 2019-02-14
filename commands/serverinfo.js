module.exports.run = async (Discord, bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Info")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Made on", message.guild.createdAt)
    .addField("You joined at", message.member.joinedAt)
    .addField("Member count", message.guild.memberCount);

    message.channel.send(serverembed);
}



module.exports.command = {
  name:"serverinfo"
}