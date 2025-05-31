const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wash')
        .setDescription('Logging Aeros foot cleanliness')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
            let base = (interaction) ? interaction : message;
            if(base.member.user.id != '502972072847212546') return;
            let guild = await Lyuca.guilds.fetch('639706647434100736');
            let channel = await guild.channels.fetch('1287676803535605800');
            let name =  channel.name.split(':')[0];
            let count = +channel.name.split(':')[1];
            count += 2;
            try{
                channel.setName(`${name}: ${count}`);
            }catch(e){
                return base.reply("Something went wrong updating channel name.");
            }
            return;
        }
}