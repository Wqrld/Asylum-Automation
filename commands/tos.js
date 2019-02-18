var utils = require("../lib/utils.js");
var config = require('../config.json');
module.exports.run = async (Discord, client, message, commands) => {

message.channel.send({
  embed: utils.createembed(null, "Our TOS has been sent to your pms.")
});
message.author.send({
  embed: utils.createembed(null, config.tos)
})

}

module.exports.command = {
  name:"tos",
  info:"all ours terms"
}