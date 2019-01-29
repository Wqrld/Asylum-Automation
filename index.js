//Copyright Wqrld#7373, education purposes only. Licensed to Asylum.
const Discord = require("discord.js");
var redis = require("redis"),
  red = redis.createClient();
let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
var express = require('express')
var app = express()
const client = new Discord.Client();
var paypal = require('paypal-rest-sdk');
const fs = require("fs");
var config = require('./config.json');
paypal.configure({
  'mode': 'live', //sandbox or live
  'client_id': config.paypal_client,
  'client_secret': config.paypal_secret
});


var commands = new Map();
Array.prototype.random = function() {
  return this[Math.floor((Math.random() * this.length))];
}
//time for collectors (in ms)
var ct = 86400000

client.on("ready", () => {
  client.user.setActivity("Buy now! >buy", {
    type: 'STREAMING',
    url: "https://www.twitch.tv/monstercat"
  });
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ` + config.name);
});
var utils = require("./lib/utils.js");

//require("./modules/paypalhook.js")(app, client);
//require("./modules/quickrespond.js")(client);
//require("./modules/newsalesrep.js")(client);
//require("./modules/joinmessage.js")(client);
require("./modules/commandloader.js")(client, commands);
//require("./modules/reactionclaim.js")(client);
//require("./modules/welcomer.js")(client);
app.listen(1327);

var status = {
  "Wqrld": {
    "message": "",
    "budget": ""

  }
};


function requestdeadline(user, m) {
  console.log("requestdeadline")
  var embed = new Discord.RichEmbed()
    .setColor('#36393f')
    .addField(`Order Assistant`,
      "What’s your deadline?\n If you have no deadline say 'no deadline'.")
    .setTimestamp();

  m.channel.send({
    embed: embed
  }).then(function(m) {
    const filter = message => message.author == user;
    const collector = m.channel.createMessageCollector(filter, {
      time: ct
    });
    collector.on('collect', m => {
      //got deadline
      status[user.id]["deadline"] = m.content;
      red.set("deadline" + m.channel.name, m.content, redis.print);
      collector.stop()

      var embed = new Discord.RichEmbed()
        .setColor('#36393f')
        .addField(`Order Assistant`,
          "Your request has been sent to our freelancers")
        .setTimestamp();

      m.channel.send({
        embed: embed
      })
      var role;
      var channel = client.channels.get('539834479267545088');

      console.log("role:" + status[user.id]["role"]);
      if (channel.guild.roles.find('name', status[user.id]["role"]) != undefined) {
        role = channel.guild.roles.find('name', status[user.id]["role"]).toString()
      } else {
        role = "undefined"
      }

      var embed = new Discord.RichEmbed()
        .setColor(0xdd2e44)
        .setTitle("Commission")
        .setFooter("Bot by Wqrld#7373")
        //  .setThumbnail(`https://ferox.host/assets/images/logo.png`)
        //.setImage('https://ferox.host/assets/images/logo.png')
        .addField(`Client`, m.author, true)
        .addField(`Request`, status[user.id]["message"])
        .addField(`Budget`, status[user.id]["budget"], true)
        .addField(`Deadline`, status[user.id]["deadline"], true)
        .addField(`Role`, role, true)
        .addField(`ID`, m.channel.name, true)
        //    .addBlankField()
        //     .addField(`Status`, "Awaiting claim")
        .setTimestamp();
      channel.send({
        embed: embed
      }).then(function(m) {
        channel.send(role)
        m.react("✅");
      });


    })
  })
}

function welcomemsg(username, c, callback) {
  var embed = new Discord.RichEmbed()
    .setColor('#36393f')
    .addField(`Hey ${username}!`,
      `I will guide you through your ordering process.

        Possible services:

        <@&539551691222155274> 
        <@&539551739746058375> 
        <@&539551781567332353> 
        <@&539551826014371840> 
        <@&539551869450846218> 
        <@&539551912597520395> 
        <@&539552006130499594> 
        <@&539552218454425620>

Please mention the role that matches with the service you need.`)
    .setTimestamp();

  c.send({
    embed: embed
  }).then(function(message) {
    callback(message);
  })
}

