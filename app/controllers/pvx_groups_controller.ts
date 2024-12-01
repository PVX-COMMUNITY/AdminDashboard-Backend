import { HttpContext } from '@adonisjs/core/http'

import PvxGroup from '#models/pvx_group'
import { HandleErrors } from '../decorators.js'
import { createPvxGroupValidator, updatePvxGroupValidator } from '#validators/pvx_group'
import Pagination from '../helpers/pagination.js'
import PvxGroupSerializer from '#serializers/pvx_group_serializer'

@HandleErrors()
export default class PvxGroupsController {
  async index({ request, response }: HttpContext) {
    const pagination = new Pagination(PvxGroup, request, ['groupjid', 'gname'])
    const pvxGroups = await pagination.serialize(PvxGroupSerializer)
    return response.json(pvxGroups)
  }

  async store({ request, response }: HttpContext) {
    const payload = await createPvxGroupValidator.validate(request.all())

    const isPvxGroupAlreadyExists = await PvxGroup.query()
      .where('groupjid', payload.groupjid)
      .first()
    if (isPvxGroupAlreadyExists) {
      return response.status(400).json({ message: 'Pvx group with this groupjid already exists' })
    }

    const pvxGroup = await PvxGroup.create(payload)
    await pvxGroup.refresh()

    return response.status(201).json(pvxGroup)
  }

  async show({ params, response }: HttpContext) {
    const pvxGroup = await PvxGroup.findOrFail(params.groupjid)

    return response.json(pvxGroup)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await updatePvxGroupValidator.validate(request.all())
    const pvxGroup = await PvxGroup.findOrFail(params.groupjid)
    pvxGroup.merge(payload)
    await pvxGroup.save()
    return response.json(pvxGroup)
  }

  async destroy({ params, response }: HttpContext) {
    const pvxGroup = await PvxGroup.findOrFail(params.groupjid)
    await pvxGroup.delete()
    return response.status(204)
  }
}
