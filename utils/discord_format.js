module.exports = {

    code: function(str) {
        return "```\n" + str + "\n```";
    },

    bold: function(str) {
        return "**" + str + "**";
    },

    italic: function(str) {
        return "*" + str + "*";
    },

    strike: function(str) {
        return "~~" + str + "~~";
    },

    underline: function(str) {
        return "__" + str + "__";
    },
    
    highlight_code: function(str, lang) {
        return "```" + lang + "\n" + str + "\n```";
    }
}
