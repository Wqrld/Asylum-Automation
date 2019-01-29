module.exports.run = async (Discord, client, message, commands) => {

message.channel.send("Our links have been sent to your pms.");
message.author.send("some links");

}

module.exports.command = {
  name:"links",
  info:"all ours links"
}