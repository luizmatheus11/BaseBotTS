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

    }

}