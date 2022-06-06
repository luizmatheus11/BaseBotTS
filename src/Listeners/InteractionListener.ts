import { Event } from "../Structures/Event"
import { Interaction, MessageButton, MessageActionRow } from 'discord.js';
import { BotClient } from '../BotClient';


export default class InteractionCreate extends Event {
    constructor(client: BotClient) {
        super(client, {
            name: "interactionCreate"
        })
    }

    async run(i: Interaction) {
        if (i.isCommand()) {
            const cmd = this.client.commands.get(i.commandName) || this.client.commands.get(this.client.aliases.get(i.commandName))
            if (cmd) {
                if (cmd.commandSettings.admin || cmd.commandSettings.roles[0]) {
                    let member = i.guild.members.cache.get(i.user.id)
                    if (!member.permissions.has('ADMINISTRATOR') && !cmd.commandSettings.roles.some(x => member.roles.cache.has(x))) return i.reply({ content: 'Você não tem permissão de usar este comando', ephemeral: true })
                    cmd.runSlash(i)
                } else {
                    cmd.runSlash(i)
                }
            }
        }
    }

}