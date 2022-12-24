import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('cria uma votação')
    .addStringOption(option =>
      option
        .setName('pergunta')
        .setDescription('pergunta da votação')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('opções')
        .setDescription('textos das opções da votação (separados por vírgula)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('emojis')
        .setDescription('emojis das opções da votação (separados por vírgula)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  execute: async interaction => {
    const pergunta = interaction.options.data
      .find(o => o.name === 'pergunta')
      ?.value?.toString()!

    const opcoes =
      interaction.options.data
        .find(o => o.name === 'opções')
        ?.value?.toString()
        .split(',')
        .map(e => e.trim()) || []

    const emojis =
      interaction.options.data
        .find(o => o.name === 'emojis')
        ?.value?.toString()
        .split(',')
        .map(e => e.trim()) || []

    if (opcoes.length !== emojis.length) {
      await interaction.reply({
        content: 'erro: o número de opções deve ser igual ao número de emojis',
        ephemeral: true,
      })
      return
    }

    await interaction.reply({
      embeds: [
        {
          title: pergunta,
          description: opcoes.map((e, i) => `${emojis[i]} **${e}**`).join('\n'),
        },
      ],
    })

    const msg = await interaction.fetchReply()
    emojis.forEach(async e => await msg.react(e))
  },
}

export default command
