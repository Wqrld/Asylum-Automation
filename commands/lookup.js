var util = require('util')
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./db.db');
var moment = require('moment');

var paypal = require('paypal-rest-sdk');
var item = require('../item.json');
var config = require('../config.json');
paypal.configure({
    'mode': 'live', //sandbox or live live
    'client_id': config.paypal_client,
    'client_secret': config.paypal_secret
});
module.exports.run = async (Discord, client, message, commands, args) => {

    paypal.invoice.get(message.content.split(" ")[1], function(error, invoice) {
        message.reply("logged");
console.log(invoice);

    });
}

module.exports.command = {
  name:"lookup"
}