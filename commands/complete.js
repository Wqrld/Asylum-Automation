

const fs = require("fs");

function savetickets() {
  fs.writeFile("tickets.json", JSON.stringify(tickets, null, 4));
}




//red.get("deadline" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
// red.get(
//     "freelancer" + message.channel.name.replace("complete", "ticket"),
//     function(err, freelancer) {

//         red.get(
//             "salesrep" + message.channel.name.replace("complete", "ticket"),
//             function(err, rep) {


//         red.get(
//             "client" + message.channel.name.replace("complete", "ticket"),
//             function(err, client) {


//                     red.get(
//                         "closed" + message.channel.id,
//                         function(err, closed) {
// // if(closed != "tr"){
// //                             red.set("closed" + message.channel.id, "tr", redis.print);
// //                             red.decr("ticketcount" + client, redis.print);
// // }

//                         });


// red.get(
//     "price" + message.channel.name.replace("complete", "ticket"),
//     function(err, price) {
//         //test

//         red.get("paypal." + freelancer, function(err, paypal) {
//             console.log("paypal" + t.freelancer);
//             console.log("price" + message.channel.name + paypal);
//             if (price == null) {
//                 price = "not specified";
//             }
//             if (paypal == null) {
//                 paypal = "not specified";
//             }
module.exports.run = async (Discord, client, message, args) => {
  let config = JSON.parse(fs.readFileSync("config.json", "utf8"));
  let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
  let users = JSON.parse(fs.readFileSync("users.json", "utf8"));
  console.log(message.author.name);
  if (
    message.member.roles.find("name", config.CEORole) == undefined
  ) {
    const embed = new Discord.RichEmbed()
      .setColor(config.color)
      .addField(
        `Hey ${message.author.username}!`,
        `Only a CEO is allowed to execute this command.`
      )
      .setTimestamp();

    message.channel.send({
      embed: embed
    });
    return;
  }

  message.channel.setParent(config.completechannel);


  message.channel.overwritePermissions(
    message.guild.members.find("id", tickets[message.channel.id].client), {
      SEND_MESSAGES: false,
      READ_MESSAGES: false
    }
  );
  const embed = new Discord.RichEmbed()
    .setColor(config.color)
    .addField(`Hey ${message.author.username}!`, `Commission complete.`)
    .setTimestamp();




  var t = tickets[message.channel.id];
  console.log(t)

  embed.addField("Freelancer", "<@" + t.freelancer + ">");

  if (t.rep == undefined) {
    embed.addField("Freelancer", (config.cuts.freelancer + config.cuts.salesrep)* t.price + "$", true);
    embed.addField("Company", config.cuts.company * t.price + "$", true);
  } else {
    embed.addField("Freelancer", config.cuts.freelancer * t.price + "$", true);
    embed.addField("Sales Rep", config.cuts.salesrep * t.price + "$", true);
    embed.addField("Company", config.cuts.company * t.price + "$", true);
  }

  if (!users[message.author.id])
  users[message.author.id] = {
    type: undefined,
    roles: undefined,
    paypal: undefined,
    portfolio: undefined
  };

embed.addField("Freelancer paypal", users[message.author.id].paypal)

  embed.setFooter(t.client);
  message.channel.send({
    embed: embed
  });




  var id = ("" + Math.random() * 1000 + "").substring(0, 4);
  message.channel.setName("complete-" + id);
};

// red.get("message" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
// red.get("freelancer." + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});
// red.get("role" + message.channel.name, function(err, reply) {if(reply != null){message.channel.send(reply);}});

// red.get("freelancer." + message.channel.name, function(err, freelancer) {

// message.channel.send(`<@&518444471936090112>, payouts are needed:\n
// <@` + freelancer + `>`)

// });


module.exports.command = {
  name: "complete"
};