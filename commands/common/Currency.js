const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cv')
        .setDescription('Converts one currency to another currency.')
        .addStringOption(option => option.setName('currency1').setDescription(`Starting currency`))
        .addStringOption(option => option.setName('currency2').setDescription(`Final currency`))
        .addStringOption(option => option.setName('value').setDescription('Amount to be converted')),
    async execute(interaction, Discord, message, Lyuca, sdPrefix, fs, DatabaseArr, msgArr, cmdArr){
        const ConversionFuncs = {
            "ConvertTemperature" : async function(val, unit1, unit2){
                const TempConversions = {
                    "CToF" : function(value){ return (value * (9/5)) + 32; },
                    "CToK" : function(value){ return value + 273.15; },
                    "FToC" : function(value){ return (value - 32) * (5/9); },
                    "FToK" : function(value){ return ((value - 32) * (5/9)) + 273.15; },
                    "KToF" : function(value){ return ((value - 273.15) * (9/5)) + 32; },
                    "KToC" : function(value){ return value - 273.15; },
                }
                unit1 = unit1.slice(0,1);
                unit2 = unit2.slice(0,1);
                if(val <= 0  && unit1 == 'K'){
                    return [113, `You can't go below absolute zero moron.`];
                }
                let newVal = TempConversions[`${unit1}To${unit2}`](val);
                newVal = Math.round(newVal * 100) / 100;
                return [0, `${val}${unit1}  ->  ${newVal}${unit2}`];
            },
            "ConvertDistance" : async function(val, unit1, unit2){
                const DistConversions = {
                    "MetersToFeet" : function(value){ return  value * 3.33; },
                    "MetersToMiles" : function(value){ return value * 0.0006213711192; },
                    "MetersToNauticalMiles" : function(value){ return value * 0.000539957; },
                    "FeetToMeters" : function(value){ return value * 0.3048; },
                    "MilesToMeters" : function(value){ return value * 1609.344; },
                    "NauticalMilesToMeters" : function(value){ return value * 1852; },
                    "MilesToFeet" : function(value){ return value * 5280; },
                    "NauticalMilesToFeet" : function(value){ return value * 6076.12; },
                    "FeetToMiles" : function(value){ return value / 5280; },
                    "FeetToNauticalMiles" : function(value){ return value / 6076.12; }
                }
                let FirstArg, SecondArg;
                let kmFlag = false;
                let originalValue = val;
                switch(unit1){
                    case 'KM': FirstArg = 'Meters'; val *= 1000; break;
                    case 'M':  FirstArg = 'Meters'; break;
                    case 'MI': FirstArg = 'Miles'; break;
                    case 'NM': FirstArg = 'NauticalMiles'; break;
                    case 'FT': FirstArg = 'Feet'; break;
                }
                switch(unit2){
                    case 'KM': SecondArg = 'Meters'; kmFlag = true; break;
                    case 'M':  SecondArg = 'Meters'; break;
                    case 'MI': SecondArg = 'Miles'; break;
                    case 'NM': SecondArg = 'NauticalMiles'; break;
                    case 'FT': SecondArg = 'Feet'; break;
                }
                let newVal = DistConversions[`${FirstArg}To${SecondArg}`](val);
                if(kmFlag == true) newVal /= 1000;
                newVal = Math.round(newVal * 1000) / 1000;
                return [0, `${originalValue}${unit1}  ->  ${newVal}${unit2}`];
            },
            "ConvertThurst" : async function(val, unit1, unit2){
                ThrustConversions = {
                    "N_TO_LBF" : function(value){return value * 0.224809; },
                    "N_TO_KGF" : function(value){return value * 0.101972; },
                    "LBF_TO_KGF" : function(value){return value / 2.20462; },
                    "KGF_TO_LBF" : function(value){return value * 2.20462; },
                    "LBF_TO_N" : function(value){return value * 4.4482; },
                    "KGF_TO_N" : function(value){return value * 9.8067; },
                }
                let kFlag = false;
                if(unit1 == 'KN'){
                    val *= 1000; 
                    kFlag = true;
                    unit1 = 'N';
                }
                if(unit2 == 'KN'){
                    kFlag = true;
                    unit2 = 'N';
                }
                let newVal = ThrustConversions[`${unit1}_TO_${unit2}`](val);
                if(kFlag == true) {
                    if(unit1 == 'N') { unit1 = 'KN'};
                    if(unit2 == 'N') { newVal /= 1000; unit2 = 'KN'};
                }
                newVal = Math.round(newVal * 1000) / 1000;
                return [0, newVal];
            },
            "ConvertPressure" : async function(val, unit1, unit2){
                const PressureConversions = {
                    "P_TO_PSI" : function(value){ return value * 0.000145037738; },
                    "PSI_TO_P" : function(value){ return value / 0.000145037738; } 
                }
                let multiplier, nameHolder;
                if(unit1 == 'PSI'){
                    switch(unit2){
                        case 'GPA': multiplier = 1000000000; nameHolder = unit2; unit2 = 'P'; break;
                        case 'MPA': multiplier = 1000000; nameHolder = unit2; unit2 = 'P'; break;
                        case 'KPA': multiplier = 1000; nameHolder = unit2; unit2 = 'P'; break;
                        default: multiplier = 1;
                    }
                }else{
                    switch(unit1){
                        case 'GPA': multiplier = 1000000000; nameHolder = unit1; unit1 = 'P'; break;
                        case 'MPA': multiplier = 1000000; nameHolder = unit1; unit1 = 'P'; break;
                        case 'KPA': multiplier = 1000; nameHolder = unit1; unit1 = 'P'; break;
                        default: multiplier = 1;
                    }
                    val *= multiplier;
                }
                let newVal = PressureConversions[`${unit1}_TO_${unit2}`](val);
                if(unit1.match(/N/g)){
                    unit1 = nameHolder;
                }else{
                    unit2 = nameHolder;
                    newVal /= multiplier;
                }
                newVal = Math.round(newVal * 1000) / 1000;
                return [0, `${newVal}`];
            }
        }
        let value, currency1, currency2;
        let base = (interaction) ? interaction : message;
        if(interaction){
            value = +interaction.options.getString('value');
            currency1 = interaction.options.getString('currency1').toUpperCase();
            currency2 = interaction.options.getString('currency2').toUpperCase();
            if(isNaN(value)) return base.reply(`Give me a numeric value please...`);
        }else{
            let content = message.content.toUpperCase();
            let conArr = content.split(' ');
            value = +conArr[1];
            if(isNaN(value)){
                value = null;
                currency1 = conArr[1];
                currency2 = conArr[conArr.length - 1];
            }else{
                currency1 = conArr[2];
                currency2 = conArr[conArr.length - 1];
            }
        }
        let flagArr = [
            {type: 'ConvertTemperature', units: ['F', 'C', 'K']},
            {type: 'ConvertDistance', units: ['KM', 'M', 'FT', 'NM', 'MI']},
            {type: 'ConvertThurst', units: ['N', 'KN', 'LBF', 'KGF']},
            {type: 'ConvertPressure', units: ['P', 'KPA', 'MPA', 'PSI']}
        ]
        let fucntionToCall = null;
        for(let i = 0; i < flagArr.length; i++){
            let temp1 = null;
            let temp2 = null;
            for(let j = 0; j < flagArr[i].units.length; j++){
                if(currency1 == flagArr[i].units[j]){
                    temp1 = 1;
                }
                if(currency2 == flagArr[i].units[j]){
                    temp2 = 1;
                }
            }
            if(temp1 && temp2){
                fucntionToCall = flagArr[i].type;
                break;
            }else{
                temp1 = null;
                temp2 = null;
            }
        }
        let passedValue = (value) ? value : 0;
        let failedFlag = false;
        try{
            let result = await ConversionFuncs[fucntionToCall](passedValue, currency1, currency2);
            switch(result[0]){
                case 113: return base.reply(`${result[1]}`);
                case 0: return base.reply(`${result[1]}`);
            }
        }catch(e){
            if(e.message.match(`is not a function`)){
                console.log(`Currency? Trying...`);
                failedFlag = true;
            } 
        }
        let table = [
            {before:`TKL`, after: `TRY`},
            {before: `VEF`, after: `VES`},
            {before: '£', after: 'GBP'},
            {before: 'POUND', after: 'GBP'},
            {before: '€', after: 'EUR'},
            {before: 'EURO', after: 'EUR'},
            {before: '¥', after: 'JPY'},
            {before: 'ZWD', before: 'ZWL'},
        ]
        let index1 = table.map(a => a.before).indexOf(currency1);
        if(index1 != -1) currency1 = table[index1].after;
        let index2 = table.map(a => a.before).indexOf(currency2);
        if(index2 != -1) currency2 = table[index2].after;
        let link = `https://openexchangerates.org/api/latest.json?`;
        link += `app_id=${process.env.CURRENCY_API_KEY}`;
        const axios = require('axios').default;
        try{
            const response = await axios.get(link);
            let currency1ToUSD = 1 / response.data.rates[currency1];
            let currency2ToUSD = 1 / response.data.rates[currency2];
            let replyArr = [
                `You're retarded, learn currency codes dipshit.`,
                `Minor spelling mistake. :lole:`,
                `https://cdn.discordapp.com/attachments/639706647434100739/1283146148105949195/tenor.gif`,
                `Are you illiterate?`,
                `Niggwatt?`,
            ];
            let replyNum = Math.floor(Math.random() * replyArr.length);
            if(isNaN(currency1ToUSD) || isNaN(currency2ToUSD)){
                if(failedFlag == true){
                    return base.reply("Can you at least provive *any* valid arguments?");
                }
                return base.reply(replyArr[replyNum]);
            } 
            let exchangeRate = (currency1ToUSD / currency2ToUSD);
            if(index1 != -1) currency1 = table[index1].before;
            if(index2 != -1) currency2 = table[index2].before;
            if(!value){
                value = Math.round(exchangeRate * 100) / 100;
                return base.reply(`The current exchange rate is:\n1 ${currency1} -> ${value} ${currency2}`);
            }
            let newValue = Math.round((value * exchangeRate) * 100) / 100;
            return base.reply(`${value} ${currency1} -> ${newValue} ${currency2}`);
        }catch(e){
            if(e.message.match('ENOTFOUND')){
                return base.reply(`GOD DAMN IT THE API DOWN`);
            }
            console.log(e);
        }
    }
}