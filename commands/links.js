var utils = require("../lib/utils.js");
module.exports.run = async (Discord, client, message, commands) => {

  message.channel.send({
    embed: utils.createembed(null, "Our links have been sent to your pms.")
  });
  message.author.send({
    embed: utils.createembed(null, "Some links\nanother link")
  })
}

module.exports.command = {
  name:"links",
  info:"all ours links"
}