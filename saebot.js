const Discord = require('discord.js');
const client = new Discord.Client();

var fs = require('fs');
var format = require('./utils/discord_format.js');

var config, saebot;

var quotes = require('./quotes.json');

var modules = {};

try {
    saebot = require('./package.json');
    config = require('./config.json');
} catch(e) {
    console.log('Saebot loading error.');
    process.exit();
}

var commands = require('./commands.js');
var aliases = [];
var quote = {};

run();

function run() {
    client.on('ready', () => {
        console.log('Saebot Discord Chat Bot\nClient Version: ' + saebot.version + '\nAuthor: ' + saebot.author);

        loadModules();

        for (command in commands) {
            for(aliasii in commands[command].alias) {
                aliases.push(commands[command].alias[aliasii]);
            }
        }

        for (person in quotes) {
            quote[person] = quotes[person];
        }

        for (mod in modules) {
            console.log('Module Loaded: ' + mod);
        }

    });

    client.on('message', message => onMessage(message));
}

function loadModules() {
    modules.games = require('./modules/saebot_modules.js').games;
}

function onMessage(msg) {
    if (msg.author.id !== client.user.id) {
        var prefix = config.settings.prefix.default;
        var cmd, suffix;

        if(msg.content.indexOf(prefix) === 0) {
            cmd = msg.content.substr(prefix.length).split(' ')[0].toLowerCase();
            suffix = msg.content.substr(prefix.length).split(' ');
            suffix = suffix.slice(1, suffix.length).join(' ');

            if(commands[cmd] != undefined) {
                if(checkPerm(msg.author, commands[cmd]))
                    commands[cmd].run(msg, suffix, client);
                console.log("Command processed: " + cmd + " | by user: " + msg.author.username);
            } else if(aliases.indexOf(cmd) > -1){
                for (command in commands) {
                    if((commands[command].alias.indexOf(cmd) > -1)) {
                        if(checkPerm(msg.author, commands[command]))
                            commands[command].run(msg, suffix, client);
                        console.log("Command processed: " + command + " | by user: " + msg.author.username);
                    }
                }
            } else if(quote[cmd] != undefined) {
                msg.channel.sendMessage("@" + cmd.capitalize() + " says:\n" + format.code(quote[cmd].quotes[Math.floor(Math.random() * quote[cmd].quotes.length)]));
                console.log("Command processed: " + cmd + " | by user: " + msg.author.username);
            } else {
                handleQuotes(msg, cmd);
            }


        } else {
            if(msg.isMentioned(client.user)) {
                commands['ping'].run(msg, suffix, client);
            }

            if(config.addons.yugioh.enabled)
                modules.games.yugioh.get.run(msg);

        }


    }
}

function handleQuotes(msg, cmd) {
    for(person in quote) {
        for(aliasi in quote[person].alias) {
            if(cmd === quote[person].alias[aliasi]) {
                msg.channel.sendMessage("@" + person.capitalize() + " says:\n" + format.code(quote[person].quotes[Math.floor(Math.random() * quote[person].quotes.length)]));
                console.log("Command processed: " + person + " | by user: " + msg.author.username);
            }
        }
    }
}

function checkPerm(user, cmd) {

    if(user.id === config.perms["bot-master"]) {
        return true;
    } else {

    if(cmd.perm !== '') {

        for(serverid in config.perms[cmd.perm]) {
            for (userid in serverid) {
                if(userid === user.id) {
                    return true;
                } else {
                    continue;
                }
            }
        }

        return false;


    } else {
        return true;
    }

    }

}

function exit() {
    if(config !== null) {
        fs.writeFileSync('./config.json', JSON.stringify(config, null, 4));
        console.log('Saebot: Config file saved successfuly.');
        console.log('Saebot: Exiting.');
        process.exit();
    }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

client.login(config.auth.discord);
module.exports.saebot = saebot;
module.exports.exit = exit;
module.exports.config = config;
module.exports.format = format;
