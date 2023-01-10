import {
  SlashCommandBuilder,
  CommandInteraction,
  Collection,
  PermissionResolvable,
  Message,
  AutocompleteInteraction,
} from 'discord.js'

export interface SlashCommand {
  command: SlashCommandBuilder | any
  execute: (interaction: CommandInteraction) => void
}

export interface BotEvent {
  name: string
  once?: boolean | false
  execute: (...args) => void
}

export interface MinecraftUser {
  id: string
  username: string
}

export interface GuildData {
  mcUsers: MinecraftUser[]
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      CLIENT_ID: string
      WELCOME_CHANNEL_ID: string
      CONSOLE_CHANNEL_ID: string
      INFRA_ROLE_ID: string
    }
  }
}

declare module 'discord.js' {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>
    data: {
      dataDir: string
    }
  }
}
