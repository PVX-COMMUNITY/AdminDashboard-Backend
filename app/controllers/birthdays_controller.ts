import { HttpContext } from '@adonisjs/core/http'
import Birthday from '#models/birthday'
import Member from '#models/member'

export default class BirthdaysController {
  async index({ response }: HttpContext) {
    const birthdays = await Birthday.query().preload('member')
    return response.json(birthdays)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['memberjid', 'name', 'username', 'date', 'month', 'year', 'place'])

    const bday = await Birthday.query().where('memberjid', data.memberjid).first()
    if (bday) {
      return response.status(400).json({ message: 'Birthday already exists for this member' })
    }

    const member = await Member.find(data.memberjid)
    if (!member) {
      return response.status(400).json({ message: 'Member not found' })
    }

    const birthday = await Birthday.create(data)
    await birthday.refresh()
    await birthday.load('member')

    return response.status(201).json(birthday)
  }

  async show({ params, response }: HttpContext) {
    const birthday = await Birthday.findOrFail(params.memberjid)
    await birthday.load('member')

    return response.json(birthday)
  }

  async update({ params, request, response }: HttpContext) {
    const birthday = await Birthday.findOrFail(params.memberjid)

    const data = request.only(['name', 'username', 'date', 'month', 'year', 'place'])

    birthday.merge(data)
    await birthday.save()
    await birthday.load('member')

    return response.json(birthday)
  }

  async destroy({ params, response }: HttpContext) {
    const birthday = await Birthday.findOrFail(params.memberjid)
    await birthday.delete()

    return response.status(204)
  }
}
