var request = require('request-promise');
var format = require('../utils/discord_format.js');
var saebot = require('../saebot.js');

var mtg_api = {
    card_data: 'https://api.magicthegathering.io/v1/cards'
}

function run(msg) {
    if((msg.content.indexOf('{') > -1) && (msg.content.indexOf('}') > -1)) {

        var card = msg.content.match(/{(.*?)}/)[1];

        getCardDataFromName(card, data => {
            msg.channel.sendMessage(formatReply(data));
            saebot.logger.log("Saebot: MAGIC_API - Card Processed: " + data.name);
        });

    }
}

function runCommand(msg, suffix) {
    getCardDataFromName(suffix, data => {
        msg.channel.sendMessage(formatCardData(data));
        saebot.logger.log("Saebot: MAGIC_API - Card Processed: " + data.name);
    });
}

function getCardDataFromName(card_name, callback) {

    var options = {
        uri: mtg_api.card_data,
        qs: {
            name: '"' + card_name + '"' // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        json: true // Automatically parses the JSON string in the response
    };

    request(options)
        .then(function (body) {
            callback(body.cards[0])
        })
        .catch(function (err) {
            saebot.logger.log('Saebot: MAGIC_API GET ERROR')
        });

}

function searchCardDataFromName(msg, suffix) {

}

function formatCardData(data) {

    var reply = "";

    function stringifyColors(colorArray) {
        var str = "";
        for(color in colorArray) {
            str += colorArray[color] + " ";
        }
        if (colorArray != undefined)
            return str;
        else
            return 'None';
    }

    if(data != undefined) {

        reply = format.underline(format.bold(data.name)) + ' | ' + data.type + "\n\n" + format.bold('Mana: ') + data.manaCost + ' | '
            + format.bold('Converted Mana: ') + data.cmc + ' | ' + format.bold('Color: ') + stringifyColors(data.colors) + '\n' + format.code(data.text) + '\n' + format.code(data.flavor)
                + '\n' + format.bold('Power: ') + data.power + ' | ' + format.bold('Toughness: ') + data.toughness;

    }

    return reply;

}

module.exports.run = run;
module.exports.runCommand = runCommand;
