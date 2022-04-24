import { Event } from "../Structures/Event"
import { BotClient } from '../BotClient';


export default class ReadyListener extends Event {
    constructor(client: BotClient) {
        super(client, {
            name: "ready"
        })
    }

    async run() {
        console.log(`Logando o ${this.client.user.tag}`)
    }
}