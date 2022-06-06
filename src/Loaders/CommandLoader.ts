import { readdir } from 'fs'
import chalk from 'chalk';
import { BotClient } from '../BotClient';
import { Command } from '../Structures/Command';

export default class CommandLoader {
    constructor(client: BotClient) {
        readdir(`./${process.env.ENV == 'PROD' ? 'dist' : 'src'}/Commands`, (err, f) => {
            if (err) throw new RangeError("Command Loader Error: " + err)
            f.forEach(category => {
                readdir(`./${process.env.ENV == 'PROD' ? 'dist' : 'src'}/Commands/${category}`, async (err, cmd) => {
                    for (let i = 0; i < cmd.length; i++) {
                        const e = cmd[i];
                        if (err) return console.error(' | [ COMMANDS ]  ' + err)
                        
                        const CommandFile = require(`../Commands/${category}/${e}`)
                        const Command = CommandFile.default
                        delete require.cache[require.resolve(`../Commands/${category}/${e}`)]
                        const command: Command = new Command(client)

                        client.commands.set(command.commandSettings.name, command)

                        if (command.commandSettings.canSlash == true) {
                            client.commandsArray.push(command.commandSettings)
                        }

                        command.commandSettings.aliases.forEach(aliases => client.aliases.set(aliases, command.commandSettings.name))

                        console.log(' | ' + '[ COMMANDS ]  ' + e.replace('.js', '').replace('.ts', '').replace('Command', '') + ' - Command Loaded with Sucess')
                    }
                })
            })
        })
    }
}