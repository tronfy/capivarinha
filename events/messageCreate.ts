import { Message } from 'discord.js'
import { BotEvent } from '../types'

const event: BotEvent = {
  name: 'messageCreate',
  execute: (message: Message) => {
    if (message.author.bot) return

    console.log('[message]', message.author.tag + ':', message.content)
  },
}

export default event
