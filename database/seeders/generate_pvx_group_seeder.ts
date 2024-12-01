import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PvxGroup from '#models/pvx_group'
import { randomUUID } from 'node:crypto'

function generateGroupJid() {
  return `${Math.floor(Math.random() * 9000000000 + 1000000000)}@g.us`
}

function generateGroupName() {
  const prefixes = ['PVX', 'Team', 'Group', 'Community', 'Hub']
  const suffixes = ['Main', 'Chat', 'Gaming', 'Casual', 'Tech', 'Development', 'Discussion']

  return `${prefixes[Math.floor(Math.random() * prefixes.length)]} ${
    suffixes[Math.floor(Math.random() * suffixes.length)]
  }`
}

export default class extends BaseSeeder {
  async run() {
    const groupsData = []

    for (let i = 0; i < 200; i++) {
      groupsData.push({
        uuid: randomUUID(),
        groupjid: generateGroupJid(),
        gname: generateGroupName(),
        link: Math.random() > 0.3 ? `https://chat.whatsapp.com/${randomUUID()}` : null, // 70% chance of having a link
        commands_disabled: Math.random() > 0.5 ? ['warn', 'kick'] : [], // 50% chance of having disabled commands
        type: Math.random() > 0.2 ? 'group' : 'broadcast', // 80% chance of being a group
      })
    }

    // Insert in batches of 5
    for (let i = 0; i < groupsData.length; i += 5) {
      const batch = groupsData.slice(i, i + 5)
      await PvxGroup.createMany(batch)
    }
  }
}
