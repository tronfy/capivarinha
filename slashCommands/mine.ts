import { GuildMember, SlashCommandBuilder } from 'discord.js'
import { readFileSync, writeFileSync } from 'fs'
import { GuildData, SlashCommand } from '../types'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('mine')
    .setDescription('adiciona seu username à lista do servidor')
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription('seu nome no minecraft')
        .setRequired(true)
    ),
  execute: interaction => {
    const nickname = interaction.options.data
      .find(o => o.name === 'username')
      ?.value?.toString()!

    if (!interaction.guild) return
    const guildDataPath = `${interaction.client.data.dataDir}/${interaction.guild.id}.json`
    const guildData = JSON.parse(
      readFileSync(guildDataPath, 'utf-8')
    ) as GuildData

    const userId = interaction.user.id
    if (
      guildData.mcUsers.find(u => u.id === userId) !== undefined ||
      guildData.mcUsers.find(u => u.username === nickname) !== undefined
    ) {
      interaction.reply({
        content: `seu username já está registrado no servidor.\nse achar que isso é um erro, marque <@&${process.env.INFRA_ROLE_ID}> para ajuda`,
        ephemeral: true,
      })
      return
    }

    if (!(interaction.member instanceof GuildMember)) return
    interaction.member.setNickname(nickname).catch(() => {})

    if (!interaction.guild) return
    const channel = interaction.guild.channels.cache.get(
      process.env.CONSOLE_CHANNEL_ID
    )
    if (!channel || !channel.isTextBased()) return
    channel.send(`${interaction.user.tag} registrou-se como \`${nickname}\``)

    guildData.mcUsers.push({ id: userId, username: nickname })
    writeFileSync(guildDataPath, JSON.stringify(guildData, null, 2))

    interaction.reply({
      content: `valeu, **${nickname}**! seu username foi registrado com sucesso.`,
    })
  },
}

export default command
