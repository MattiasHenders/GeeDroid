require("dotenv").config();
var cron = require('node-cron');

module.exports = {
    name: 'dueReminder',
    description: "Remind students of a due date",
    
    async execute(client, message, args, Discord){ 

        //Check each day if the next day is a garbage day
        //0th second, 45th min, 17th hour (5pm), 23rd day of EACH day
        cron.schedule('59 6 * * *', () => {

            console.log("Starting dueReminder command");

            let channelToDelete = getChannelToSend();
            const channel = client.channels.cache.find(channel => channel.name === channelToDelete);

            const date = new Date();
            date.setHours(date.getHours() - 7); //UTC server convert

            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

            var dateString = weekDays[date.getDay()] + " " + monthNames[date.getMonth()] + " " + date.getDate();

            console.log("Deleting messages from: " + dateString);


            async function clear() {
                const fetched = await channel.messages.fetch({limit: 20});
                
                let filtering = fetched.filter((m) => m.embeds.length > 0);

                let toDelete = filtering.filter((m) => m.embeds[0].description.includes(dateString));

                channel.bulkDelete(toDelete);
            }
            clear();

            console.log("Finished due Reminder command...");
        })
    }
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
