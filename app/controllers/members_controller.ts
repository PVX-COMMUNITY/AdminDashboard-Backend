import type { HttpContext } from '@adonisjs/core/http'
import Member from '#models/member'

export default class MembersController {
  async index({ response }: HttpContext) {
    const members = await Member.all()
    return response.json(members)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'role', 'memberjid'])
    const badges = request.input('badges') || []
    const member = await Member.create({
      ...data,
      badges,
    })
    return response.json(member)
  }

  async show({ params, response }: HttpContext) {
    const member = await Member.findOrFail(params.id)
    return response.json(member)
  }

  async update({ params, request, response }: HttpContext) {
    const member = await Member.findOrFail(params.id)
    const data = request.only(['name'])
    await member.merge(data).save()
    return response.json(member)
  }

  async destroy({ params, response }: HttpContext) {
    const member = await Member.findOrFail(params.id)
    await member.delete()
    return response.noContent()
  }
}
