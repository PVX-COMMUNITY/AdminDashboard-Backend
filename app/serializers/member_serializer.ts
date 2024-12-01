import Member from '#models/member'
import BaseSerializer from './base_serializer.js'

class MemberSerializer extends BaseSerializer<Member> {
  constructor(model: Member | Member[]) {
    super(model)
  }

  async toJSON() {
    if (Array.isArray(this.model)) {
      return await Promise.all(this.model.map(this.serialize))
    }
    return await this.serialize(this.model)
  }

  async toSingleJSON() {
    if (this.model instanceof Member) {
      return await this.serialize(this.model)
    }
    return null
  }

  async serialize(member: Member) {
    const number = member.memberjid.split('@')[0] || 'N/A'
    const data = {
      uuid: member.memberjid,
      name: member.name,
      donation: member.donation,
      number,
    }
    return data
  }
}

export default MemberSerializer
