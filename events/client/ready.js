module.exports = (Discord, client, message) => {
    console.log("Gee Droid is online!");
    startReminder(Discord, client, message);
}

//Start reminder for due dates
function startReminder(Discord, client, message) {

    console.log("Starting due date reminder.")
    const command = client.commands.get('dueReminder');

    if (command) {
        command.execute(client, message, "", Discord);
        console.log("Due date reminder is scheduled.")
    }
}
