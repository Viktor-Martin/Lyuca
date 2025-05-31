const { SlashCommandBuilder, PermissionFlagsBits, AttachmentBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Restarts the bot')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
            let base = (interaction) ? interaction : message;
            if(base.member.user.id != '252529231215460353') return;
            let image = `./images/Test/rapidsave.com_ive_never_met_a_nice_south_african_antiapartheid-5q14zbllnc2c1.mp4`;
            let file = new AttachmentBuilder()
                .setFile(image)
                .setName(`southafrican.mp4`)
            base.reply({
                files: [file]
            });
        }
}