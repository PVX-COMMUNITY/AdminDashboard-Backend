import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Member from './member.js'

export default class Birthday extends BaseModel {
  public static table = 'birthday'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare memberjid: string

  @column()
  declare name: string

  @column()
  declare username: string

  @column()
  declare date: number

  @column()
  declare month: number

  @column()
  declare year: number | null

  @column()
  declare place: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Member, {
    foreignKey: 'memberjid',
  })
  declare member: BelongsTo<typeof Member>
}
