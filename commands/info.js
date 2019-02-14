var utils = require("../lib/utils.js");

var config = require("../config.json");
module.exports.run = async (Discord, client, message, commands) => {
  message.channel.send({
    embed: utils.createembed(null, "Our info has been sent to your pms.")
  });
  message.author.send({
    embed: utils.createembed(null, config.info)
  });
};

module.exports.command = {
  name: "info",
  info: "all ours links"
};
