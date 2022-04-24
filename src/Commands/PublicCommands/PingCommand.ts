import { BotClient } from '../../BotClient';
import { Command } from '../../Structures/Command';
import { Message, MessageEmbed, ColorResolvable } from 'discord.js';

export default class Avatar extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'ping',
        })
    }

    async run(client: BotClient, args: string[], message: Message) {
        message.channel.send('Pong!')
    }
}