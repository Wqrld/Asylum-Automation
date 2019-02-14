var utils = require("../lib/utils.js");
module.exports.run = async (Discord, client, message, commands) => {

  message.channel.send({
    embed: utils.createembed(null, "Our info has been sent to your pms.")
  });
  message.author.send({
    embed: utils.createembed(null, "blabla, team since 2019")
  })
}

module.exports.command = {
  name:"info",
  info:"all ours links"
}