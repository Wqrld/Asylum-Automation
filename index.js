//Copyright Wqrld#7373, education purposes only. Licensed to Asylum.
const Discord = require("discord.js");
const fs = require("fs");
let tickets = JSON.parse(fs.readFileSync("tickets.json", "utf8"));
var express = require("express");
var app = express();
const client = new Discord.Client();
var paypal = require("paypal-rest-sdk");

var config = require("./config.json");
paypal.configure({
  mode: "live", //sandbox or live
  client_id: config.paypal_client,
  client_secret: config.paypal_secret
});

var commands = new Map();
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)];
};
//time for collectors (in ms)
var ct = 86400000;

const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd",
  MESSAGE_REACTION_REMOVE: "messageReactionRemove"
};
//workaround for reactions
client.on("raw", async event => {
  if (!events.hasOwnProperty(event.t)) return;

  const { d: data } = event;
  const user = client.users.get(data.user_id);
  const channel =
    client.channels.get(data.channel_id) || (await user.createDM());

  if (channel.messages.has(data.message_id)) return;

  const message = await channel.fetchMessage(data.message_id);
  const emojiKey = data.emoji.id
    ? `${data.emoji.name}:${data.emoji.id}`
    : data.emoji.name;
  const reaction = message.reactions.get(emojiKey);

  client.emit(events[event.t], reaction, user);
});

client.on("ready", () => {
  client.user.setActivity("Buy now! -hr", {
    type: "STREAMING",
    url: "https://www.twitch.tv/monstercat"
  });
  console.log(
    `Bot has started, with ${client.users.size} users, in ${
      client.channels.size
    } channels of ` + config.name
  );
});
var utils = require("./lib/utils.js");

//require("./modules/paypalhook.js")(app, client);
//require("./modules/quickrespond.js")(client);
//require("./modules/newsalesrep.js")(client);
//require("./modules/joinmessage.js")(client);
require("./modules/commandloader.js")(client, commands);
require("./modules/reactionclaim.js")(client);
//require("./modules/welcomer.js")(client);
app.listen(1327);

function requestdeadline(user, m) {
  console.log("requestdeadline");
  var embed = new Discord.RichEmbed()
    .setColor(config.color)
    .addField(
      `Order Assistant`,
      "What’s your deadline?\n If you have no deadline say 'no deadline'."
    )
    .setTimestamp();

  m.channel
    .send({
      embed: embed
    })
    .then(function(m) {
      const filter = message => message.author == user;
      const collector = m.channel.createMessageCollector(filter, {
        time: ct
      });
      collector.on("collect", m => {
        //got deadline
        tickets[m.channel.id].deadline = m.content;
        savetickets(tickets);
        collector.stop();

        var embed = new Discord.RichEmbed()
          .setColor(config.color)
          .addField(
            `Order Assistant`,
            "Your request has been sent to our freelancers"
          )
          .setTimestamp();

        m.channel.send({
          embed: embed
        });
        var role;
        var channel = client.channels.get(config.comissionchannel);

        console.log("role:" + tickets[m.channel.id].role);
        if (
          channel.guild.roles.find("name", tickets[m.channel.id].role) !=
          undefined
        ) {
          role = channel.guild.roles
            .find("name", tickets[m.channel.id].role)
            .toString();
        } else {
          role = "undefined";
        }

        var embed = new Discord.RichEmbed()
          .setColor(config.color)
          .setTitle("Commission")
          .setFooter("Made by Asylum Setups | Wqrld#7373")
          //  .setThumbnail(`https://ferox.host/assets/images/logo.png`)
          //.setImage('https://ferox.host/assets/images/logo.png')
          .addField(`Client`, m.author, true)
          .addField(`Request`, tickets[m.channel.id].message)
          .addField(`Budget`, tickets[m.channel.id].budget, true)
          .addField(`Deadline`, tickets[m.channel.id].deadline, true)
          .addField(`Role`, role, true)
          .addField(`ID`, m.channel.name, true)
          //    .addBlankField()
          //     .addField(`Status`, "Awaiting claim")
          .setTimestamp();
        channel
          .send({
            embed: embed
          })
          .then(function(m) {
            channel.send(role);
            m.react("✅");
          });
      });
    });
}

function welcomemsg(username, c, callback) {
  var embed = new Discord.RichEmbed()
    .setColor(config.color)
    .addField(
      `Hey ${username}!`,
      `I will guide you through your ordering process.

        Possible services:

        <@&538889704804712458> 
        <@&538889749558198284> 
        <@&538890174516428820> 
        <@&530680327950303252> 
        <@&538890044467838976> 
        <@&530680328281391105> 
        <@&538889822581030915> 
        <@&530680327950303252>
        <@&538890044467838976>
        <@&538890126336720896>
        <@&538886778577223721>

Please mention the role that matches with the service you need.`
    )
    .setTimestamp();

  c.send({
    embed: embed
  }).then(function(message) {
    callback(message);
  });
}

function savetickets(tickets) {
  fs.writeFile("tickets.json", JSON.stringify(tickets, null, 4));
}
function quicktag(c, message) {
  c.send("<@" + message.author.id + ">").then(function(messy) {
    messy.delete();
  });
}

client.on("message", message => {
  if (message.content == "-comission") {
    message.channel.send("Please specify the role.");
    wizzard({}, message.author, message.channel);
  }
});



