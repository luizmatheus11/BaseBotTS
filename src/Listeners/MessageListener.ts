
const { PREFIX } = process.env;
import ms from 'ms';
import { Event } from '../Structures/Event';
import { Message } from 'discord.js';
import { BotClient } from '../BotClient';

export default class MessageListener extends Event {
  constructor(client: BotClient) {
    super(client, {
      name: "messageCreate"
    })
  }

  async run(message: Message): Promise<Message> {
    if (message.author.bot) return;

    let prefix = PREFIX;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g)

    const command = args.shift().toLowerCase()

    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))

    if (!cmd) return
    if (this.client.cooldown.has(message.author.id) && !message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(`Você está em tempo de espera de ${ms(cmd.commandSettings.cooldown)} `)


    if (cmd.commandSettings.admin) {

      if (cmd.commandSettings.admin == true || cmd.commandSettings.roles[0]) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return
      }
      cmd.run(this.client, args, message)
      this.client.cooldown.set(message.author.id, cmd.commandSettings.cooldown)

      setTimeout(() => {
        this.client.cooldown.delete(message.author.id)
      }, cmd.commandSettings.cooldown)
    } else {
      cmd.run(this.client, args, message)
      this.client.cooldown.set(message.author.id, cmd.commandSettings.cooldown)

      setTimeout(() => {
        this.client.cooldown.delete(message.author.id)
      }, cmd.commandSettings.cooldown)
    }
  }
}