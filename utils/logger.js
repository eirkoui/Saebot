var config = require('../config.json');

function log(str) {

    var date = new Date().toISOString().
      replace(/T/, ' ').
      replace(/\..+/, '');

    console.log('[saebot][' + date + '] ' + str);
}

module.exports.log = log;
