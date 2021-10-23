require("dotenv").config();
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'dueReminder',
    description: "Remind students of a due date",
    
    async execute(client, message, args, Discord){ 

        console.log("Starting dueReminder command");
        
        let channelToSend = getChannelToSend();
        const DAYS_CHECK = parseInt(process.env.MAX_DAYS_CHECK);

        //Check today if any past due dates are old
        

        //Delete the old message

        console.log("Finished due Reminder command...");
    }
}

function printTopReminders(client, channelToSend, playerArray) {

    console.log("Reminder is printing new changes");
    
    var message = "";

    //Get each leader
    for (let i = 0; i < playerArray.length; i++) {

        //Adds it to the message
        console.log(playerArray[i]);

        message += (i + 1) + ") " + playerArray[i].userTag.split("#")[0] + "\n> SCORE: " + playerArray[i].dojoPoints + "\n\n";
    }
    
    //Set up the messages
    const messageEmbed = {
        "type": "rich",
        "title": `⏰ Upcoming Due Dates ⏰`,
        "description": `${message}`,
        "color": 0x00d9ff,
        "thumbnail": {
            "url": `https://github.com/MattiasHenders/MotherBrain/blob/main/media/topdecklethal%20logo.png?raw=true`,
            "height": 0,
            "width": 0
        },
    };

    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name == channelToSend);
    channel.send({embed: messageEmbed});
}

//Gets the channel to send based on .env file
function getChannelToSend() {

    var boolTesting = process.env.BOOL_TESTING;
    var channel = process.env.PRODUCTION_CHANNEL;

    if (boolTesting == 'true') {
        channel = process.env.TEST_CHANNEL;
    }
    
    return channel
}
