const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json")
const prefix = "?"

bot.login(process.env.TOKEN);
 
bot.on("ready", () => {
    console.log("Bot is ready")
    bot.user.setStatus("dnd");
    setTimeout(() => {
        bot.user.setActivity("?help");
    }, 100)
});

bot.on("guildMemberAdd", member => {
    member.send(`** Wsh ${member} ! Bienvenue à toi sur OneLife !\nSi tu souhaites passer la WL, je t'invite à faire un ticket !**`);
    bot.channels.cache.get('862120726403350532').send(`** Bienvenue ${member}  sur le serveur !**`);
    member.roles.add('868826506338656266');

}); 

bot.on("message", async message => {
    
    let blacklisted = ['fdp', 'ntm','ta mere','suce','jtencule','suck my dick','fuck', 'bitch','lingmyball', 'connard','bite','pute','chatte','s@lope', 'putain','tg', 'ta gueule', 'nique', 'salope', 'PD', 'batard', 'putin', 'enfoiré', 'connare', 'fils de pute', 'bâtard', 'bicot', 'conasse', 'couille molle', 'débile', 'ducon', 'dugland', 'enculé', 'fachiste', 'imbécile', 'lavette'];
    
    let foundInText = false;

    for(var i in blacklisted) {
        if(message.content.toLocaleLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
    }

    if(foundInText) {
        message.delete()
    }
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
 
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
});

//?clear
 
bot.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;
    if(message.member.permissions.has("MANAGE_MESSAGES")){
        if(message.content.startsWith(prefix + "clear")){
            let args = message.content.split(" ");
            
            if(args[1] == undefined){
                message.channel.send("**Nombre de message non ou mal définis !**");
            }
           else {
                let number = parseInt(args[1]);
 
                if(isNaN(number)){
                   message.channel.send("**Pour effectuer la commande tu as comme obligation de définir un nombre !\n ( et non des lettres comme tu viens de faire mdr )**");
                }
                else {
                  message.channel.bulkDelete(number).then(messages => {
                        console.log("Suppresion de " + messages.size + " messages réussi !");
                    }).catch(err => {
                        console.log("Erreur de clear : " + err);
                    });
                }
            }
        }
    }
});

//?ban //?kick //?mute //?tempmute

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type == 'dm') return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("**Membre non ou mal mentioné !**")
                message.channel.send(embed);
            }
           else {
                if(mention.bannable){
                    mention.ban();
                   var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("**Membre non ou mal mentioné !**")
                message.channel.send(embed);
                }
                else{
                    var embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .setDescription("**Impossible de bannir " + "<@" + mention.id + "> du serveur!**");
                    message.channel.send(embed);
                }
            }
        }
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("**Membre non ou mal mentioné !**")
                message.channel.send(embed);
        
            }   
            else {
                if(mention.kickable){
                    mention.kick();
                    var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("<@" + mention.id + "> **a été kick avec succès !**"); 
                message.channel.send(embed);;
                }    
                else {
                    var embed = new Discord.MessageEmbed()
                    .setColor("#000000")
                    .setDescription("**Impossible de kick ce membre du serveur !**")
                    message.channel.send(embed);
                }
            }       
        } 
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("**Membre non ou mal mentioné !**")
                message.channel.send(embed); 
            }
            else {
                mention.roles.add("866061965097041930");
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("<@" + mention.id + "> **a été mute avec succès**"); 
                message.channel.send(embed);
            }
        }              
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("**Membre non ou mal mentioné !**")
                message.channel.send(embed);
            }
            else {
                mention.roles.remove("866061965097041930");
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("<@" + mention.id + "> **a été demute avec succès**"); 
                message.channel.send(embed);    
            }
        }
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                var embed = new Discord.MessageEmbed()
                .setColor("#000000")
                .setDescription("**Membre non ou mal mentioné !**")
                message.channel.send(embed);
                
            }
            else {
               let args = message.content.split(" ");

               mention.roles.add("866061965097041930");
               setTimeout(function() {
                    mention.roles.remove("866061965097041930");
                    message.channel.send("<@" + mention.id + "> peux désormais parler de nouveau !"); 
               }, args[2] * 1000);
            }
        }
    }    
});

