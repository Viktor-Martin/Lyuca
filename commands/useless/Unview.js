const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unview')
        .setDescription('Grabs a random nearly unviewed video off youtube.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
            let base = (interaction) ? interaction : message;
            const axios = require('axios').default;
            const cheerio = require('cheerio');
            const response = await axios.get('https://petittube.com/');
            if(response.status != 200){ return base.reply("It seems the website I use is down.") };
            const ch = cheerio.load(response.data);
            let iframe = ch('iframe');
            let temp = iframe[0].attribs.src.split('?');
            let linkPrototype = temp[0].replace('/embed/', '/watch?v=');
            base.reply(linkPrototype);
        }
}