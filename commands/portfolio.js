var utils = require("../lib/utils.js");
const fs = require("fs");
module.exports.run = async (Discord, client, message, commands) => {
  let users = JSON.parse(fs.readFileSync("users.json", "utf8"));


  if(message.mentions.users.first()){
  message.channel.send({
    embed: utils.createembed(null, "Portfolio for " + message.mentions.users.first().username + "\n" + users[message.mentions.users.first().id].portfolio)
  });
  }else if(message.content.split(" ")[1] == "set"){
    if (!users[message.author.id]) users[message.author.id] = {
      type: undefined,
      roles: undefined,
      portfolio: undefined,
    };
   users[message.author.id].portfolio = message.content.split(" ")[2];
    fs.writeFile("users.json", JSON.stringify(users, null, 4));
    message.channel.send({
      embed: utils.createembed(null, "Portfolio set to  " + message.content.split(" ")[2])
    });
  }else{
    message.channel.send({
      embed: utils.createembed(null, "-portfolio @Wqrld\n -portfolio set https://wqrld.net")
    });

  }


}

module.exports.command = {
  name:"portfolio",
  info:"all ours links"
}