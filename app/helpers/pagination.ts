import { LucidModel, LucidRow } from '@adonisjs/lucid/types/model'
import { HttpContext } from '@adonisjs/core/http'
import BaseSerializer from '#serializers/base_serializer'

export class Pagination<T extends LucidModel> {
  protected model: T
  protected request: HttpContext['request']

  constructor(model: T, request: HttpContext['request']) {
    this.model = model
    this.request = request
  }

  async serialize<M extends LucidRow>(Serializer: typeof BaseSerializer<M>) {
    const paginated = await this.paginate()
    const data = await new Serializer(paginated.all() as M[]).toJSON()
    return {
      data,
      meta: {
        total: paginated.total,
        per_page: paginated.perPage,
        current_page: paginated.currentPage,
        last_page: paginated.lastPage,
      },
    }
  }

  async paginate() {
    const query = this.model.query()
    const page = this.request.input('page', 1)
    const limit = this.request.input('limit', 10)
    return await query.paginate(page, limit)
  }
}

export default Pagination
