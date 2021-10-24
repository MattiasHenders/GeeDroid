const Discord = require('discord.js');
const client = new Discord.Client();

require("dotenv").config();

const keepAlive = require("./server");
keepAlive();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

//Must stay at the end!
client.login(process.env.DISCORD_TOKEN);
