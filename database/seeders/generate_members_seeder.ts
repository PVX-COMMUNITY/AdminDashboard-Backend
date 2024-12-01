import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Member from '#models/member'
import Birthday from '#models/birthday'
import { randomUUID } from 'node:crypto'

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function generateName() {
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Emma',
    'William',
    'Olivia',
    'James',
    'Sophia',
    'Alexander',
    'Isabella',
    'David',
    'Mia',
    'Joseph',
    'Charlotte',
    'Daniel',
    'Ava',
    'Matthew',
    'Amelia',
    'Andrew',
    'Harper',
  ]

  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ]

  return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }`
}

function generatePhone() {
  return `91${Math.floor(Math.random() * 9000000000 + 1000000000)}`
}

function generatePlace() {
  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
  ]
  return cities[Math.floor(Math.random() * cities.length)]
}

export default class extends BaseSeeder {
  async run() {
    const membersData = []
    const birthdaysData = []

    for (let i = 0; i < 200; i++) {
      const memberjid = `${generatePhone()}@s.whatsapp.net`
      const name = generateName()
      const birthDate = randomDate(new Date(1970, 0, 1), new Date(2005, 11, 31))

      membersData.push({
        uuid: randomUUID(),
        memberjid,
        name,
        donation: Math.floor(Math.random() * 1000),
        badges: ['newbie'],
        role: Math.random() < 0.1 ? 'moderator' : 'member', // 10% chance of being moderator
      })

      birthdaysData.push({
        uuid: randomUUID(),
        memberjid,
        name,
        username: name.toLowerCase().replace(' ', '_'),
        date: birthDate.getDate(),
        month: birthDate.getMonth() + 1,
        year: birthDate.getFullYear(),
        place: generatePlace(),
      })
    }

    for (let i = 0; i < membersData.length; i += 50) {
      const membersBatch = membersData.slice(i, i + 50)
      const birthdaysBatch = birthdaysData.slice(i, i + 50)

      await Member.createMany(membersBatch)
      await Birthday.createMany(birthdaysBatch)
    }
  }
}
