
var modules = {};
modules.games = {};

modules.games.yugioh = {
    name: 'Yu-Gi-Oh!',
    get: require('./yugioh.js')
}

modules.games.magic = {
    name: 'Magic the Gathering',
    get: require('./magic.js')
}

modules.games.hearthstone = {
    name: 'Hearthstone',
    get: require('./hearthstone.js')
}

modules.games.league = {
    name: 'League of Legends',
    get: require('./league.js')
}

module.exports.games = modules.games;