function createchannel(message, c) {
  let role = message.guild.roles.find("name", config.CEORole);
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

client.on("messageReactionAdd", (reaction, user) => {
  message = reaction.message;
  message.author = user;

  // if (user.bot) return;
  if (
    reaction.message.channel !=
    reaction.message.guild.channels.find(c => c.id == config.createhrchannel)
  ) {
    return;
  }
  if (reaction.emoji.name !== "🎟" || user.bot) {
    return;
  }
  reaction.remove(user);

  var id = ("" + Math.random() * 1000 + "").substring(0, 4);



  //     if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`This server doesn't have a \`Support Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
  reaction.message.guild.createChannel(`ticket-HR-${id}`, "text").then(c => {
      c.setParent(config.hrchannel);
      createchannel(reaction.message, c);


    
      const embed = new Discord.RichEmbed()
          .setColor(config.color)
          .addField(`HR for ${user.username}`, `Please try explain why you opened this ticket with as much detail as possible. Our **HR team** will be here soon to help.`)
          .setTimestamp();
      c.send({
          embed: embed
      });
  }).catch(console.error); // Send errors to console

  
});










client.on("messageReactionAdd", (reaction, user) => {
  message = reaction.message;
  message.author = user;

  // if (user.bot) return;
  if (
    reaction.message.channel !=
    reaction.message.guild.channels.find(c => c.id == config.createticketchannel)
  ) {
    return;
  }
  if (reaction.emoji.name !== "🎟" || user.bot) {
    return;
  }
  reaction.remove(user);

  //   if (message.guild.channels.exists("name", "ticket-" + utils.shorten(message.author.id))) {
  //     return
  //  }

  initwizard(reaction, user);
});
function initwizard(reaction, user) {
  // red.get("ticketcount" + user.id, function(err, count) {
  //   if (count == null || parseInt(count) < 4) {
  //     if (count == null) {
  //       red.set("ticketcount" + user.id, 1, redis.print);
  //     } else {
  //       red.incr("ticketcount" + user.id, redis.print);
  //     }
      var nid = ("" + Math.random() * 1000 + "").substring(0, 4);
      message.guild
        .createChannel(`ticket-${nid}`, "text", [
          {
            deny: ["SEND_MESSAGES", "READ_MESSAGES"],
            id: message.guild.id
          }
        ])
        .then(c => {
          c.setParent(config.newchannel);

          utils.createchannel(reaction.message, c, function() {
            welcomemsg(reaction.message.author.username, c, function(message) {
              if (!tickets[c.id])
                tickets[c.id] = {
                  type: "comission",
                  client: user.id,
                  role: undefined,
                  payment: undefined,
                  price: undefined,
                  freelancer: undefined,
                  message: undefined,
                  budget: undefined
                };

              savetickets(tickets);
              ticketchannel = message;
              wizzard(reaction, user, c);
            });
          });
        });
  
  
}

function wizzard(reaction, user, c) {
  // Wait for role and requirement
  var userfilter = m => m.author == user;
  var rolecollector = c.createMessageCollector(userfilter, {
    time: ct
  });
  try {
    quicktag(c, reaction.message);
  } catch (err) {}
  rolecollector.on("collect", m => {
    //check if role is mentioned

    console.log(m.mentions.roles);
    if (m.mentions.roles.first() == undefined) {
      m.channel.send("Invalid role");
    } else {
      console.log(m.mentions.roles.first().name);
      rolecollector.stop();
      tickets[m.channel.id].role = m.mentions.roles.first().name;
      savetickets(tickets);
      m.channel.send({
        embed: utils.createembed(
          m.author.username,
          "Please specify your needs now."
        )
      });

      var filter = m => m.author == user;
      var collector = m.channel.createMessageCollector(filter, {
        time: ct
      });
      collector.on("collect", m => {
        if (m.content.length < 1000) {
          collector.stop();

          tickets[c.id].message = m.content;
          savetickets(tickets);

          m.channel
            .send({
              embed: utils.createembed(
                message.author.username,
                "Do you have a budget? Say 'quote' if not, specify it if yes."
              )
            })
            .then(requestbudget(m, user));
        } else {
          m.channel.send(
            "Please use a message under 1000 characters or use https://hastebin.com"
          );
        }
      });
    }
  });
}

function requestbudget(message, user) {
  const filter = m => m.author == user;
  const collector = message.channel.createMessageCollector(filter, {
    time: ct
  });

  collector.on("collect", m => {
    collector.stop();
    tickets[message.channel.id].budget = m.content;

    m.channel
      .send({
        embed: utils.createembed(
          message.author.username,
          "Would you like to pay 50/50 or 100% upfront?\nPlease say `50/50` or `100%`"
        )
      })
      .then(check5050(message, user));
  });
}

function check5050(message, user) {
  const filter = m => m.author == user;
  const collector = message.channel.createMessageCollector(filter, {
    time: ct
  });

  collector.on("collect", m => {
    collector.stop();

    if (m.content.indexOf("5") !== -1) {
      tickets[message.channel.id].payment = "50/50";
    } else {
      tickets[message.channel.id].payment = "100%";
    }
    savetickets(tickets);
    requestdeadline(user, m);
  });
}

client.login(config.bot_token);
