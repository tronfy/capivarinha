import { Client, GuildMember } from 'discord.js'
import { BotEvent } from '../types'

const event: BotEvent = {
  name: 'guildMemberAdd',
  execute: (member: GuildMember) => {
    const guild = member.guild

    const channel = guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID)
    if (!channel || !channel.isTextBased()) return
    channel.send(`boas vindas ao CapivaraSMP, ${member}! 👋`)

    const role = guild.roles.cache.find(role => role.name === 'player')
    if (!role) return
    member.roles.add(role)
  },
}

export default event
