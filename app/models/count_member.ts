import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Member from './member.js'
import PvxGroup from './pvx_group.js'

export default class CountMember extends BaseModel {
  public static table = 'count_member'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare memberjid: string

  @column({ isPrimary: true })
  declare groupjid: string

  @column()
  declare message_count: number

  @column()
  declare warning_count: number

  @column()
  declare video_count: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Member, {
    foreignKey: 'memberjid',
  })
  declare member: BelongsTo<typeof Member>

  @belongsTo(() => PvxGroup, {
    foreignKey: 'groupjid',
  })
  declare group: BelongsTo<typeof PvxGroup>
}
