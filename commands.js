var commands = {};
var saebot = require('./saebot.js');
var config = require('./config.json');
var format = require('./utils/discord_format.js');
var unirest = require('unirest');
var fs = require('fs');

commands.help = {
    name: 'help',
    alias: ['halp', 'help', 'saepls'],
    perm: '',
    run: function(msg, suffix, client) {

    }
}

commands.ping = {
    name: 'ping',
    alias: ['sae'],
    perm: '',
    run: function(msg, suffix, client) {
        var replies = [
            'yes?',
            'listening...',
            'I\'m still here.',
            'It\'s not like I want to answer to you, baka!',
            'copy.',
            'I won\'t die... again... hopefully.',
            'what now?',
            'do I look like I care?'
        ];
        var answer = replies[Math.floor(Math.random() * replies.length)];

        if(suffix === "v" || suffix === "version") {
            answer = "Version: " + format.italic(saebot.saebot.version) + "\nAuthor: " + format.italic("Saegusa");
            msg.channel.sendMessage(answer);
        } else {
            msg.reply(answer);
        }



    }
}

commands.shutdown = {
    name: 'shutdown',
    alias: ['quit'],
    perm: 'bot-master',
    run: function(msg, suffix, client) {
        msg.channel.sendMessage('Goodbye!');
        saebot.exit();
    }
}

commands.magic8ball = {

  name: 'magic8ball',
  help: 'saebot knows everything',
  alias: ['8ball', '8b'],
  perm: '',
  run: function(msg, suffix, client) {
    var answers = [
      'Signs point to yes.',
      'Yes.',
      'Reply hazy, try again.',
      'Without a doubt.',
      'My sources say no.',
      'As I see it, yes.',
      'You may rely on it.',
      'Concentrate and ask again.',
      'Outlook not so good.',
      'It is decidedly so.',
      'Better not tell you now.',
      'Very doubtful.',
      'Yes - definitely.',
      'It is certain.',
      'Cannot predict now.',
      'Most likely.',
      'Ask again later.',
      'My reply is no.',
      'Outlook good.',
      'Don\'t count on it.',
      'Who cares?',
      'Never, ever, ever.',
      'Possibly.',
      'There is a small chance.'
    ];
    var answer = answers[Math.floor(Math.random() * answers.length)];
    msg.reply('\nThe Magic 8 Ball says:\n' + format.code(answer));
  }

};

/*
commands.template = {

  name: undefined,
  usage: undefined,
  help: undefined,
  alias: [''],
  perm: '',
  run: function(data) {

  }

};
**/

commands.roll = {

  name: 'roll',
  help: 'rolls dice',
  alias: ['d', 'dice'],
  perm: '',
  run: function (msg, suffix, client) {
    if (suffix !== '') {

      var params = suffix.split(' ');

      if(!isNaN(params[0]) && parseInt(params[0]) > 0) {

        if(params[1] !== undefined && !isNaN(params[1]) && parseInt(params[1]) > 0) {

          var rolledStr = '';

          for (i = 0; i < parseInt(params[1]); i++) {
            rolledStr += (Math.floor((Math.random() * parseInt(params[0]))) + 1) + '  ';
          }

          msg.reply(format.bold('Rolled ' + params[1] + 'd' + params[0] + ': ') + rolledStr);
        } else {
          msg.reply(format.bold('Rolled d' + params[0] + ': ') + (Math.floor(Math.random() * parseInt(params[0])))) + 1;
        }

      } else {
        msg.reply('Usage: roll \'dicefaces\' opt:\'times\'');
      }

    } else {
      msg.reply('Usage: roll \'dicefaces\' opt:\'times\'');
    }
  }

};

module.exports = commands;
