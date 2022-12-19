import { SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('mostra o ping do bot'),
  execute: interaction => {
    const bot = Date.now() - interaction.createdTimestamp
    const api = Math.round(interaction.client.ws.ping)

    interaction.reply(`🏓 pong! (bot ${bot}ms, api ${api}ms)`)
  },
}

export default command
