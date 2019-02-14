var paypal = require("paypal-rest-sdk");
var config = require("../config.json");
const fs = require("fs");
function savetickets(tickets) {
  fs.writeFile("tickets.json", JSON.stringify(tickets, null, 4));
}
const fetch = require("node-fetch");
paypal.configure({
  mode: "live", //sandbox or live
  client_id: config.paypal_client,
  client_secret: config.paypal_secret
});
var options = {
  subject: "Ticket closed",
  note: "Canceling invoice",
  send_to_merchant: true,
  send_to_payer: true
};

module.exports.run = async function(Discord, client, message, args) {
  let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
  if (
    !message.channel.name.startsWith(`ticket-`) &&
    !message.channel.name.startsWith(`complete-`)
  )
    return message.channel.send(
      `You can't use the close command outside of a ticket channel.`
    );
  // Confirm delete - with timeout (Not command)
  const embed = new Discord.RichEmbed()
    .setColor(0x55acee)
    .setTitle("Close")
    .setFooter("Bot by Wqrld")
    .addField(
      `Are you sure?`,
      `Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, react with ✅.`
    )
    .setTimestamp();
  message.channel
    .send({
      embed: embed
    })
    .then(async function(m) {
      m.react("✅");

      const confirm = (reaction, user) =>
        reaction.emoji.name === "✅" && !user.bot;
      const confirmc = m.createReactionCollector(confirm, {
        time: 30000
      });

      confirmc.on("collect", async function() {
        if (
          message.channel.name.startsWith(`ticket-`) &&
          message.channel.topic != undefined
        ) {
          if (message.channel.topic.indexOf("Paid") === -1) {
            paypal.invoice.get(message.channel.topic, function(error, invoice) {
              if (invoice.status == "SENT") {
                paypal.invoice.cancel(message.channel.topic, options, function(
                  error,
                  rv
                ) {
                  paypal.invoice.del(message.channel.topic, function(
                    error,
                    rv
                  ) {});
                });
              }
            });
          }
        }
        await message.channel
          .fetchMessages({
            limit: 100
          })
          .then(function(messages) {
            messages = messages.array().reverse();
            var newmsgs = "";
            for (i = 0; i < messages.length; i++) {
              newmsgs +=
                messages[i].author.username + ": " + messages[i].content + "\n";
            }
            //should be fine.
            fetch("https://hastebin.com/documents", {
              method: "POST",
              body: newmsgs,
              timeout: 3000
            })
              .then(res => res.json())
              .then(json => {
                var channel = client.channels.get("539549396899987466");
                const embed = new Discord.RichEmbed()
                  .setColor(0x55acee)
                  .setTitle("Ticket closed")
                  .setFooter("Bot by Wqrld")
                  .addField(`Ticket`, message.channel.name)
                  .addField(`Transcript`, "https://hastebin.com/" + json.key)
                  .addField(
                    `Client`,
                    "<@" + tickets[message.channel.id].client + ">"
                  )
                  .setTimestamp();
                channel.send({
                  embed: embed
                });
                tickets[message.channel.id] = undefined;
                savetickets();
                m.channel.delete();
              })
              .catch(err => {
                var channel = client.channels.get("539549396899987466");
                channel.send(
                  "Transcript for " +
                    message.channel.name +
                    ": Hastebin error, is it down?"
                );
                m.channel.delete();
              });
          });
      });
    });
};

module.exports.command = {
  name: "close"
};
