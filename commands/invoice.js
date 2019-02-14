var paypal = require("paypal-rest-sdk");
var item = require("../item.json");
const fs = require("fs");
var config = require("../config.json");
const fetch = require("node-fetch");
var redis = require("redis"),
  red = redis.createClient();
function roundUp(num, precision) {
  precision = Math.pow(10, precision);
  return Math.ceil(num * precision) / precision;
}

function savetickets(tickets) {
  fs.writeFile("tickets.json", JSON.stringify(tickets, null, 4));
}

module.exports.run = async (Discord, bot, message, args) => {
  let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
  paypal.configure({
    mode: "live", //sandbox or live live
    client_id: config.paypal_client,
    client_secret: config.paypal_secret
  });
  // if (!tickets[c.id]) tickets[c.id] = {
  //     type: 'comission',
  //     client: user.id,
  //     role: undefined,
  //     payment: undefined,
  //     price: undefined,
  //     freelancer: undefined,
  //     message: undefined,
  //     budget: undefined,
  //   };

  if (
    !message.channel.name.startsWith(`ticket-`) ||
    (!message.member.roles.has("539541517271040010") &&
      !message.member.roles.has("518425575661240320"))
  ) {
    message.channel.send("Only support staff can make invoices.");
    return;
  }

  const email = message.content.split(" ")[1];
  const price = message.content
    .split(" ")
    .slice(2)
    .join(" ");

  if (!email || !price) {
    message.channel.send("usage: `-invoice email price`");
    return;
  }

  if (tickets[message.channel.id].payment != "50/50") {
    if (message.channel.topic != "" && message.channel.topic != null) {
      message.channel.send(
        "a invoice has already been generated:\nhttps://www.paypal.com/invoice/p#" +
          message.channel.topic
      );
      return;
    }
  }

  message.react("✅");
  var prix =
    0 +
    message.content
      .split(" ")
      .slice(2)
      .join(" ")
      .replace(",", ".");
  prix = prix * 1.015;
  prix = prix + 0.3;
  prix = roundUp(prix, 2);
  if (tickets[message.channel.id].payment == "5050") {
    prix = prix / 2;
  }

  item.items[0].name = "Asylum Comission";
  item.billing_info[0].email = parseInt(message.content.split(" ")[1]);
  item.items[0].unit_price.value = prix;
  paypal.invoice.create(item, function(error, invoice) {
    console.log(JSON.stringify(error));
    console.log(invoice);
    paypal.invoice.send(invoice.id, function(error, rv) {
      message.channel.setTopic(invoice.id);

      console.log(error);

      var encoded = invoice.links[4].href.replace("#", "%23");
      let embed = new Discord.RichEmbed()
        .setColor("#7289DA")
        .setTitle("Asylum | Invoice")
        .addField(
          `We have created an invoice with the following amount: **_$${prix},-_**\nPlease pay here:`,
          `https://www.paypal.com/invoice/payerView/details/${invoice.id}`
        )
        //  .addField(`Please read our terms of service:`, "-\n\nBy paying you automatically agree to our TOS")
        .setThumbnail(
          `https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl=${encoded}`
        )
        .setFooter("-status to check payment")
        .setTimestamp();
      message.channel.send({
        embed: embed
      });
      tickets[message.channel.id].price = message.content
        .split(" ")
        .slice(2)
        .join(" ");
      savetickets(tickets);
    });
    //https://github.com/paypal/PayPal-node-SDK/tree/master/samples/invoice
  });
};

module.exports.command = {
  name: "invoice",
  info: "Creates and sends a invoice `-invoice (email) (amount)`"
};
