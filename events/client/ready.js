module.exports = (Discord, client, message) => {
    console.log("Gee Droid is online!");
    startReminder(client);
}

//Start reminder for due dates
function startReminder(client) {

    console.log("Starting due date reminder.")
    const command = client.commands.get('dueReminder');

    if (command) {
        command.execute(client);
        console.log("Due date reminder is scheduled.")
    }
}
