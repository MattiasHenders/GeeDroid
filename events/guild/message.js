require("dotenv").config();

module.exports = async (Discord, client, message) => {

    const prefix = process.env.PREFIX;

    //If the message is not a command or IS from a bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) {
        command.execute(client, message, args, Discord);
    }
}