function savetickets() {
  fs.writeFile("tickets.json", JSON.stringify(tickets, null, 4));
}

client.on('messageReactionAdd', (reaction, user) => {
  status[user.id] = {};
  message = reaction.message;
  message.author = user;

  // if (user.bot) return;
  if (reaction.message.channel != reaction.message.guild.channels.find(c => c.name == "create-a-ticket")) {
    return
  };
  if (reaction.emoji.name !== "🎟" || user.bot) {
    return
  }
  reaction.remove(user);
  var nid = ("" + Math.random() * 1000 + "").substring(0, 4);
  //   if (message.guild.channels.exists("name", "ticket-" + utils.shorten(message.author.id))) {
  //     return
  //  }


  red.get(
    "ticketcount" + user.id,
    function(err, count) {
      if (count == null || parseInt(count) < 4) {
        if (count == null) {
          red.set("ticketcount" + user.id, 1, redis.print);
        } else {
          red.incr("ticketcount" + user.id, redis.print);
        }
        message.guild.createChannel(`ticket-${nid}`, "text", [{
          deny: ['SEND_MESSAGES', 'READ_MESSAGES'],
          id: message.guild.id


        }]).then(c => {
          c.setParent('539545176281186324');

          utils.createchannel(reaction.message, c, function() {

            welcomemsg(reaction.message.author.username, c, function(message) {

              if (!tickets[c.id]) ticket[c.id] = {
                type: 'comission',
                client: user.id,
                role: undefined,
                payment: undefined,
                price: undefined,
                freelancer: undefined,
                message: undefined,
                budget: undefined,
              };


              savetickets();
              ticketchannel = message;

              // Wait for role and requirement
              var userfilter = m => m.author == user;
              var rolecollector = message.channel.createMessageCollector(userfilter, {
                time: ct
              });

              c.send("<@" + reaction.message.author.id + ">").then(function(messy) {
                messy.delete();

              })

              rolecollector.on('collect', m => {

                //check if role is mentioned

                console.log(m.mentions.roles);
                if (m.mentions.roles.first() == undefined) {
                  m.channel.send("Invalid role");
                } else {
                  console.log(m.mentions.roles.first().name)
                  rolecollector.stop();
                  status[user.id]["role"] = m.mentions.roles.first().name
                  tickets[c.id].role = m.mentions.roles.first().name;

                  m.channel.send({
                    embed: utils.createembed(message.author.username, "Please specify your needs now.")
                  })

                  var filter = m => m.author == user;
                  var collector = message.channel.createMessageCollector(filter, {
                    time: ct
                  });
                  collector.on('collect', m => {

                    if (m.content.length < 1000) {
                      collector.stop();

                      status[user.id]["message"] = m.content
                      tickets[c.id].message = m.content;

                      m.channel.send({
                        embed: utils.createembed(message.author.username, "Do you have a budget? Say 'quote' if not, specify it if yes.")
                      }).then(function(m) {

                        const filter = m => m.author == user;
                        const collector = message.channel.createMessageCollector(filter, {
                          time: ct
                        });


                        collector.on('collect', m => {
                          collector.stop();
                          status[user.id]["budget"] = m.content;
                          tickets[c.id].budget = m.content;

                          m.channel.send({
                            embed: utils.createembed(message.author.username, "Would you like to pay 50/50 or 100% upfront?\nPlease say `50/50` or `100%`")
                          }).then(function(m) {

                            const filter = m => m.author == user;
                            const collector = message.channel.createMessageCollector(filter, {
                              time: ct
                            });

                            collector.on('collect', m => {
                              collector.stop();

                              if (m.content.indexOf("5") !== -1) {
                                tickets[c.id].payment = "50/50";

                              } else {
                                tickets[c.id].payment = "100%";
                              }

                              requestdeadline(user, m);
                            });


                          });


                        });

                      });
                    } else {
                      m.channel.send("Please use a message under 1000 characters or use https://hastebin.com")
                    }

                  });

                }

              })
            });


          });


        });

      } else {
        user.send("You already have too many tickets opened.")
      }
    });
});




client.login(config.bot_token);