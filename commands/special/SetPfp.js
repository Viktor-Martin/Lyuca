const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setpfp')
        .setDescription(`Sets Lyuca's pfp.`)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
            let base = (interaction) ? interaction : message;
            if(base.member.user.id != '252529231215460353') return;
            try{
                if(!base.content.match(/http/g) && !base.attachments.size) return base.reply("No valid image sent");
                let imageFormat = (base.attachments.size > 0) ? 'attachment' : 'link';
                let link = '404';
                if(imageFormat == 'link'){
                    let contentArr = base.content.split(' ');
                    for(let i = 0; i < contentArr.length; i++){
                        if(contentArr[i].match(/https/g)){
                            link = contentArr[i];
                            break;
                        }
                    }
                }else if(imageFormat == 'attachment'){
                    if(base.attachments && base.attachments.size == 1){
                        link = await base.attachments.first().url;
                    }
                }
                const request = require('request');
                const re = request(link);
                re.on('response', response => {
                    let extension = response.headers['content-type'].split('/')[1];
                    response.pipe(fs.createWriteStream(`./images/Temp/tempClientIcon${extension}`)).on('finish', () =>{
                        const path = `./images/Temp/tempClientIcon${extension}`;
                        if(!fs.existsSync(path)){
                            return base.reply(`File Missing.`);
                        }
                        Lyuca.user.setAvatar(path);
                        return base.reply("Profile picture has been set.");
                    })
                })
            }catch(e){
                console.log(e.message);
            }
        }
}