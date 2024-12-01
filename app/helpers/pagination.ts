import { LucidModel, LucidRow } from '@adonisjs/lucid/types/model'
import { HttpContext } from '@adonisjs/core/http'
import BaseSerializer from '#serializers/base_serializer'

export class Pagination<T extends LucidModel> {
  protected model: T
  protected request: HttpContext['request']
  protected search: string[]

  constructor(model: T, request: HttpContext['request'], search: string[] = []) {
    this.model = model
    this.request = request
    this.search = search
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
    const search = this.request.input('search', '')

    return await query
      .where((qur) => {
        if (search) {
          const searchQuery = search.toLowerCase()
          qur.where((subQuery) => {
            this.search.forEach((field, index) => {
              if (index === 0) {
                subQuery.whereRaw(`LOWER(CAST(${field} AS TEXT)) LIKE ?`, [`%${searchQuery}%`])
              } else {
                subQuery.orWhereRaw(`LOWER(CAST(${field} AS TEXT)) LIKE ?`, [`%${searchQuery}%`])
              }
            })
          })
        }
        return qur
      })
      .orderBy('created_at', 'desc')
      .paginate(page, limit)
  }
}

export default Pagination
