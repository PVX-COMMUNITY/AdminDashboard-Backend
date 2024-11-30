import vine from '@vinejs/vine'
import { randomUUID } from 'node:crypto'

const baseSchema = {
  name: vine.string().trim().minLength(1).maxLength(255),
  donation: vine
    .number()
    .min(0)
    .parse((i) => (!i ? 0 : i)),
  badges: vine.array(vine.string()).parse((i) => (!i ? [] : i)),
  role: vine
    .string()
    .trim()
    .regex(/^(admin|moderator|member)$/)
    .parse((i) => (!i ? 'member' : i)),
}

export const createMemberValidator = vine.compile(
  vine.object({
    memberjid: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const member = await db.from('member').where('memberjid', value).first()
        return !member
      }),
    uuid: vine
      .string()
      .uuid()
      .parse(() => randomUUID()),
    ...baseSchema,
  })
)

export const updateMemberValidator = vine.compile(
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

export const memberValidator = vine.compile(
  vine.object({
    memberjid: vine.string().trim(),
    uuid: vine.string().uuid(),
    ...baseSchema,
    createdAt: vine.date().optional(),
    updatedAt: vine.date().optional(),
  })
)
