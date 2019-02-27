const fs = require("fs")
    
module.exports.run = async (Discord, client, message, args) => {
  let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  var arg = message.content.split(' ');
  let users = JSON.parse(fs.readFileSync("users.json", "utf8"));
if(arg[1] == undefined){
  message.reply("-paypal (email)");
  return;
}
  if (!users[message.author.id])
  users[message.author.id] = {
    type: undefined,
    roles: undefined,
    paypal: undefined,
    portfolio: undefined
  };
users[message.author.id].paypal = arg[1];


  fs.writeFile("users.json", JSON.stringify(users, null, 4));
var embed = new Discord.RichEmbed()
            .setColor(config.color)
            .addField('Paypal set',
                "paypal set to: " + arg[1])
            .setTimestamp();
        message.channel.send({
            embed: embed
        }).then(function(m){
          setTimeout(function () {
            m.delete()
            message.delete();
          }, 3000)



        });


}

module.exports.command = {
  name:"paypal"
}