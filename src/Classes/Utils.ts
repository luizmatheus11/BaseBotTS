import { Message, MessageEmbed } from 'discord.js';
export class Utils {
    public deleteMessage(message: Message, time:number) {
        setTimeout(() => message.delete(), time)
    }
    public chunkArray(array, count) {
        const newArr = []
        for (var i = 0; i < array.length; i+=count)
          newArr[i/count] = array.slice(i, i+count)
        return newArr
      }
}