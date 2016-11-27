var request = require('request-promise');
var config = require('../config.json');
var format = require('../utils/discord_format.js');

var ygo_api = {
    data: 'http://yugiohprices.com/api/card_data/',
    image: 'http://yugiohprices.com/api/card_image/'
}

function run(msg) {

    if((msg.content.indexOf('{') > -1) && (msg.content.indexOf('}') > -1)) {

        var card = msg.content.match(/{(.*?)}/)[1];

        getCardDataFromName(card, data => {
            msg.channel.sendMessage(formatReply(data));
            console.log("Saebot: YGO_API - Card Processed: " + data.name);
        });

    }

}

function runCommand(msg, suffix) {

    getCardDataFromName(suffix, data => {
        msg.channel.sendMessage(formatReply(data));
        console.log("Saebot: YGO_API - Card Processed: " + data.name);
    });

}

//USAGE: card's exact name into -> function
function getCardDataFromName(card_name, callback) {

    request({
        uri: ygo_api.data + card_name,
        json: true
    })
        .then(function (body) {
            callback(body.data);
        })
            .catch(function (err) {
                return;
            });

}

function getCardImageFromName(card_name) {

}

function getCardPriceFromName(card_name) {

}

function formatReply(data) {

    var reply = "";

    if(data.card_type === 'monster') {

        reply = format.underline(format.bold(data.name)) + "\n\n" +
            format.bold(data.card_type.capitalize()) + " | " + format.bold("Level: ") + data.level
            + " | " + format.bold("Type: ") + data.family.capitalize() + "\n" + format.code(data.type + "\n" + data.text)
            + "\n" + format.bold("ATK: ") + data.atk + " | " + format.bold("DEF: ") + data.def;

    } else {

        reply = format.underline(format.bold(data.name)) + "\n\n" +
            format.bold(data.card_type.capitalize()) + " | " + format.bold("Property: ") + data.property.capitalize()
            + "\n" + format.code(data.text);

    }

    return reply;
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports.run = run;
module.exports.runCommand = runCommand;
