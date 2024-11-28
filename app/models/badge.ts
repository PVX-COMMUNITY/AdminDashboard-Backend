import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Badge extends BaseModel {
  public static table = 'badge'

  @column()
  declare uuid: string

  @column()
  declare sno: number

  @column({ isPrimary: true })
  declare badge_info: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
