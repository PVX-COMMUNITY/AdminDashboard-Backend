import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Meta extends BaseModel {
  public static table = 'meta'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare variable: string

  @column()
  declare value: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
