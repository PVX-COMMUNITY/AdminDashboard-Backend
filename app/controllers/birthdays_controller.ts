import { HttpContext } from '@adonisjs/core/http'
import Birthday from '#models/birthday'
import Member from '#models/member'
import { HandleErrors } from '../decorators.js'
import { createBirthdayValidator, updateBirthdayValidator } from '#validators/birthday'
import Pagination from '../helpers/pagination.js'
import BirthdaySerializer from '#serializers/birthday_serializer'

@HandleErrors()
export default class BirthdaysController {
  async index({ request, response }: HttpContext) {
    const pagination = new Pagination(Birthday, request, ['date', 'month', 'year'])
    const birthdays = await pagination.serialize(BirthdaySerializer)
    return response.json(birthdays)
  }

  async store({ request, response }: HttpContext) {
    const payload = await createBirthdayValidator.validate(request.all())

    const bday = await Birthday.query().where('memberjid', payload.memberjid).first()
    if (bday) {
      return response.status(400).json({ message: 'Birthday already exists for this member' })
    }

    const member = await Member.find(payload.memberjid)
    if (!member) {
      return response.status(404).json({ message: 'Member not found' })
    }

    const birthday = await Birthday.create(payload)
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
    const payload = await updateBirthdayValidator.validate(request.all())

    const birthday = await Birthday.findOrFail(params.memberjid)

    birthday.merge(payload)
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
