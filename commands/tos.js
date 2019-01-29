module.exports.run = async (Discord, client, message, commands) => {

message.channel.send("Our TOS has been sent to your pms.");
message.author.send("some doc files");

}

module.exports.command = {
  name:"tos",
  info:"all ours terms"
}