const { SlashCommandBuilder, AttachmentBuilder } = require('discord.js');
module.exports = {
    name: `lv`,
    data: new SlashCommandBuilder()
        .setName('lv')
        .setDescription('Get the current level of you, or a member of this server.'),
    async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
        async function getLeaderboards(rankType){
            try{
                let topMembers;
                if(rankType == 'local'){
                    topMembers = await uLv.findAll({
                        where: {gid: message.guild.id},
                        limit: lbnum,
                        order: [['xpTotal', 'DESC']]
                    });
                }else{
                    topMembers = await uLv.findAll({
                        limit: lbnum,
                        order: [['xpTotal', 'DESC']]
                    });
                }
                let userData = await topMembers.map(d => d.dataValues);
                let leaderboard = '';
                let forCap = lbnum;
                if(lbnum > 10){
                    forCap = 10;
                }
                for(let i = 0; i < forCap; i++){
                    if(userData[i]){
                        let tempMember = await Lyuca.users.fetch(userData[i].uid);
                        let xp = ((x = userData[i].xpTotal) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))();
                        leaderboard += `${i+1}) \`${tempMember.username}\`: ${xp}\n`;
                    }else{
                        leaderboard = `There are only ${i} members logged in this server.\n\n` + leaderboard;
                        break;
                    }
                }
                return leaderboard;
            }catch(e){
                console.log(e);
                return 113;
            }
        }
        async function getRanks(rankType,target){
            try{
                let topMembers;
                if(rankType == 'local'){
                    topMembers = await uLv.findAll({
                        where: {gid: message.guild.id},
                        order: [['xpTotal', 'DESC']]
                    });
                }else{
                    topMembers = await uLv.findAll({
                        order: [['xpTotal', 'DESC']]
                    });
                }
                let endOfMessage = (rankType == 'local') ? 'in this server' : 'globally';
                let startOfMessage = (target.id == base.member.user.id) ? `You're` : `${target.username} is`;
                if(!topMembers) return 113;
                let data = topMembers.map(d => d.dataValues);
                for(let i = 0; i < data.length; i++){
                    if(data[i] && data[i].uid == target.id){
                        let e;
                        switch(i + 1){
                            case 1: e = 'st'; break;
                            case 2: e = 'nd'; break;
                            case 3: e = 'rd'; break;
                            default: e = 'th'; break;
                        }
                        return `${startOfMessage} ranked ${i + 1}${e} out of ${data.length} members logged ${endOfMessage}.`;;
                    }
                }
            }catch(e){
                console.log(e);
                return 113
            }
        }
        const ex = require('../../functions');
        let base = (interaction) ? interaction : message;
        let target = await ex.FindMember(base, msgArr[msgArr.length - 1]);
        if(!target){ target = base.member };
        let uLv = DatabaseArr[4];
        let gLv = DatabaseArr[5];
        let mode = msgArr.shift();
        let lbFlag = msgArr.shift();
        let lbnum = msgArr.shift();
        let cLevel, cXp, nXp;
        switch(mode){
            case 'global':
                if(lbFlag == 'top'){
                    let messageToSend = await getLeaderboards('global');
                    if(messageToSend == 113){ return base.channel.send("Something went wrong.") };
                    return base.channel.send(messageToSend);
                }else if(lbFlag == 'rank'){
                    let messageToSend = await getRanks('global', target.user);
                    if(messageToSend == 113){ return base.channel.send("Something went wrong.") };
                    return base.channel.send(messageToSend);
                }
                table = await gLv.findOne({where: {uid: message.author.id}});
                cLevel = table.dataValues.level;
                cXp = table.dataValues.xpCurrent;
                nXp = table.dataValues.xpToNextLevel;
                break;
            case 'local':
                if(lbFlag == 'top'){
                    let messageToSend = await getLeaderboards('local');
                    if(messageToSend == 113){ return base.channel.send("Something went wrong.") };
                    return base.channel.send(messageToSend);
                }else if(lbFlag == 'rank'){
                    let messageToSend = await getRanks('local', target.user);
                    if(messageToSend == 113){ return base.channel.send("Something went wrong.") };
                    return base.channel.send(messageToSend);
                }
                table = await uLv.findOne({where: {uid: message.author.id, gid: message.guild.id}});
                cLevel = table.dataValues.level;
                cXp = table.dataValues.xpCurrent;
                nXp = table.dataValues.xpToNextLevel;
                break;
            default:
                return message.channel.send('You must specify the mode. Either \`Local\` or \`Global\`.')    
        }
        let Canvas = require('@napi-rs/canvas');
        let ratio = cXp / nXp;
        const levelBanner = Canvas.createCanvas(1200,300);
        const img = levelBanner.getContext('2d');
        const bg = await Canvas.loadImage(`./images/Levels/levelTemplate.png`);
        let avURL = message.author.avatarURL({extensions: 'png', size: 512});
        const av = await Canvas.loadImage(avURL);
        console.log(cLevel)
        img.drawImage(bg,0,0, levelBanner.width, levelBanner.height);
        img.drawImage(av, 30,30, 242,242);
        img.font = '80px Impact';
        img.fillStyle = '#808080';
        img.lineWidth = 2;
        img.textAlign = 'end';
        img.fillText(cLevel.toString(), 406, 255);
        img.textAlign = 'start';
        img.fillText(`${cLevel + 1}`, 1081, 255);
        img.font = '40px Impact';
        img.textAlign = 'center';
        img.fillText(`${cXp} OF ${nXp} TO NEXT LEVEL`, 745, 290);
        img.fillRect(413, 195, 5, 60);
        img.fillRect(1070, 195, 4, 60);
        img.fillStyle = '#8d8de7';
        img.fillRect(418, 220, ratio * 652 , 7);
        const finalimage = new AttachmentBuilder(await levelBanner.encode('png'), {name: 'level.png'});
        return base.reply({files: [finalimage]});
    }   
}