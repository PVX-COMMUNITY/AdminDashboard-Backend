import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Member from './member.js'

export default class CocTag extends BaseModel {
  public static table = 'coc_tag'

  @column({ isPrimary: true })
  declare tag: string

  @column()
  declare memberjid: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Member, {
    foreignKey: 'memberjid',
  })
  declare member: BelongsTo<typeof Member>
}
