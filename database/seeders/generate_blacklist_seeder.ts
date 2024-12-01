import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Blacklist from '#models/blacklist'
import Member from '#models/member'
import { randomUUID } from 'node:crypto'

function generateReason() {
  const reasons = [
    'Spam messages',
    'Inappropriate content',
    'Harassment',
    'Fake information',
    'Multiple warnings',
    'Scam attempts',
    'Unauthorized promotions',
    'Disruptive behavior',
    'Hate speech',
    'Policy violation',
  ]
  return reasons[Math.floor(Math.random() * reasons.length)]
}

function generateAdmin() {
  const admins = [
    '919876543210@s.whatsapp.net',
    '919876543211@s.whatsapp.net',
    '919876543212@s.whatsapp.net',
    '919876543213@s.whatsapp.net',
    '919876543214@s.whatsapp.net',
  ]
  return admins[Math.floor(Math.random() * admins.length)]
}

export default class extends BaseSeeder {
  async run() {
    // Get 20 random members to blacklist (10% of total members)
    const members = await Member.query().orderByRaw('RANDOM()').limit(100)
    const blacklistData = members.map((member) => ({
      uuid: randomUUID(),
      memberjid: member.memberjid,
      reason: generateReason(),
      admin: generateAdmin(),
    }))

    // Insert in batches of 5
    for (let i = 0; i < blacklistData.length; i += 5) {
      const batch = blacklistData.slice(i, i + 5)
      await Blacklist.createMany(batch)
    }
  }
}
