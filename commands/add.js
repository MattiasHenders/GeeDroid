require("dotenv").config();
const profileModel = require('../models/profileSchema');
const deckModel = require('../models/deckSchema');

//CLASS KEYS
const ERROR_CLASS = -1;
const CLIENT_SERVER = 3940;
const ANDROID = 3717;
const DATA_COMM = 3721;
const OBJECT_ORIENTED_PROGRAMMING = 3522;
const ALGORITHMS = 3760;
const STATISTICS = 3042;

module.exports = {
    name: 'add',
    description: "Add a due date.",
    
    async execute(client, message, args, Discord){ 

        let channelToSend = getChannelToSend();

        //Args Checks
        if ((args.length != 3)) {
            message.author.send("You have the wrong amount of arguments, it should be -add class dueDate \"whatsDue\"");
            return;
        }

        //Check that the date is formatted correct
        var dateStr = args[1];

        var date = new Date().parse(dateStr);

        if (date == NaN) {
            message.author.send("You have a weird date, it should be in format YYYY-MM-DD");
            return;
        }

        //check that the class ID sent is a valid one for Client Server
        var classID = parseClassID(args[0]);
       
        if (classID == ERROR_CLASS) {
            message.author.send("Class not found, try something simpler or the class ID");
            return;
        }

        var dueString = args[2];

        //With date object and class key print what is due in a card
        sendDueMessage(client, channelToSend, dueString);

        console.log("Finished fight command...");
    }
}

//Find the right class from a series of checks
function parseClassID(classString) {

    if (classString.includes("cli") || classString.includes("serv") 
        || classString.includes(CLIENT_SERVER)) {
            return CLIENT_SERVER;
        }

    if (classString.includes("algo") || classString.includes("rithm") 
        || classString.includes(ALGORITHMS)) {
        return ALGORITHMS;
    }

    if (classString.includes("stat") || classString.includes("istsics") 
        || classString.includes("math") ||classString.includes(STATISTICS)) {
        return STATISTICS;
    }

    if (classString.includes("andr") || classString.includes("droid") 
        || classString.includes(ANDROID)) {
            return ANDROID;
    }

    if (classString.includes("data") || classString.includes("comm") 
        || classString.includes(DATA_COMM)) {
            return DATA_COMM;
    }

    if (classString.includes("objec") || classString.includes("orient") 
        || classString.includes("oop") || classString.includes(OBJECT_ORIENTED_PROGRAMMING)) {
        return OBJECT_ORIENTED_PROGRAMMING;
    }

    //Else return error code
    return ERROR_CLASS;
}


function sendFightMessage(client, channelToSend, classKey, dueDate, dueString) {

    //Find the channel to send to
    const channel = client.channels.cache.find(channel => channel.name === channelToSend);

    var classString = getClassString(classKey);
    //var imgUrl = getClassImgURL(classKey);
    var classColour = getClassColour(classKey);

    //Set up the messages
    const fightEmbed = {
        "type": "rich",
        "title": `${classString}`,
        "description": `\n${dueString}\nDue at : ${dueDate}`,
        "color": classColour,
        "thumbnail": {
            "url": `https://github.com/MattiasHenders/MotherBrain/blob/main/media/topdecklethal%20logo.png?raw=true`,
            "height": 0,
            "width": 0
        },
      };

    //Send message to the specific channel
    channel.send({embed: fightEmbed});
}

//Get the classes colour
function getClassColour(classKey) {

    switch (classKey) {

        case CLIENT_SERVER:
            return 0x54a1ff;
            break;

        case ALGORITHMS:
            return 0xff8742;
            break;

        case STATISTICS:
            return 0xfafa55;
            break;

        case OBJECT_ORIENTED_PROGRAMMING:
            return 0x4fffdc;
            break;

        case DATA_COMM:
            return 0xff5770;
            break;

        case ANDROID:
            return 0x79ff57;
            break;
    
        default:
            break;
    }
}

//Get the classes colour
function getClassImgURL(classKey) {

    switch (classKey) {

        case CLIENT_SERVER:
            return "";
            break;

        case ALGORITHMS:
            return "";
            break;

        case STATISTICS:
            return "";
            break;

        case OBJECT_ORIENTED_PROGRAMMING:
            return "";
            break;

        case DATA_COMM:
            return "";
            break;

        case ANDROID:
            return "";
            break;
    
        default:
            break;
    }
}

//Get the classes title
function getClassString(classKey) {

    switch (classKey) {

        case CLIENT_SERVER:
            return "🖥 3940 Client Server";
            break;

        case ALGORITHMS:
            return "🤖 3760 Algorithms";
            break;

        case STATISTICS:
            return "📈 3042 Statistics";
            break;

        case OBJECT_ORIENTED_PROGRAMMING:
            return "☕ 3522 Object Oriented";
            break;

        case DATA_COMM:
            return "📶 3721 Data Comm";
            break;

        case ANDROID:
            return "📱 3717 Mobile Dev";
            break;
    
        default:
            break;
    }
}

//Use later if we want to limit replies to a day...
function boolDateOverADay(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    var days = Math.abs(Math.floor((second-first)/(1000*60*60*24)));

    return (days >= 1);
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
