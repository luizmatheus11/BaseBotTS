import { Event } from "../Structures/Event";
import { BotClient } from '../BotClient';
import { VoiceState } from "discord.js";

export default class VoiceStateUpdate extends Event {
    constructor(client: BotClient) {
        super(client, {
            name: 'voiceStateUpdate'
        })
    }

    async run(oldState: VoiceState, newState: VoiceState) {
    }
}