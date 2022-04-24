import { BotClient } from './BotClient';
require('dotenv').config();
const client = new BotClient({
    token: process.env.TOKEN
})

client.start()