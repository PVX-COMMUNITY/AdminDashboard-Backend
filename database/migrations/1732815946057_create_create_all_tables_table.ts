import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    // Auth Table
    this.schema.createTable('auth', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('noisekey')
      table.text('signedidentitykey')
      table.text('signedprekey')
      table.text('registrationid')
      table.text('advsecretkey')
      table.text('nextprekeyid')
      table.text('firstunuploadedprekeyid')
      table.text('account')
      table.text('me')
      table.text('signalidentities')
      table.text('lastaccountsynctimestamp')
      table.text('myappstatekeyid')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // Member Table
    this.schema.createTable('member', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('memberjid').primary()
      table.text('name').notNullable()
      table.integer('donation').defaultTo(0)
      table.specificType('badges', 'TEXT[]').notNullable()
      table.text('role').notNullable().defaultTo('member')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // PVX Group Table
    this.schema.createTable('pvx_group', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('groupjid').primary()
      table.text('gname').notNullable()
      table.text('link')
      table.specificType('commands_disabled', 'TEXT[]').notNullable()
      table.text('type').notNullable().defaultTo('whatsapp')
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // Count Member Table
    this.schema.createTable('count_member', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('memberjid').notNullable()
      table.text('groupjid').notNullable()
      table.integer('message_count').notNullable().defaultTo(0)
      table.integer('warning_count').notNullable().defaultTo(0)
      table.integer('video_count').notNullable().defaultTo(0)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.primary(['memberjid', 'groupjid'])
      table.check('warning_count >= 0 AND warning_count <= 3')
      table.foreign('groupjid').references('groupjid').inTable('pvx_group')
      table.foreign('memberjid').references('memberjid').inTable('member')
    })

    // Count Member Month Table
    this.schema.createTable('count_member_month', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('memberjid').notNullable()
      table.text('groupjid').notNullable()
      table.integer('message_count').notNullable().defaultTo(0)
      table.integer('warning_count').notNullable().defaultTo(0)
      table.integer('video_count').notNullable().defaultTo(0)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.primary(['memberjid', 'groupjid'])
      table.check('warning_count >= 0 AND warning_count <= 3')
      table.foreign('groupjid').references('groupjid').inTable('pvx_group')
      table.foreign('memberjid').references('memberjid').inTable('member')
    })

    // Blacklist Table
    this.schema.createTable('blacklist', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('memberjid').primary()
      table.text('reason').notNullable()
      table.text('admin').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.foreign('memberjid').references('memberjid').inTable('member')
    })

    // Birthday Table
    this.schema.createTable('birthday', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('memberjid').primary()
      table.text('name').notNullable()
      table.text('username').notNullable()
      table.integer('date').notNullable()
      table.integer('month').notNullable()
      table.integer('year')
      table.text('place').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.foreign('memberjid').references('memberjid').inTable('member')
    })

    // Meta Table
    this.schema.createTable('meta', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('variable').primary()
      table.boolean('value').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // News Table
    this.schema.createTable('news', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('headline').primary()
      table.date('at').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // Badge Table
    this.schema.createTable('badge', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.increments('sno')
      table.text('badge_info').primary()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // Voting Table
    this.schema.createTable('voting', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('groupjid').primary()
      table.boolean('is_started').notNullable()
      table.text('started_by').notNullable()
      table.text('title').notNullable()
      table.specificType('choices', 'TEXT[]').notNullable()
      table.specificType('count', 'TEXT[]').notNullable()
      table.specificType('members_voted_for', 'TEXT[][]').notNullable()
      table.specificType('voted_members', 'TEXT[]').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // Unknown Command Table
    this.schema.createTable('unknown_cmd', (table) => {
      table.uuid('uuid').defaultTo(this.raw('gen_random_uuid()'))
      table.text('command').primary()
      table.integer('count').notNullable().defaultTo(0)
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })

    // COC Tag Table
    this.schema.createTable('coc_tag', (table) => {
      table.text('tag').primary()
      table.text('memberjid').notNullable()
      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
      table.foreign('memberjid').references('memberjid').inTable('member')
    })
  }

  async down() {
    // Drop tables in reverse order to handle foreign key constraints
    this.schema.dropTable('unknown_cmd')
    this.schema.dropTable('voting')
    this.schema.dropTable('badge')
    this.schema.dropTable('news')
    this.schema.dropTable('meta')
    this.schema.dropTable('birthday')
    this.schema.dropTable('blacklist')
    this.schema.dropTable('count_member_month')
    this.schema.dropTable('count_member')
    this.schema.dropTable('pvx_group')
    this.schema.dropTable('member')
    this.schema.dropTable('auth')
    this.schema.dropTable('coc_tag')
  }
}
