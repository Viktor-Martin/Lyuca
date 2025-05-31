const { SlashCommandBuilder } = require(`discord.js`);
module.exports = {
    data:   new SlashCommandBuilder()
        .setName('ite')
        .setDescription('In The End'),
    async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
        let base = (interaction) ? interaction : message;
        let loserArray = [
            `263492727138680842`,
            `308020458261970944`,
        ];
        for(let i = 0; i < loserArray.length; i++){
            if(base.member.user.id == loserArray[i]){
                return base.reply("You are a fat retard, lose some weight before you can use this command.");
            }
        }
        let gifArr = [
            { delay: 0, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289161976739528755/0.gif" }, //it starts with
            { delay: 1400, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289161982573936732/1.gif" }, //one thing i dont know why
            { delay: 3200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289161991251820554/2.gif" }, //it doesnt even matter how hard you try
            { delay: 5500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162002270257195/3.gif" }, //keep that in mind i designed this rhyme to explain in due time
            { delay: 9400, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162011577553018/4.gif" }, //all i know
            { delay: 11200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162020914069566/5.gif" }, //time is a valuable thing watch it fly by as the pendulum swings
            { delay: 14900, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162030372098058/6.gif" }, //watch it count down
            { delay: 16000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162039914397777/7.gif" }, //to the end of the day the clock ticks life away
            { delay: 18500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162050597027934/8.gif" }, //its so unreal
            { delay: 20000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162060713824328/9.gif" }, //didnt look out below watch the time go right out the window
            { delay: 24200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162071061303296/10.gif" }, //tryna hold on, they didnt even know i wasted it all just to
            { delay: 27500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162085498093629/11.gif" }, //watch you go... i kept everything inside
            { delay: 33000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162100123631696/12.gif" }, //what it meant to me will eventually be a memory
            { delay: 36700, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162115835494463/13.gif" }, //i tried so hard and got so far but in the end
            { delay: 43200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162130741919787/14.gif" }, //it doesnt even matter
            { delay: 45700, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162142519529483/15.gif" }, //i had to fall
            { delay: 48000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162155320414309/16.gif" }, //to lose it all
            { delay: 51000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162173674950686/17.gif" }, //but in the end it doesnt even matter
            { delay: 56200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162189164249128/18.gif" }, //one thing i dont know why
            { delay: 64000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162199763255368/19.gif" }, //i tried  so hard
            { delay: 65500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162218449141802/20.gif" }, //in spite of the way your were mocking me
            { delay: 73000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162228250968168/21.gif" }, //got so far
            { delay: 74600, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162246072569859/22.gif" }, //things arent the way they were before
            { delay: 82700, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162263751823412/23.gif" }, //in the end
            { delay: 93500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162277907337248/24.gif" }, //and got so far
            { delay: 96500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162291782225981/25.gif" }, //but in the end
            { delay: 100500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162307955462214/26.gif" }, // good
            { delay: 105500, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162316515901450/27.gif" },
            { delay: 112000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162327274426378/28.gif" },
            { delay: 121000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162337059868704/29.gif" },
            { delay: 126700, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162345985216533/30.gif" },
            { delay: 131000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162358438236191/31.gif" },
            { delay: 136000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162367489409054/32.gif" },
            { delay: 139000, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162374577913880/33.gif" },
            { delay: 148200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162384572809216/34.gif" }, // Very good
            { delay: 153200, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162394269913149/35.gif" },
            { delay: 157300, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162401840894066/36.gif" },
            { delay: 162800, lyrics: "https://cdn.discordapp.com/attachments/638487217001594937/1289162410980020225/37.gif" }
        ];
        for(let i = 0; i < 38; i++){
            setTimeout(() => {
                base.channel.send(gifArr[i].lyrics);
            }, gifArr[i].delay);
        }
    }
}