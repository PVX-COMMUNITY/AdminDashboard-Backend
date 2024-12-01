import type Birthday from '#models/birthday'
import BaseSerializer from './base_serializer.js'
import MemberSerializer from './member_serializer.js'

class BirthdaySerializer extends BaseSerializer<Birthday> {
  constructor(model: Birthday | Birthday[]) {
    super(model)
  }

  async toJSON() {
    if (Array.isArray(this.model)) {
      return await Promise.all(this.model.map(this.serialize))
    }
    return await this.serialize(this.model)
  }

  async serialize(birthday: Birthday) {
    await birthday.load('member')
    const member = await new MemberSerializer(birthday.member).toSingleJSON()
    const data = {
      name: member?.name,
      uuid: birthday.memberjid,
      date: birthday.date,
      year: birthday.year,
      month: birthday.month,
      place: birthday.place,
    }
    return data
  }
}

export default BirthdaySerializer
