import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Member from './member.js'

export default class Blacklist extends BaseModel {
  public static table = 'blacklist'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare memberjid: string

  @column()
  declare reason: string

  @column()
  declare admin: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Member, {
    foreignKey: 'memberjid',
  })
  declare member: BelongsTo<typeof Member>
}
