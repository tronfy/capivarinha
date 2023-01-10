import { ActivityType, Client } from 'discord.js'
import { BotEvent, GuildData } from '../types'

import fs from 'fs'

const event: BotEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client) => {
    client.user?.setPresence({
      activities: [{ name: 'Minecraft', type: ActivityType.Playing }],
    })

    // create data dir if needed
    if (!fs.existsSync(client.data.dataDir)) fs.mkdirSync(client.data.dataDir)

    // create data file for each guild if needed
    client.guilds.cache.forEach(guild => {
      const guildDataPath = `${client.data.dataDir}/${guild.id}.json`
      const guildData: GuildData = {
        mcUsers: [],
      }
      if (!fs.existsSync(guildDataPath))
        fs.writeFileSync(guildDataPath, JSON.stringify(guildData, null, 2))
    })

    console.log(`[login] ${client.user?.tag}`)
  },
}

export default event
