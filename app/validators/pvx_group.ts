import vine from '@vinejs/vine'
import { randomUUID } from 'node:crypto'

const baseSchema = {
  gname: vine.string().trim().minLength(1).maxLength(255),
  link: vine.string().trim().nullable().optional(),
  commands_disabled: vine.array(vine.string()).parse((value) => value || []),
  type: vine.string(),
}

export const createPvxGroupValidator = vine.compile(
  vine.object({
    groupjid: vine.string().trim(),
    uuid: vine
      .string()
      .uuid()
      .parse(() => randomUUID()),
    ...baseSchema,
  })
)

export const updatePvxGroupValidator = vine.compile(
  vine.object({
    ...Object.entries(baseSchema).reduce(
      (acc, [key, validator]) => ({
        ...acc,
        [key]: validator.optional(),
      }),
      {}
    ),
  })
)

export const pvxGroupValidator = vine.compile(
  vine.object({
    groupjid: vine.string().trim(),
    uuid: vine.string().uuid(),
    ...baseSchema,
    createdAt: vine.date().optional(),
    updatedAt: vine.date().optional(),
  })
)
