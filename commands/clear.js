require("dotenv").config();

module.exports = {
    name: 'clear',
    description: "Removes ALL reminders",
    
    async execute(client, message, args, Discord){ 

        console.log("Starting clear command");

        //Args Checks
        if (args.length != 0) {
            message.author.send("You have entered arguments, it should just be '-clear'");
            return;
        }

        //TODO: Add a way to clear all tasks if admin

        message.author.send("Cleared all previous tasks! Enter a new one anytime.");
        
        console.log("Finished clear command...");
    }
}

