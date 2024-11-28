import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import CountMember from './count_member.js'

export default class PvxGroup extends BaseModel {
  public static table = 'pvx_group'

  @column({ isPrimary: true })
  declare groupjid: string

  @column()
  declare uuid: string

  @column()
  declare gname: string

  @column()
  declare link: string | null

  @column()
  declare commands_disabled: string[]

  @column()
  declare type: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => CountMember)
  declare counts: HasMany<typeof CountMember>
}
