import { Message, Interaction, ApplicationCommandOption } from 'discord.js';
import { BotClient } from '../BotClient';
export interface Command {
    client: BotClient;
    commandSettings: CommandOptions
}
export interface CommandOptions {
    name: string;
    description?: string;
    aliases?: string[];
    cooldown?: number;
    admin?: boolean;
    roles?: string[];
    canSlash?: boolean
    options?: Array<ApplicationCommandOption>
}
export class Command {
    constructor(client: BotClient, options: CommandOptions) {
        this.client = client;
        this.commandSettings = {
            name: options.name || null,
            description: options?.description || 'Sem descrição',
            aliases: options?.aliases || [],
            cooldown: options?.cooldown || 3,
            admin: options?.admin || false,
            roles: options?.roles || [],
            canSlash: options?.canSlash || false,
            options: options?.options || []
        }
    }
    async run(client: BotClient, args: string[], message: Message): Promise<void | Message> {}
    async runSlash(i: Interaction) {}
}