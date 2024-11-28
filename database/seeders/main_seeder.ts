import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Member from '#models/member'
import PvxGroup from '#models/pvx_group'
import Auth from '#models/auth'
import CountMember from '#models/count_member'
import CountMemberMonth from '#models/count_member_month'
import Blacklist from '#models/blacklist'
import Birthday from '#models/birthday'
import Meta from '#models/meta'
import News from '#models/news'
import Badge from '#models/badge'
import Voting from '#models/voting'
import UnknownCmd from '#models/unknown_cmd'
import CocTag from '#models/coc_tag'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // 1. Create Member (as other tables depend on it)
    const member = await Member.create({
      memberjid: '919876543210@s.whatsapp.net',
      name: 'Test User',
      donation: 0,
      badges: ['newbie'],
      role: 'member',
    })

    // 2. Create PVX Group
    const group = await PvxGroup.create({
      groupjid: '123456789@g.us',
      gname: 'Test Group',
      link: 'https://chat.whatsapp.com/test',
      commands_disabled: [],
      type: 'whatsapp',
    })

    // 3. Create Auth
    await Auth.create({
      noisekey: 'test_noise',
      signedidentitykey: 'test_identity',
      signedprekey: 'test_prekey',
      registrationid: 'test_reg',
      advsecretkey: 'test_secret',
      nextprekeyid: 'test_next',
      firstunuploadedprekeyid: 'test_first',
      account: 'test_account',
      me: 'test_me',
      signalidentities: 'test_signal',
      lastaccountsynctimestamp: 'test_timestamp',
      myappstatekeyid: 'test_state',
    })

    // 4. Create Count Member
    await CountMember.create({
      memberjid: member.memberjid,
      groupjid: group.groupjid,
      message_count: 10,
      warning_count: 0,
      video_count: 2,
    })

    // 5. Create Count Member Month
    await CountMemberMonth.create({
      memberjid: member.memberjid,
      groupjid: group.groupjid,
      message_count: 5,
      warning_count: 0,
      video_count: 1,
    })

    // 6. Create Blacklist
    await Blacklist.create({
      memberjid: member.memberjid,
      reason: 'Test reason',
      admin: 'admin',
    })

    // 7. Create Birthday
    await Birthday.create({
      memberjid: member.memberjid,
      name: 'Test User',
      username: 'testuser',
      date: 1,
      month: 1,
      year: 2000,
      place: 'Test City',
    })

    // 8. Create Meta
    await Meta.create({
      variable: 'test_variable',
      value: true,
    })

    // 9. Create News
    await News.create({
      headline: 'Test News',
      at: DateTime.now(),
    })

    // 10. Create Badge
    await Badge.create({
      badge_info: 'test_badge',
      sno: 1,
    })

    // 11. Create Voting
    await Voting.create({
      groupjid: group.groupjid,
      is_started: true,
      started_by: member.memberjid,
      title: 'Test Vote',
      choices: ['Option 1', 'Option 2'],
      count: ['0', '0'],
      members_voted_for: [[], []],
      voted_members: [],
    })

    // 12. Create Unknown Command
    await UnknownCmd.create({
      command: 'test_command',
      count: 1,
    })

    // 13. Create COC Tag
    await CocTag.create({
      tag: 'TEST123',
      memberjid: member.memberjid,
    })
  }
}
