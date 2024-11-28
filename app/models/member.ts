import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import CountMember from './count_member.js'
import Blacklist from './blacklist.js'
import Birthday from './birthday.js'
import CocTag from './coc_tag.js'

export default class Member extends BaseModel {
  public static table = 'member'

  @column({ isPrimary: true })
  declare memberjid: string

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare donation: number

  @column()
  declare badges: string[]

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => CountMember)
  declare counts: HasMany<typeof CountMember>

  @hasMany(() => Blacklist)
  declare blacklists: HasMany<typeof Blacklist>

  @hasMany(() => Birthday)
  declare birthdays: HasMany<typeof Birthday>

  @hasMany(() => CocTag)
  declare cocTags: HasMany<typeof CocTag>
}
