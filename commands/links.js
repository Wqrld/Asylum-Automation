var utils = require("../lib/utils.js");
var config = require('../config.json');
module.exports.run = async (Discord, client, message, commands) => {

  message.channel.send({
    embed: utils.createembed(null, "Our links have been sent to your pms.")
  });
  message.author.send({
    embed: utils.createembed(null, config.links)
  })
}

module.exports.command = {
  name:"links",
  info:"all ours links"
}