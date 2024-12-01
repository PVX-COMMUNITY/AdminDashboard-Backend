import { LucidRow } from '@adonisjs/lucid/types/model'

class BaseSerializer<T extends LucidRow> {
  model: T | T[]

  constructor(model: T | T[]) {
    this.model = model
  }

  async toJSON() {
    if (Array.isArray(this.model)) {
      return this.model.map((model) => model.toJSON())
    }
    return this.model.toJSON()
  }
}

export default BaseSerializer
