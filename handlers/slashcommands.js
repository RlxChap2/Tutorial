const { REST, Collection, ApplicationCommandType, Events, Routes } = require('discord.js');
const { token } = require('../config.json');
const rest = new REST({ version: '10' }).setToken(token);
const { readdirSync } = require('node:fs');
const ascii = require("ascii-table");
const table = new ascii("SlashCommands").setJustify();

module.exports = (client) => {
    const commands = [];
    client.commands = new Collection();

    readdirSync('./SlashCommands').forEach(folder => {
        const commandFile = readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFile) {
            const command = require(`../SlashCommands/${folder}/${file}`);
            if(command.name && command.description) {
                commands.push({
                    type: ApplicationCommandType.ChatInput,
                    name: command.name,
                    description: command.description,
                    options: command.options || []
                })
                client.commands.set(command.name, command)
                table.addRow(`/${command.name}`, '🟢 Working')
            } else if (command.data?.name && command.data?.description) {
                commands.push(command.data.toJSON());
                client.commands.set(command.data.name, command)
                table.addRow(`/${command.data.name}`, '🟢 Working')
            } else {
                table.addRow(file, '🔴 Not Working')
            }
        }
    })
    console.log(table.toString())

    client.once(Events.ClientReady, async (c) => {
        try {
            const data = await rest.put(
                Routes.applicationCommands(c.user.id),
                { body: commands }
            )
            await console.log(`🟢 | Started refreshing ${commands.length} application (/) commands.`)
            await console.log(`🟢 | Successfully reloaded ${data.length} application (/) commands.`)
        } catch (error) {
            console.error(error)
        }
    })
}