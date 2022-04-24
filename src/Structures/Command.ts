import { Client, Message } from 'discord.js';
import { BotClient } from '../BotClient';
export interface Command {
    client: Client;
    commandSettings: CommandOptions
}
export interface CommandOptions {
    name: string;
    description?: string;
    aliases?: string[];
    cooldown?: number;
    admin?: boolean;
    roles?: string[];
}
export class Command {
    constructor(client: Client, options: CommandOptions) {
        this.client = client;
        this.commandSettings = {
            name: options.name || null,
            description: options?.description || 'Sem descrição',
            aliases: options?.aliases || [],
            cooldown: options?.cooldown || 3,
            admin: options?.admin || false,
            roles: options?.roles || []
        }
    }
    async run(client: BotClient, args: string[], message: Message): Promise<void | Message> {}
}