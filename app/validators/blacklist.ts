import vine from '@vinejs/vine'
import { randomUUID } from 'node:crypto'

const baseSchema = {
  admin: vine.string().trim().maxLength(255),
  reason: vine.string().trim().maxLength(255),
}

export const createBlacklistValidator = vine.compile(
  vine.object({
    memberjid: vine.string().trim(),
    uuid: vine
      .string()
      .uuid()
      .parse(() => randomUUID()),
    ...baseSchema,
  })
)

export const updateBlacklistValidator = vine.compile(
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

export const blacklistValidator = vine.compile(
  vine.object({
    memberjid: vine.string().trim(),
    uuid: vine.string().uuid(),
    ...baseSchema,
    createdAt: vine.date().optional(),
    updatedAt: vine.date().optional(),
  })
)
