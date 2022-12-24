import { ActivityType, Client } from 'discord.js'
import { BotEvent } from '../types'

const event: BotEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    client.user?.setPresence({
      activities: [{ name: 'Minecraft', type: ActivityType.Playing }],
    })

    console.log(`[login] ${client.user?.tag}`)
  },
}

export default event
