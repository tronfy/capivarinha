import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js'
import { SlashCommand } from '../types'

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('roles')
    .setDescription('cria um seletor de cargos')
    .addStringOption(option =>
      option
        .setName('título')
        .setDescription('título do seletor')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('cargos')
        .setDescription('cargos do seletor (separados por vírgula)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('emojis')
        .setDescription('emojis de cada cargo (separados por vírgula)')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  execute: async interaction => {
    if (interaction.user.id !== process.env.OWNER_ID)
      return await interaction.reply({
        content: 'desculpe! você não tem permissão para usar esse comando.',
        ephemeral: true,
      })

    const titulo = interaction.options.data
      .find(o => o.name === 'título')
      ?.value?.toString()!

    const cargos =
      interaction.options.data
        .find(o => o.name === 'cargos')
        ?.value?.toString()
        .split(',')
        .map(e => e.trim()) || []

    const emojis =
      interaction.options.data
        .find(o => o.name === 'emojis')
        ?.value?.toString()
        .split(',')
        .map(e => e.trim()) || []

    await interaction.reply({
      embeds: [
        {
          title: titulo,
          description: cargos.map((e, i) => `${emojis[i]} **${e}**`).join('\n'),
        },
      ],
    })

    const msg = await interaction.fetchReply()
    emojis.forEach(async e => await msg.react(e))

    // FIXME: isso não configura um collector, o que deve ser feito manualmente
    // por meio de alterar o rrConfig da Guild. gambiarra a gente aceita, derrota nunca
  },
}

export default command
