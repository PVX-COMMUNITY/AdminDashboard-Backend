import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Voting extends BaseModel {
  public static table = 'voting'

  @column()
  declare uuid: string

  @column({ isPrimary: true })
  declare groupjid: string

  @column()
  declare is_started: boolean

  @column()
  declare started_by: string

  @column()
  declare title: string

  @column()
  declare choices: string[]

  @column()
  declare count: string[]

  @column()
  declare members_voted_for: string[][]

  @column()
  declare voted_members: string[]

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
