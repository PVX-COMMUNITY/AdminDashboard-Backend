import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Auth extends BaseModel {
  public static table = 'auth'

  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare noisekey: string | null

  @column()
  declare signedidentitykey: string | null

  @column()
  declare signedprekey: string | null

  @column()
  declare registrationid: string | null

  @column()
  declare advsecretkey: string | null

  @column()
  declare nextprekeyid: string | null

  @column()
  declare firstunuploadedprekeyid: string | null

  @column()
  declare account: string | null

  @column()
  declare me: string | null

  @column()
  declare signalidentities: string | null

  @column()
  declare lastaccountsynctimestamp: string | null

  @column()
  declare myappstatekeyid: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
