import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class News extends BaseModel {
  public static table = 'news'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare headline: string

  @column.date()
  declare at: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
