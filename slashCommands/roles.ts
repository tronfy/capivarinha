import {
  CollectorFilter,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js'
import { userInfo } from 'os'
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

    // TODO: usar um collector para escutar por reações
    // TODO: adicionar/remover os cargos

    // // msg.awaitReactions({ filter: () => true }).then(collected => {
    // //   console.log(collected)
    // // })

    // const collector = msg.createReactionCollector({
    //   filter: (reaction, user) => true,
    //   time: 15000,
    // })

    // collector.on('collect', (reaction, user) => {
    //   console.log(`Collected ${reaction.emoji.name} from ${user.tag}`)
    // })

    // collector.on('end', collected => {
    //   console.log(`Collected ${collected.size} items`)
    // })
  },
}

export default command
