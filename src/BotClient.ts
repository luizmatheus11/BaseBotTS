import { Client, Collection} from 'discord.js';
import { Utils } from './Classes/Utils';
import CommandLoader from './Loaders/CommandLoader';
import EventsLoader from './Loaders/EventsLoader';

import { Command } from './Structures/Command';
import prisma from './Database/index';
import { Repository } from './Database/repository';

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
    repository: Repository
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
        this.repository = new Repository()
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