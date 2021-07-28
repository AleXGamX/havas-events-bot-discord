const { channel } = require("diagnostics_channel");
const Discord = require("discord.js");

const Client = new Discord.Client;

// Prefix du Bot
const prefix = "he!";

Client.on("ready", () => {
    console.log("Bot Opérationnel");

    // Message ajouté à la mémoire du Bot
    Client.guilds.cache.find(guild => guild.id === "685432442437238784").channels.cache.find(channel => channel.id === "685432442437238787").messages.fetch("869932500166795265").then(message => {
        console.log("Message ajouté à la mémoire : " + message.content);
    }).catch(err =>{
        console.log("Message non ajouté à la mémoire : " + err);
    });
});

// Message d'arrivée de Membre
Client.on("guildMemberAdd", member => {
    console.log("Un nouveau Membre est arrivé !");
    member.guild.channels.cache.find(channel => channel.id === "869286267714666527").send(member.displayName + " Bienvenue !\nNous sommes désormais **" + member.guild.memberCount + "** sur le Serveur !");
    
    // Identifiant du Rôle donné aux nouveaux Membres
    member.roles.add("869549446495625217").then(mbr => {
        console.log("Rôle attribué avec succès pour " + member.displayName);
    }).catch(() => {
        console.log("Le rôle n'a pas pu être attribué pour " + member.displayName);

    });
});

// Message de départ de Membre
Client.on("guildMemberRemove", member => {
    console.log("Un Membre est parti !");
    member.guild.channels.cache.find(channel => channel.id === "869605769883033620").send(member.displayName + " Est parti :sob:\nNous sommes désormais **" + member.guild.memberCount + "** sur le Serveur !");
});

// Message dans la console comme quoi un Membre autre que le Bot à ajouté une réaction
Client.on("messageReactionAdd", (reaction, user) => {
    if(user.bot) return;

    console.log("Réaction ajouté par " + user.username + "\nNom de l'émoji : " + reaction.emoji.name + " C'est la " + reaction.count + "e réaction !");
    
    // Ajout de rôle avec réaction
    if(reaction.message.id === "869932500166795265"){
        if(reaction.emoji.name === "megacheck"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.add("869941225157959761").then(mbr => {
                console.log("Rôle attribué avec succès pour " + mbr.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu être attribué : " + err);
            });
        }
    }

    // Retire la réaction d'un Membre autre que le Bot
    /*reaction.users.remove(user.id).then(react => {
        console.log("Réaction : " + react.emoji.name + " retiré par le Bot")
    }).catch(err => {
        console.log("Impossible de retiré la réaction : " + err)
    });*/
});

// Message dans la console comme quoi un Membre autre que le Bot à retiré une réaction
Client.on("messageReactionRemove", (reaction, user) => {
    if(user.bot) return;

    console.log("Réaction retiré par " + user.username + "\nNom de l'émoji : " + reaction.emoji.name + " C'est la " + reaction.count + "e réaction !");

    // Suppression de rôle avec réaction
    if(reaction.message.id === "869932500166795265"){
        if(reaction.emoji.name === "megacheck"){
            var member = reaction.message.guild.members.cache.find(member => member.id === user.id);
            member.roles.remove("869941225157959761").then(mbr => {
                console.log("Rôle retiré avec succès pour " + mbr.displayName);
            }).catch(err => {
                console.log("Le rôle n'a pas pu être retiré : " + err);
            });
        }
    }
});

// Messages
Client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;

    if(message.member.hasPermission("ADMINISTRATOR")){
        // Embed
        if(message.content == prefix + "events")
            var embed = new Discord.MessageEmbed()
            .setColor("#0099ff")
            .setTitle("**Événements à venir**")
            .setURL("https://discord.gg/xVjRUpT9m2")
            .setAuthor("PDG - Havas Events", "https://cdn.discordapp.com/icons/869268074392600586/370e722335b3f0e460787c963c18c4a3.png?size=4096")
            .setDescription("__Liste des événements à venir organisés par **Havas Events** :__")
            .setThumbnail("https://cdn.discordapp.com/icons/869268074392600586/370e722335b3f0e460787c963c18c4a3.png?size=4096")
            .addField("Aucun événements à venir...", "Pour le moment...")
            .setImage("https://cdn.discordapp.com/attachments/859138651521810454/869976273479421992/upcoming-events.jpg")
    }


    message.channel.send(embed);

    // Si Membre à la permission Administrateur
    if(message.member.hasPermission("ADMINISTRATOR")){

        // Commande : he!ban
        if(message.content.startsWith(prefix + "ban")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if(mention.bannable){
                    mention.ban();
                    message.channel.send(mention.displayName + " a été banni avec succès !");
                }
                else {
                    message.reply("Impossible de bannir ce Membre.");
                }
            }
        }
        // Commande : he!kick
        else if(message.content.startsWith(prefix + "kick")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Membre non ou mal mentionné.");
            }
            else {
                if (mention.kickable){
                    mention.kick();
                    message.channel.send(mention.displayName + " a été kick avec succès !");
                }
                else {
                    message.reply("Impossbile de kick ce Membre.");
                }
            }
        }
        // Commande : he!mute
        else if(message.content.startsWith(prefix + "mute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Member non ou mal mentionné.");
            }
            else {
                mention.roles.add("869949219342012446");
                message.reply(mention.displayName + " mute avec succès !");
            }
        }
        // Commande : he!unmute
        else if(message.content.startsWith(prefix + "unmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Member non ou mal mentionné.");
            }
            else {
                mention.roles.remove("869949219342012446");
                message.reply(mention.displayName + " unmute avec succès !");
            }
        }
        // Commande : he!tempmute
        else if(message.content.startsWith(prefix + "tempmute")){
            let mention = message.mentions.members.first();

            if(mention == undefined){
                message.reply("Member non ou mal mentionné.");
            }
            else{
                let args = message.content.split(" ");

                mention.roles.add("869949219342012446");
                    message.reply(mention.displayName + " tempmute avec succès !");
                setTimeout(function() {
                    mention.roles.remove("869949219342012446");
                    message.channel.send("<@" + mention.id + ">, tu peut désormais parler de nouveau !");
                }, args [2] * 1000);
            }
        }
    }

    // Ajout de réactions aux messages
    /*message.react(" ");*/

    // Commande : he!ping
    if(message.content == prefix + "ping"){
        message.channel.send("pong");
    }

    // Commande : he!stat
    if(message.content == prefix + "stat"){
        message.channel.send("**" + message.author.username + "** qui a pour identifiant : __" + message.author.id + "__, a posté un message");
    }
});


// Token du Bot
Client.login("ODY5OTg3NDc5MTk1ODk3ODU2.YQGM-g.97vBAJTpPEf821bn_gbbHEA-Hj8");
