import { HttpContext } from '@adonisjs/core/http'
import Blacklist from '#models/blacklist'
import Member from '#models/member'
import { HandleErrors } from '../decorators.js'
import { createBlacklistValidator, updateBlacklistValidator } from '#validators/blacklist'
import Pagination from '../helpers/pagination.js'
import BlacklistSerializer from '#serializers/blacklist_serializer'

@HandleErrors()
export default class BlacklistsController {
  async index({ request, response }: HttpContext) {
    const pagination = new Pagination(Blacklist, request, ['memberjid', 'reason'])
    const blacklists = await pagination.serialize(BlacklistSerializer)
    return response.json(blacklists)
  }

  async store({ request, response }: HttpContext) {
    const payload = await createBlacklistValidator.validate(request.all())

    const bday = await Blacklist.query().where('memberjid', payload.memberjid).first()
    if (bday) {
      return response.status(400).json({ message: 'Blacklist already exists for this member' })
    }

    const member = await Member.find(payload.memberjid)
    if (!member) {
      return response.status(404).json({ message: 'Member not found' })
    }

    const blacklist = await Blacklist.create(payload)
    await blacklist.refresh()
    await blacklist.load('member')

    return response.status(201).json(blacklist)
  }

  async show({ params, response }: HttpContext) {
    const blacklist = await Blacklist.findOrFail(params.memberjid)
    await blacklist.load('member')

    return response.json(blacklist)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await updateBlacklistValidator.validate(request.all())

    const blacklist = await Blacklist.findOrFail(params.memberjid)

    blacklist.merge(payload)
    await blacklist.save()
    await blacklist.load('member')

    return response.json(blacklist)
  }

  async destroy({ params, response }: HttpContext) {
    const blacklist = await Blacklist.findOrFail(params.memberjid)
    await blacklist.delete()

    return response.status(204)
  }
}
