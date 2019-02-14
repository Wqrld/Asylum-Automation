var utils = require("../lib/utils.js");
function createchannel(message, c){
            let role = message.guild.roles.find("name", "*");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });

}
let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
module.exports.run = async (Discord, client, message, args) => {

 //const reason = message.content.split(" ").slice(1).join(" ");
 var id = ("" + Math.random() * 1000 + "").substring(0, 4);



        //     if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
        message.guild.createChannel(`ticket-HR-${id}`, "text").then(c => {
            c.setParent(config.hrchannel);
            createchannel(message, c);


            message.channel.send(`:white_check_mark: Your HR ticket has been created, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor('#36393f')
                .addField(`HR for ${message.author.username}`, `Please try explain why you opened this ticket with as much detail as possible. Our **HR team** will be here soon to help.`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error); // Send errors to console

}

module.exports.command = {
  name:"hr"
}