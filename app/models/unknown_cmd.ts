import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class UnknownCmd extends BaseModel {
  public static table = 'unknown_cmd'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare command: string

  @column()
  declare count: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
