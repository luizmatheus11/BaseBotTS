
import { Utils } from './Classes/Utils';
import CommandLoader from './Loaders/CommandLoader';
import EventsLoader from './Loaders/EventsLoader';
import { Command, CommandOptions } from './Structures/Command';
import prisma, { repository } from './Database/index';
import { Collection, Client, ApplicationCommandDataResolvable } from 'discord.js';

interface BotClientOptions {
    token: string;
    databaseuri?: string;
}
export interface BotClient {
    token: string;
    commands: Collection<string, Command>
    aliases: Collection<string, string>
    cooldown: Collection<string, number>
    utils: Utils
    database: typeof prisma
    repository: typeof repository
    commandsArray: Array<CommandOptions>
}
export class BotClient extends Client {
    constructor(options: BotClientOptions) {
        super({ intents: 32767, partials: ['CHANNEL'] });
        this.token = options.token;
        this.commands = new Collection()
        this.aliases = new Collection()
        this.cooldown = new Collection()
        this.utils = new Utils()
        this.database = prisma
        this.repository = repository
        this.commandsArray = []
    }

    async registryCommands() {
        let guilds = await this.database.guild.findMany()
        for (const guild of guilds) {
            this.guilds.cache.get(guild.id).commands.set(this.commandsArray as ApplicationCommandDataResolvable[])
        }
        console.log('Slash Commands carregados com sucesso!')
    }

    start() {
        this.initLoaders()
        super.login(this.token)
        return this;
    }

    initLoaders() {
        new EventsLoader(this)
        new CommandLoader(this)

    }

}