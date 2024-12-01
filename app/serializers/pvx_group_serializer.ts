import type PvxGroup from '#models/pvx_group'
import BaseSerializer from './base_serializer.js'

class PvxGroupSerializer extends BaseSerializer<PvxGroup> {
  constructor(model: PvxGroup | PvxGroup[]) {
    super(model)
  }

  async toJSON() {
    if (Array.isArray(this.model)) {
      return await Promise.all(this.model.map(this.serialize))
    }
    return await this.serialize(this.model)
  }

  async serialize(pvxGroup: PvxGroup) {
    const data = {
      name: pvxGroup.gname,
      uuid: pvxGroup.groupjid,
      link: pvxGroup.link,
      commands_disabled: pvxGroup.commands_disabled,
    }
    return data
  }
}

export default PvxGroupSerializer
