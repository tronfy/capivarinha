import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js'
const {
  Guilds,
  MessageContent,
  GuildMessages,
  GuildMembers,
  GuildMessageReactions,
} = GatewayIntentBits
const { Message, Reaction } = Partials

const client = new Client({
  partials: [Message, Reaction],
  intents: [
    Guilds,
    MessageContent,
    GuildMessages,
    GuildMembers,
    GuildMessageReactions,
  ],
})

import { SlashCommand } from './types'
import { config } from 'dotenv'
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import path, { join } from 'path'
import {
  ReactionRole,
  ReactionRoleConfiguration,
} from 'discordjs-reaction-role'
config()

client.data = {
  dataDir: './data',
}

client.slashCommands = new Collection<string, SlashCommand>()

const handlersDir = join(__dirname, './handlers')
readdirSync(handlersDir).forEach(handler => {
  require(`${handlersDir}/${handler}`)(client)
})

const rrConfigFile = path.join(client.data.dataDir, 'rrConfig.json')
if (!existsSync(rrConfigFile)) writeFileSync(rrConfigFile, '[]')
const rrConfig: ReactionRoleConfiguration[] = JSON.parse(
  readFileSync(rrConfigFile, 'utf-8')
)

const rr: ReactionRole = new ReactionRole(client, rrConfig)

client.login(process.env.TOKEN)

const destroy = () => {
  rr.teardown()
  client.destroy()
}
process.on('SIGINT', destroy)
process.on('SIGTERM', destroy)
