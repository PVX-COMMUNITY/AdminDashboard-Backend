import type Blacklist from '#models/blacklist'
import BaseSerializer from './base_serializer.js'
import MemberSerializer from './member_serializer.js'

class BlacklistSerializer extends BaseSerializer<Blacklist> {
  constructor(model: Blacklist | Blacklist[]) {
    super(model)
  }

  async toJSON() {
    if (Array.isArray(this.model)) {
      return await Promise.all(this.model.map(this.serialize))
    }
    return await this.serialize(this.model)
  }

  async serialize(blacklist: Blacklist) {
    await blacklist.load('member')
    const member = await new MemberSerializer(blacklist.member).toSingleJSON()
    const data = {
      uuid: blacklist.uuid,
      number: member?.number,
      reason: blacklist.reason,
      admin: blacklist.admin,
    }
    return data
  }
}

export default BlacklistSerializer
