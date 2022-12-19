import { Interaction } from 'discord.js'
import { BotEvent } from '../types'

const event: BotEvent = {
  name: 'interactionCreate',
  execute: (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return

    console.log(
      '[interaction]',
      interaction.user.tag + ':',
      interaction.commandName
    )

    let command = interaction.client.slashCommands.get(interaction.commandName)
    if (!command) return
    command.execute(interaction)
  },
}

export default event
